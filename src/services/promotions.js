import axios from 'axios';
import config from '../config';

// Récupérer toutes les promotions
export const getPromotions = async () => {
  try {
    const response = await fetch(`${config.API_BASE_URL}/promotions`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Une erreur est survenue lors de la récupération des promotions");
  }
};

// Récupérer une promotion
export const getPromotion = async (id) => {
  const response = await fetch(`${config.API_BASE_URL}/promotions/${id}`);
  if (!response.ok) {
    throw new Error("Une erreur est survenue lors de la récupération de la promotion");
  }
  const data = await response.json();
  return data;
};

// Ajouter une promotion
export const addPromotion = async (promotionData) => {
  try {
    const response = await axios.post(`${config.API_BASE_URL}/admin/promotion/create`, promotionData);
    console.log(response.data.message);
    window.location.href = '/admin';
  } catch (error) {
    console.error(error);
    throw new Error("Une erreur est survenue lors de l'ajout de la promotion");
  }
};


// Modifier une promotion
export const updatePromotion = async (id, promotionData) => {
  const response = await fetch(`${config.API_BASE_URL}/promotions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(promotionData),
  });
  if (!response.ok) {
    throw new Error("Une erreur est survenue lors de la modification de la promotion");
  }
  const data = await response.json();
  return data;
};

// Supprimer une promotion
export const deletePromotion = async (id) => {
  const response = await fetch(`${config.API_BASE_URL}/promotions/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Une erreur est survenue lors de la suppression de la promotion");
  }
  const data = await response.json();
  return data;
};
