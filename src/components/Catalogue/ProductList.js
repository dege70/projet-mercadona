import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryFilter from "./CategoryFilter";
import Product from "../Product/Product";
import { getProducts } from "../../services/product";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "");
  }, [searchParams]);

  const filteredProducts =
    selectedCategory === ""
      ? products
      : products.filter((product) => product.idcategorie === Number(selectedCategory));

  return (
    <>
      <h1>Catalogue</h1>
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={(category) => {
          setSearchParams({ category: category });
          setSelectedCategory(category);
        }}
      />
      {isLoading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="product-list">
          {filteredProducts.map((product) => (
            <Product key={product.idproduit} product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductList;
