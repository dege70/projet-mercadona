import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryFilter = ({ categories, selectedCategory }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    navigate(`/admin/catalogue${value ? `?category=${value}` : ""}`);
  };

  console.log("selectedCategory: ", selectedCategory);

  return (
    <div className="category-filter">
      <label htmlFor="category-select">Filtrer par catégorie :</label>
      <select
        id="category-select"
        value={selectedCategory || ""}
        onChange={handleChange}
      >
        <option value="">Toutes</option>
        {categories &&
          categories.map((category) => (
            <option key={category.idcategorie} value={category.idcategorie}>
              {category.libelle}
            </option>
          ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
