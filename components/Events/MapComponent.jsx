"use client";
import { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import GoongGeocoder from "@goongmaps/goong-geocoder";

const GOONG_MAPS_API_KEY = "EulYIDSKezF0x9mBVpeYOZZHe7T1PszHnXHpIeGY";
const GOONG_TITLES_KEY = "CzM10BwFkxrsNoVophiP6gICaZjdLSM7op6nbEd3"

const GoongMap = () => {
  const mapContainerRef = useRef(null);
  const [marker, setMarker] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    // Thêm ô tìm kiếm địa điểm
    const geocoder = new GoongGeocoder({
      accessToken: GOONG_MAPS_API_KEY,
      goongjs: mapboxgl,
    });

    // Thêm điều khiển geocoder vào body hoặc một div khác có thể nhìn thấy
    document.body.appendChild(geocoder.onAdd());

    // Khi chọn địa điểm, cập nhật marker và lưu tọa độ
    geocoder.on("result", (e) => {
      const { center, place_name } = e.result;

      if (!center || center.length < 2) {
        console.error("Invalid center coordinates:", center);
        return; // Ngừng thực hiện nếu center không hợp lệ
      }

      if (marker) marker.remove();

      const newMarker = new mapboxgl.Marker().setLngLat({ lng: center[0], lat: center[1] }).addTo(mapContainerRef.current);
      setMarker(newMarker);
      setCoordinates({ lat: center[1], lng: center[0], place: place_name });
    });

    return () => {
      // Xóa geocoder khi component bị hủy
      geocoder.off("result");
      document.body.removeChild(geocoder.onAdd());
    };
  }, []);

  return (
    <div>
      {/* Không cần phần tử chứa bản đồ */}
      {coordinates && (
        <p>
          <strong>Địa điểm:</strong> {coordinates.place} <br />
          <strong>Tọa độ:</strong> {coordinates.lat}, {coordinates.lng}
        </p>
      )}
    </div>
  );
};

export default GoongMap;
