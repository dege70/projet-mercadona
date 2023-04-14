import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const category = e.target.value;
    onSelectCategory(category);
    navigate(`/catalogue${category ? `?category=${category}` : ""}`);
  };

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
