import React from 'react';
import styles from '../../styles/CategorySelector.module.css'
const CategorySelector = ({ selectedCategory, setSelectedCategory, categories }) => {
  return (
    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
      <option value="">Chọn thể loại</option>
      {categories.map((category) => (
        <option key={category._id} value={category._id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default CategorySelector;