import React, { useEffect, useState } from 'react';
import EventForm from '@/components/Events/EventForm';
import EventList from '@/components/Events/EventList';

export default function EventManager() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    timeStart: '',
    timeEnd: '',
    avatar: '',
    banner: '',
    images: [],
    ticketPrice: '',
    ticketQuantity: '',
    selectedCategory: '',
  });
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [eventsRes, categoriesRes] = await Promise.all([
        fetch('/api/eventsApi'),
        fetch('/api/categoriesApi'),
      ]);

      if (!eventsRes.ok || !categoriesRes.ok) {
        throw new Error('Lỗi khi tải dữ liệu');
      }

      const eventsData = await eventsRes.json();
      const categoriesData = await categoriesRes.json();

      setEvents(eventsData.data);
      setCategories(categoriesData.data);
    } catch (e) {
      setError('Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.');
      console.error("Lỗi khi gọi API:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  // Trong hàm addEvent
const addEvent = async () => {
  setIsLoading(true);
  setError(null);
  try {
      const eventData = {
          ...formData,
          timeStart: new Date(formData.timeStart).getTime(),
          timeEnd: new Date(formData.timeEnd).getTime(),
          ticketPrice: Number(formData.ticketPrice),
          ticketQuantity: Number(formData.ticketQuantity),
          categories: formData.selectedCategory,
          images: formData.images || [],
          id: isEditing ? formData.id : undefined
      };

      const response = await fetch('/api/eventsApi', {
          method: isEditing ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setFormData({
          id: '', name: '', description: '', timeStart: '', timeEnd: '',
          avatar: '', banner: '', images: [], ticketPrice: '',
          ticketQuantity: '', selectedCategory: '',
      });
      setIsEditing(false);
      fetchData();

  } catch (error) {
      setError(error.message || 'Lỗi khi lưu sự kiện');
  } finally {
      setIsLoading(false);
  }
};


  const handleEdit = (event) => {
    console.log("Even: "+event)
    setIsEditing(true);
    setFormData({
        id: event.id,
        name: event.name,
        description: event.description,
        timeStart: new Date(Number(event.timeStart)).toISOString().slice(0, 16),
        timeEnd: new Date(Number(event.timeEnd)).toISOString().slice(0, 16),
        avatar: event.avatar || '',
        banner: event.banner || '',
        images: Array.isArray(event.images) ? event.images : [],
        ticketPrice: event.ticketPrice,
        ticketQuantity: event.ticketQuantity,
        selectedCategory: event.categories,
    });
};

  return (
    <div className="event-manager">
      <h2>Quản lý Sự kiện</h2>

      {error && <div className="error-message">{error}</div>}

      <EventForm
        formData={formData}
        handleInputChange={handleInputChange}
        addEvent={addEvent}
        isEditing={isEditing}
        categories={categories}
        isLoading={isLoading}
      />

      {isLoading ? (
        <div className="loading">Đang tải...</div>
      ) : (
        <EventList
          events={events}
          onEdit={handleEdit}
          categories={categories}
        />
      )}
    </div>
  );
}