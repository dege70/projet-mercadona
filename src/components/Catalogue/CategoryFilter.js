import React from "react";

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-filter">
      <label htmlFor="category-select">Filtrer par catégorie :</label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={(e) => onSelectCategory(e.target.value)}
      >
        <option value="">Toutes</option>
        {categories && categories.length > 0 && categories.map((category) => (
          <option key={category.id} value={category.label}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
