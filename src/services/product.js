import axios from 'axios';
import config from '../config';


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
  try {
    const response = await axios.post(`${config.API_BASE_URL}/admin/product/create`, product);
    console.log(response.data.message);
    window.location.href = '/admin';
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = async (productId, product) => {
  const response = await fetch(`${config.API_BASE_URL}/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product), // convertir les données en JSON
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
