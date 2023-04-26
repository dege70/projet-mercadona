import React, { useState, useEffect } from 'react';
import { useAuth } from '../../services/auth';
import { getProducts } from '../../services/products';
import { useSearchParams } from 'react-router-dom';
import CategoryFilter from './CategoryFilter';
import ProductList from './ProductList';
import Error from '../Error/Error';

const Catalogue = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching products...');
        const productsData = await getProducts();
        setProducts(productsData);

        setIsLoading(false);
        console.log('Finished fetching products');
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setSelectedCategory(searchParams.get('category'));
  }, [searchParams]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchParams({ category: categoryId });
  };

  if (!isAuthenticated) {
    return <Error message="Vous devez être connecté pour accéder à cette page" />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log('Rendering Catalogue component');

  return (
    <>
      {/* <CategoryFilter
        categories={products.reduce((acc, product) => {
          if (!acc.includes(product.idcategorie)) {
            acc.push(product.idcategorie);
          }
          return acc;
        }, [])}
        onSelectCategory={handleCategorySelect}
        selectedCategory={selectedCategory}
      /> */}
      <ProductList products={selectedCategory ? products.filter(product => product.idcategorie === selectedCategory) : products} />
    </>
  );
};

export default Catalogue;
