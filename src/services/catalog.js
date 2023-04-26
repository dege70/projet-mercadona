export const getCategories = async () => {
  try {
    const response = await fetch(`${config.API_BASE_URL}/categories`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Une erreur est survenue lors de la récupération des catégories");
  }
};
