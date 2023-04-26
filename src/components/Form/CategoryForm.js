import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCategory } from "../../services/categories";
import classes from "../../hoc/Layout/Layout.module.css"
import Admin from "../../containers/Admin/Admin";

const CategoryForm = () => {
  const navigate = useNavigate();
  const [libelle, setLibelle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const category = {
      libelle: libelle,
    };
    await addCategory(category);
    navigate("/admin");
  };

  return (
    <div className="container">
      <Admin />
      <h1>Ajouter une Catégorie</h1>
      <form onSubmit={handleSubmit} className={classes.FormBox}>
        <div className={classes.Input}>
          <label htmlFor="libelle">Nom</label>
          <input
            type="text"
            className="form-control"
            id="libelle"
            value={libelle}
            onChange={(e) => setLibelle(e.target.value)}
            required
          />
        </div>
        <div className={classes.submit}>
          <input
          type="submit"
          disabled={isLoading} value={isLoading ? 'Chargement...' : 'Enregistrer'} />
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
