import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import CategorySelector from './CategorySelector';
import MapComponent from './MapComponent';

const EventForm = ({ formData, handleInputChange, addEvent, isEditing, categories }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent();
  };

  const [picUrl, setPicUrl] = useState(formData.images || []);

  const updateImages = (newImages) => {
    setPicUrl(newImages);
    handleInputChange({ target: { name: 'images', value: newImages } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Nhập tên sự kiện"
          required
        />
      </div>
      <div>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Mô tả sự kiện"
          required
        />
      </div>
      <div>
        <input
          type="number"
          name="ticketPrice"
          value={formData.ticketPrice}
          onChange={handleInputChange}
          placeholder="Nhập giá vé"
          required
        />
        <input
          type="number"
          name="ticketQuantity"
          value={formData.ticketQuantity}
          onChange={handleInputChange}
          placeholder="Nhập số lượng vé"
          required
        />
      </div>
      <div>
        <label>Thời gian bắt đầu:</label>
        <input
          type="datetime-local"
          name="timeStart"
          value={formData.timeStart ? new Date(formData.timeStart).toISOString().slice(0, 16) : ""}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Thời gian kết thúc:</label>
        <input
          type="datetime-local"
          name="timeEnd"
          value={formData.timeEnd ? new Date(formData.timeEnd).toISOString().slice(0, 16) : ""}
          onChange={handleInputChange}
          required
        />
      </div>

      <ImageUploader images={picUrl} setImages={updateImages} />

      <MapComponent />

      <CategorySelector
        selectedCategory={formData.selectedCategory}
        setSelectedCategory={(category) => handleInputChange({ target: { name: 'selectedCategory', value: category } })}
        categories={categories}
      />

      <button type="submit" className="submit-button">
        {isEditing ? 'Cập nhật sự kiện' : 'Thêm sự kiện mới'}
      </button>
    </form>
  );
};

export default EventForm;