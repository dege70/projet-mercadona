import config from "../config";
const { API_BASE_URL } = config;

// Récupérer toutes les promotions
export const getPromotions = async () => {
  const response = await fetch(`${API_BASE_URL}/promotions`);
  if (!response.ok) {
    throw new Error("Une erreur est survenue lors de la récupération des promotions");
  }
  const data = await response.json();
  return data;
};

// Récupérer une promotion
export const getPromotion = async (id) => {
  const response = await fetch(`${API_BASE_URL}/promotions/${id}`);
  if (!response.ok) {
    throw new Error("Une erreur est survenue lors de la récupération de la promotion");
  }
  const data = await response.json();
  return data;
};

// Ajouter une promotion
export const addPromotion = async (promotionData) => {
  const response = await fetch(`${API_BASE_URL}/promotions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(promotionData),
  });
  if (!response.ok) {
    throw new Error("Une erreur est survenue lors de l'ajout de la promotion");
  }
  const data = await response.json();
  return data;
};

// Modifier une promotion
export const updatePromotion = async (id, promotionData) => {
  const response = await fetch(`${API_BASE_URL}/promotions/${id}`, {
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
  const response = await fetch(`${API_BASE_URL}/promotions/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Une erreur est survenue lors de la suppression de la promotion");
  }
};
