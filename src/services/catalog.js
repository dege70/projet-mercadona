import { API_BASE_URL } from '../config';

export const getCatalog = async () => {
  const response = await fetch(`${API_BASE_URL}/catalog`);
  const data = await response.json();
  return data;
};
