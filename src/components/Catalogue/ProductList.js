import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryFilter from "./CategoryFilter";
import Product from "../Product/Product";
import { getProducts } from "../../services/product";
import { getCategories } from "../../services/categories";
import classes from "../Product/Product.module.css"

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);

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
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setSearchParams({ category: selectedCategory });
  }, [selectedCategory, setSearchParams]);

  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "");
  }, [searchParams, setSelectedCategory]);

  const filteredProducts =
    selectedCategory === ""
      ? products
      : products.filter(
          (product) => product.idcategorie === Number(selectedCategory)
        );

  return (
    <div className="container">
      <h1>Catalogue</h1>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(category) => {
          setSelectedCategory(category);
        }}
      />

      {isLoading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p>{error}</p>
      ) : categories.length === 0 ? (
        <p>Pas de catégories disponibles</p>
      ) : (
        <ul className={classes.Card}>
          {filteredProducts.map((product) => (
            <Product
              key={product.idproduit}
              product={product}
              category={categories.find(
                (category) => category.idcategorie === product.idcategorie
              )}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
