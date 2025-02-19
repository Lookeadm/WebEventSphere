import React, { useEffect, useState } from 'react'
import axios from 'axios';
import api from './api/axiosClient'

interface Category {
  id: string; // or string, depending on your API
  name: string;
  image: string;
}

export default function CategoriesManager() {

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [urlPreview, setUrlPreview] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data.data);
        console.log("Dữ liệu từ API:", data);
      } catch (e) {
        console.error("Lỗi khi gọi API:", e);
      }
    };
    fetchData();
  }, [])

  const addCategory = async () => {
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: title, image: image }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add category');
      }

      const data = await response.json();
      console.log('Category added successfully:', data);
    } catch (error) {
      console.log(error)
    }
  };

  const uploadToCloundinary = async (file: any) =>{
    // Tạo form để gửi file.
    const formData = new FormData();
    // Đính kèm file ảnh vào form.
    formData.append("file", file);
    // Là tên preset, phải khớp với cái bạn đã cấu hình trong Cloudinary.
    formData.append("upload_preset", "withershop");

    try{
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dot3j50a9/image/upload",
        formData
      );
      // Trả về URL ảnh đã tải lên
      return response.data.secure_url
    }catch(e){
      console.log("Upload fail", e);
    }
    finally{

    }
  }

  const handleFileChange = async (e: any) => {
    // Lấy file đầu tiên mà người dùng chọn.
    const file = e.target.files[0];
    if (!file) return;
    // Tạo một URL tạm thời để hiển thị ảnh trước khi tải lên server.
    // URL này chỉ tồn tại trong phiên hiện tại
    const preview = URL.createObjectURL(file);
    setUrlPreview(preview);

    const uploadedUrl = await uploadToCloundinary(file);
    if(uploadedUrl){
      setImage(uploadedUrl);
    }
  };

  return (
    <div>
      {/* Thêm thể loại*/}
      <h2>Quản lý Danh mục</h2>
      <div>
        <input
          className="tieu-de"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nhập tiêu đề"
        />
      </div>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <img
        src={urlPreview}
        alt="Ảnh tạm thời"
        style={{ width: "200px", marginTop: "10px" }}
      />
      <br />
      <button onClick={addCategory}>
        Thêm danh mục
      </button>
      {/* Hiển thị thể loại */}
      <div>
        {categories.map((category) => (
          <div key={category.id} >
            <strong>{category.name}</strong>
            <img 
              src={category.image}
              style={{ width: "200px", objectFit: "cover", margin: "5px" }}
              />
          </div>
        ))}
      </div>
    </div>
  )
}

