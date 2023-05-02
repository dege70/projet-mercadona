import React, { useState, useEffect } from 'react';
import { getProducts } from '../../services/product'
import ProductList from '../../components/Catalogue/ProductList';

const CatalogueAdmin = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <ProductList products={products} />;
};

export default CatalogueAdmin;
