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
      setSelectedCategory(product.categoryId);
    }
  }, [product, reset]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (product) {
        await updateProduct(product.id, data);
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
        <label htmlFor="name">Nom</label>
        <input
          type="text"
          id="name"
          {...register("name", { required: true })}
        />
        {errors.name && <span>Ce champ est obligatoire</span>}
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          {...register("description", { required: true })}
        />
        {errors.description && <span>Ce champ est obligatoire</span>}
      </div>
      <div>
        <label htmlFor="price">Prix</label>
        <input
          type="number"
          id="price"
          {...register("price", { required: true, min: 0 })}
        />
        {errors.price && <span>Le prix doit être supérieur ou égal à 0</span>}
      </div>
      <div>
        <label htmlFor="image">Image</label>
        <input
          type="text"
          id="image"
          {...register("image", { required: true })}
        />
        {errors.image && <span>Ce champ est obligatoire</span>}
      </div>
      <div>
        <label htmlFor="categoryId">Catégorie</label>
        <select
          id="categoryId"
          {...register("categoryId", { required: true })}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Choisissez une catégorie</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
        {errors.categoryId && <span>Ce champ est obligatoire</span>}
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Chargement..." : "Enregistrer"}
      </button>
    </form>
  );
};

export default ProductForm;
