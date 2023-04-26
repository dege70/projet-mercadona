import React from "react";

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-filter">
      <label htmlFor="category-select">Filter par :</label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={(event) => onSelectCategory(event.target.value)}
      >
        <option value="">Toutes les catégories</option>
        {categories && categories.map((category) => (
          <option key={category.idcategorie} value={category.idcategorie}>
            {category.libelle}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
