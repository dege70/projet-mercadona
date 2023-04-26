import React from "react";
import classes from "./Product.module.css"

const Product = ({ product, category }) => {
  return (
    <li className={classes.Card}>
      {product.image && <img src={`http://127.0.0.1:5000/public/images/${product.image}`} alt={product.libelle} />}
        <h2>{product.libelle}</h2>
        {category && <p>{category.libelle}</p>}
        <p>{product.description}</p>
        <p>{product.prix} €</p>
        <p>Catégorie : {product.idcategorie}</p>
    </li>
  );
};

export default Product;
