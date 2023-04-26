import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createProduct, updateProduct } from "../../services/product";
import { getCategories } from "../../services/categories";
import classes from "../../hoc/Layout/Layout.module.css";
import Admin from "../../containers/Admin/Admin";

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
        await createProduct({
          libelle: data.libelle,
          description: data.description,
          prix: data.prix,
          image: data.image,
          idcategorie: data.idcategorie,
        });
      }
      navigate("/admin");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <Admin />
      <h1>Ajouter un Produit :</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.FormBox}>
        <div className={classes.Input}>
          <label htmlFor="libelle">Libellé</label>
          <input
            type="text"
            name="libelle"
            id="libelle"
            {...register("libelle", { required: true })}
          />
          {errors.libelle && <span>Ce champ est obligatoire</span>}
        </div>
        <div className={classes.Input}>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            {...register("description")}
          />
        </div>
        <div className={classes.Input}>
          <label htmlFor="prix">Prix</label>
          <input
            type="number"
            name="prix"
            step="0.01"
            id="prix"
            {...register("prix", {
              required: true,
              validate: (value) => !isNaN(parseFloat(value))
            })}
          />
          {errors.prix?.type === "required" && <span>Ce champ est obligatoire</span>}
          {errors.prix?.type === "validate" && <span>Le prix doit être un nombre valide</span>}
        </div>
        <div className={classes.Input}>
          <label htmlFor="image">Image</label>
          <input name="image" type="text" id="image" {...register("image")} />
        </div>
        <div className={classes.Input}>
          <label htmlFor="idcategorie">Catégorie</label>
          <select
            name="idcategorie"
            id="idcategorie"
            {...register("idcategorie", { required: true })}
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
        <div className={classes.submit}>
          <input
            type="submit"
            disabled={isLoading}
            value={isLoading ? "Chargement..." : "Enregistrer"}
          />
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
