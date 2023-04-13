import { API_BASE_URL } from '../config';

export const getCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  const data = await response.json();
  return data;
};
