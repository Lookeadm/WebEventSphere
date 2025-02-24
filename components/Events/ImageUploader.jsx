import axios from "axios";
import React, { useState } from "react";
import styles from '../../styles/ImageUploader.module.css';
const ImageUploader = ({ images, setImages }) => {
  const [loading, setLoading] = useState(false);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "withershop");

    try {
        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dot3j50a9/image/upload",
            formData
        );
        return response.data.secure_url;
    } catch (error) {
        console.error('Upload error:', error);
        throw new Error('Lỗi khi tải ảnh lên');
    }
};

const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setLoading(true);
    try {
        const uploadPromises = files.map(file => uploadToCloudinary(file));
        const uploadedUrls = await Promise.all(uploadPromises);
        
        // Đảm bảo mảng images luôn tồn tại
        const currentImages = Array.isArray(images) ? images : [];
        const newImages = [...currentImages, ...uploadedUrls];
        
        setImages(newImages);
    } catch (error) {
        alert(error.message || 'Lỗi khi tải ảnh lên');
    } finally {
        setLoading(false);
        e.target.value = '';
    }
};

  const handleRemoveImage = (indexToRemove) => {
    setImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="image-uploader">
      <div className="upload-section">
        <label className={styles.uploadLabel}>
          Thêm hình ảnh:
        </label>
        <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
            multiple
            className="file-input"
          />
        {loading && <p className={"loading-text"}>Đang tải ảnh lên...</p>}
      </div>

      <div className="images-preview">
        {images && images.length > 0 ? (
          <div className="images-grid">
            {images.map((url, index) => (
              <div key={index} className="image-item">
                <img
                  src={url}
                  alt={`Ảnh ${index + 1}`}
                  className="preview-image"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="remove-button"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-images">Chưa có hình ảnh nào được tải lên.</p>
        )}
      </div>

      <style jsx>{`
        .image-uploader {
          margin: 20px 0;
        }
        .upload-section {
          margin-bottom: 15px;
        }
        .upload-label {
          display: block;
          margin-bottom: 10px;
        }
        .file-input {
          display: block;
          margin-top: 5px;
        }
        .loading-text {
          color: #666;
          margin-top: 10px;
        }
        .images-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 15px;
          margin-top: 15px;
        }
        .image-item {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
        }
        .preview-image {
          width: 100%;
          height: 150px;
          object-fit: cover;
          display: block;
        }
        .remove-button {
          position: absolute;
          top: 5px;
          right: 5px;
          background: rgba(255, 0, 0, 0.7);
          color: white;
          border: none;
          border-radius: 50%;
          width: 25px;
          height: 25px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
        }
        .remove-button:hover {
          background: rgba(255, 0, 0, 0.9);
        }
        .no-images {
          color: #666;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default ImageUploader;