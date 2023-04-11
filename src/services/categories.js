// categories.js

const baseUrl = "http://localhost:3000";

const getCategories = async () => {
  const response = await fetch(`${baseUrl}/categories`);
  const categories = await response.json();
  return categories;
};

const addCategory = async (category) => {
  const response = await fetch(`${baseUrl}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
  const newCategory = await response.json();
  return newCategory;
};

const updateCategory = async (id, category) => {
  const response = await fetch(`${baseUrl}/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
  const updatedCategory = await response.json();
  return updatedCategory;
};

const deleteCategory = async (id) => {
  const response = await fetch(`${baseUrl}/categories/${id}`, {
    method: "DELETE",
  });
  const deletedCategory = await response.json();
  return deletedCategory;
};

export { getCategories, addCategory, updateCategory, deleteCategory };
