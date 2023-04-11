import React, { useState, useEffect } from 'react';
import { useAuth } from '../../services/auth';
import { getProducts } from '../../services/products';
import ProductList from '../../components/Catalogue/ProductList';
import Error from '../../components/Error/Error';

const Catalogue = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!isAuthenticated) {
    return <Error message="Vous devez être connecté pour accéder à cette page" />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <ProductList products={products} />;
};

export default Catalogue;
