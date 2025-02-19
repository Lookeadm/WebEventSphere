import React from 'react';

const CategorySelector = ({ selectedCategory, setSelectedCategory, categories }) => {
  return (
    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
      <option value="">Chọn category</option>
      {categories.map((category) => (
        <option key={category._id} value={category._id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default CategorySelector;