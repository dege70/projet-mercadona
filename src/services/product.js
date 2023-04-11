import { config } from '../config';

export const getProducts = async () => {
  const response = await fetch(`${config.API_BASE_URL}/products`);
  const data = await response.json();
  return data;
};

export const getProductById = async (productId) => {
  const response = await fetch(`${config.API_BASE_URL}/products/${productId}`);
  const data = await response.json();
  return data;
};

export const createProduct = async (product) => {
  const response = await fetch(`${config.API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  const data = await response.json();
  return data;
};

export const updateProduct = async (productId, product) => {
  const response = await fetch(`${config.API_BASE_URL}/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  const data = await response.json();
  return data;
};

export const deleteProduct = async (productId) => {
  const response = await fetch(`${config.API_BASE_URL}/products/${productId}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
};
