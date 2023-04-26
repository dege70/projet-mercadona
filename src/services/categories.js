import axios from 'axios';
import config from '../config';

const baseUrl = `${config.API_BASE_URL}/categories`;

export const getCategories = async () => {
  const response = await fetch(baseUrl);
  const categories = await response.json();
  return categories;
};

export const addCategory = async (category) => {
  try {
    const response = await axios.post(`${config.API_BASE_URL}/admin/categorie/create`, category);
    console.log(response.data.message);
    window.location.href = '/admin';
  } catch (error) {
    console.error(error);
    throw new Error("Une erreur est survenue lors de l'ajout de la categorie");
  }
};

export const updateCategory = async (idcategorie, category) => {
  const response = await fetch(`${baseUrl}/${idcategorie}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
  const updatedCategory = await response.json();
  return updatedCategory;
};

export const deleteCategory = async (idcategorie) => {
  const response = await fetch(`${baseUrl}/${idcategorie}`, {
    method: "DELETE",
  });
  const deletedCategory = await response.json();
  return deletedCategory;
};
