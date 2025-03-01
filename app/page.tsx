'use client';
import Link from 'next/link';
import { useState } from 'react';


export default function Home() {
  const [buttonStyle, setButtonStyle] = useState({
    padding: '15px 30px',
    fontSize: '1.2em',
    cursor: 'pointer',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s, transform 0.3s'
  });

  // Xử lý hiệu ứng khi hover vào nút
  const handleMouseEnter = () => {
    setButtonStyle((prev) => ({ ...prev, backgroundColor: '#005bb5' }));
  };

  // Xử lý khi hover rời khỏi nút
  const handleMouseLeave = () => {
    setButtonStyle((prev) => ({ ...prev, backgroundColor: '#0070f3' }));
  };

  // Xử lý hiệu ứng khi nhấn vào nút
  const handleClick = () => {
    setButtonStyle((prev) => ({ ...prev, transform: 'scale(0.98)' }));
    setTimeout(() => {
      setButtonStyle((prev) => ({ ...prev, transform: 'scale(1)' }));
    }, 200);
  };

  return (
    <div style={{
      textAlign: 'center',
      padding: '100px',
      backgroundImage: 'url("/path/to/your/background-image.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#fff',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{
        fontSize: '4em',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
      }}>EventSphere</h1>
      <p style={{
        fontSize: '1.8em',
        margin: '20px 0',
        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)'
      }}>
        Chào mừng bạn đến với EventSphere - Nơi tổ chức sự kiện trở nên dễ dàng hơn!
      </p>
      <Link href="/LoginScreen">
        <button
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          Đi đến Event Manager
        </button>
      </Link>
     
    </div>
  );
}
