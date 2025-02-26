import React, { useEffect, useState } from "react";
import ImageUploader from "./ImageUploader";
import CategorySelector from "./CategorySelector";
import MapComponent from "./MapComponent";
import styles from "../../styles/EventFrom.module.css"

const EventForm = ({ formData, handleInputChange, addEvent, isEditing, categories }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent();
  };

  const [picUrl, setPicUrl] = useState(formData.images || []);
  const [avatar, setAvatar] = useState(formData.avatar || "");

  const updateImages = (newImages) => {
    setPicUrl(newImages);
    handleInputChange({ target: { name: "images", value: newImages } });
  };
  const updateAvatar = (newImages) => {
    setAvatar(newImages);
    handleInputChange({ target: { name: "avatar", value: newImages } });
  };
  useEffect(() => {
    setPicUrl(formData.images || []);
    setAvatar(formData.avatar || "");
  }, [formData.images]);
  return (
    <form
      onSubmit={handleSubmit}
      className={styles.formContainer}
    >
      <div>
        <label className={styles.label}>Tên sự kiện</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Nhập tên sự kiện"
          required
          className={styles.inputField}
        />
      </div>

      <div>
        <label className={styles.label}>Mô tả sự kiện</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Mô tả sự kiện"
          required
          className={styles.textarea}
        />
      </div>

      <div>
        <label className={styles.label}>Địa điểm</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="Nhập địa điểm"
          required
          className={styles.inputField}
        />
      </div>

      <div>
        <label className={styles.label}>Giá vé & Số lượng vé</label>
        <input
          type="number"
          name="ticketPrice"
          value={formData.ticketPrice}
          onChange={handleInputChange}
          placeholder="Nhập giá vé"
          required
          className={styles.inputField}
        />
        <input
          type="number"
          name="ticketQuantity"
          value={formData.ticketQuantity}
          onChange={handleInputChange}
          placeholder="Nhập số lượng vé"
          required
          className={styles.inputField}
        />
      </div>

      <div>
        <label className={styles.label}>Thời gian bắt đầu</label>
        <input
          type="datetime-local"
          name="timeStart"
          value={formData.timeStart ? new Date(formData.timeStart).toISOString().slice(0, 16) : ""}
          onChange={handleInputChange}
          required
          className={styles.inputField}
        />
      </div>

      <div>
        <label className={styles.label}>Thời gian kết thúc</label>
        <input
          type="datetime-local"
          name="timeEnd"
          value={formData.timeEnd ? new Date(formData.timeEnd).toISOString().slice(0, 16) : ""}
          onChange={handleInputChange}
          required
          className={styles.inputField}
        />
      </div>
      <ImageUploader images={picUrl} setImages={updateImages} setAvatar={updateAvatar} avatar={avatar} />

      <CategorySelector
        selectedCategory={formData.selectedCategory}
        setSelectedCategory={(category) => handleInputChange({ target: { name: "selectedCategory", value: category } })}
        categories={categories}
      />

      <button type="submit" className={styles.button}>
        {isEditing ? "Cập nhật sự kiện" : "Thêm sự kiện mới"}
      </button>
    </form>
  );
};

export default EventForm;
