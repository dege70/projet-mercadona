import React from 'react';

const Product = ({ product }) => {
  return (
    <div className="product">
      <h2>{product.libelle}</h2>
      <p>{product.description}</p>
      <p>{product.prix} €</p>
      {product.image && <img src={`/public/images/${product.image}`} alt={product.libelle} />}
      <p>Catégorie : {product.idcategorie}</p>
    </div>
  );
};

export default Product;
