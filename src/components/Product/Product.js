import React from "react";

const Product = ({ product }) => {
  return (
    <div className="product">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h5 className="product-name">{product.name}</h5>
        <p className="product-description">{product.description}</p>
        <p className="product-price">Prix: {product.price.toFixed(2)} €</p>
      </div>
    </div>
  );
};

export default Product;
