import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/auth';
import { getProducts } from '../services/products';
import { getCategories } from '../services/categories';
import CategoryFilter from '../components/Catalogue/CategoryFilter';
import ProductList from '../components/Catalogue/ProductList';
import Error from '../../components/Error/Error';

const Catalogue = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);

        const categoriesData = await getCategories();
        setCategories(categoriesData);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  if (!isAuthenticated) {
    return <Error message="Vous devez être connecté pour accéder à cette page" />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CategoryFilter
        categories={categories}
        onSelectCategory={handleCategorySelect}
        selectedCategory={selectedCategory}
      />
      <ProductList products={products} selectedCategory={selectedCategory} />
    </>
  );
};

export default Catalogue;
