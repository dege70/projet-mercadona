import React from "react";
import classes from "./Product.module.css";
import axios from "axios";

const Product = ({ product, category }) => {
  const [promotion, setPromotion] = React.useState(null);
  const [newPrice, setNewPrice] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/produits/${product.idproduit}/promotion`
      );
      const promotion = response.data.promotion; // On suppose qu'un produit ne peut avoir qu'une promotion à la fois
      const newPrice = product.prix * (1 - promotion.pourcentage / 100);
      setPromotion(promotion);
      setNewPrice(newPrice);
    }
    fetchData();
  }, [product.idproduit]);

  return (
    <li className={classes.Card}>
      {product.image && (
        <img
          src={`${process.env.REACT_APP_BASE_URL}/public/images/${product.image}`}
          alt={product.libelle}
        />
      )}
      <h2>{product.libelle}</h2>
      <p>{product.description}</p>
      {promotion && (
        <div>
          <p>
            <strong><del>{product.prix} €</del></strong>{" "}
            <span className={classes.NewPrice}>
              {newPrice.toFixed(2)} € (promo {promotion.pourcentage}%)
            </span>
          </p>
          <p>
            Promotion du {new Date(promotion.datedebut).toLocaleDateString()} au{" "}
            {new Date(promotion.datefin).toLocaleDateString()}
          </p>
        </div>
      )}

      {!promotion && (
        <p>
          <strong>{product.prix} €</strong>
        </p>
      )}
      <p>
        Catégorie : {product.idcategorie} -{" "}
        {category && <span>{category.libelle}</span>}
      </p>
    </li>
  );
};

export default Product;
