import React from 'react';

const EventList = ({ events, onEdit, categories }) => {
  return (
    <div className="events-list">
      {events.map((event) => {
        const category = categories.find(cat => cat._id === event.categories);

        return (
          <div key={event._id} className="event-card">
            <div className="event-header">
              <h3>{event.name}</h3>
              {event.avatar && (
                <img
                  src={event.avatar}
                  alt="Avatar sự kiện"
                  className="event-avatar"
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              )}
            </div>

            <div className="event-content">
              <p className="event-description">{event.description}</p>
              <p className="event-time">
                Từ: {new Date(Number(event.timeStart)).toLocaleString('vi-VN')}
                <br />
                Đến: {new Date(Number(event.timeEnd)).toLocaleString('vi-VN')}
              </p>

              {event.images.length > 0 && (
                <div className="event-images">
                  <div className="images-grid">
                    {event.images.map((url, index) => (
                      <div key={index} className="image-container">
                        <img
                          src={url}
                          alt={`Ảnh sự kiện ${index + 1}`}
                          className="event-image"
                          style={{ height: 100, width: 200, objectFit: 'cover' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {category && <p className="event-category">Thể loại: {category.name}</p>}

              <div className="event-details">
                <p>Giá vé: {event.ticketPrice?.toLocaleString('vi-VN')} VNĐ</p>
                <p>Số lượng vé: {event.ticketQuantity}</p>
              </div>

              <button
                onClick={() => onEdit(event)}
                className="edit-button"
              >
                Chỉnh sửa
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EventList;