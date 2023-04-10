import React from "react";
import Product from "../Product/Product";
import Loading from "../Shared/Loading";

const ProductList = ({ products, isLoading }) => {
  if (isLoading) {
    return <Loading />;
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
