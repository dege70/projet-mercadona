import React from "react";
import Product from "../Product/Product";
import Loading from "../Shared/Loading";

const ProductList = ({ products, isLoading }) => {
  if (isLoading) {
    return <Loading />;
  }

  if (!products || products.length === 0) {
    return <div>Aucun produit à afficher</div>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
