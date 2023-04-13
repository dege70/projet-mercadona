import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createProduct, updateProduct } from "../../services/product";
import { getCategories } from "../../services/categories";

const ProductForm = ({ product }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (product) {
      reset(product);
      setSelectedCategory(product.idcategorie);
    }
  }, [product, reset]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (product) {
        await updateProduct(product.idproduit, data);
      } else {
        await createProduct(data);
      }
      navigate("/admin/catalogue");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="libelle">Libellé</label>
        <input
          type="text"
          id="libelle"
          {...register("libelle", { required: true })}
        />
        {errors.libelle && <span>Ce champ est obligatoire</span>}
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          {...register("description")}
        />
      </div>
      <div>
        <label htmlFor="prix">Prix</label>
        <input
          type="number"
          id="prix"
          {...register("prix", { required: true, min: 0 })}
        />
        {errors.prix && <span>Le prix doit être supérieur ou égal à 0</span>}
      </div>
      <div>
        <label htmlFor="image">Image</label>
        <input
          type="text"
          id="image"
          {...register("image")}
        />
      </div>
      <div>
        <label htmlFor="idCategorie">Catégorie</label>
        <select
          id="idCategorie"
          {...register("idCategorie", { required: true })}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Choisissez une catégorie</option>
          {categories.map((category) => (
            <option key={category.idcategorie} value={category.idcategorie}>
              {category.libelle}
            </option>
          ))}
        </select>
        {errors.idcategorie && <span>Ce champ est obligatoire</span>}
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Chargement..." : "Enregistrer"}
      </button>
    </form>
  );
};

export default ProductForm;
