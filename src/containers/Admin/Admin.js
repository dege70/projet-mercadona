import React, { useState } from "react";
import { useMatch } from "react-router-dom";
import CategoryForm from "../../components/Form/CategoryForm";
import ProductForm from "../../components/Form/ProductForm";
import PromotionForm from "../../components/Form/PromotionForm";
// Importez le composant du formulaire de création d'utilisateur
import UserForm from "../../components/Form/UserForm";
import CatalogueAdmin from "./CatalogueAdmin";
import Navigation from "./Navigation";

const Admin = () => {
  const matchProducts = useMatch(
    `${process.env.REACT_APP_BASE_URL}/admin/products`
  );
  const matchCategories = useMatch(
    `${process.env.REACT_APP_BASE_URL}/admin/categories`
  );
  const matchPromotions = useMatch(
    `${process.env.REACT_APP_BASE_URL}/admin/promotions`
  );
  const matchUsers = useMatch(
    `${process.env.REACT_APP_BASE_URL}/admin/users`
  ); // Ajoutez la correspondance pour la page des utilisateurs

  const [showForm, setShowForm] = useState(false);

    return (
    <div className="container">
      <Navigation />
      <div>
        {showForm ? (
          <>
            {matchProducts && (
              <div>
                <ProductForm />
              </div>
            )}
            {matchCategories && (
              <div>
                <CategoryForm />
              </div>
            )}
            {matchPromotions && (
              <div>
                <PromotionForm />
              </div>
            )}
            {matchUsers && (
              <div>
                <UserForm />
              </div>
            )} // Ajoutez le bloc pour le formulaire d'utilisateur
          </>
        ) : (
          <div>
            <div className="container">
              <CatalogueAdmin />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
