import React from 'react'
import styles from '../styles/ManagerList.module.css';
import { useState } from 'react';
import UserManager from '../components/Managers/UserManager';
import EventManager from './EventManager';
import StatisticManager from '../components/Managers/StatisticManager';
import TicketManager from '../components/Managers/TicketManager';
const ManagerScreen = () => {
    const [selectedButton, setSelectedButton] = useState(null);

    const handleButtonClick = (index) => {
        setSelectedButton(index);
    }
    const buttons = ['Quản lý người dùng', 'Quản lý sự kiện','Thống kê'];

    const renderComponent = () => {
        switch(selectedButton) {
            case 0:
                return <UserManager />;
            case 1:
                return <EventManager />;
            case 2:
                return <StatisticManager />;
            default:
                return <UserManager />;
        }
    }

  return (
    <div className={styles.container}>
        <div className={styles.listManagerContainer}>
            <div className={styles.listManagerLogo}>
                <img className={styles.logo} src={require('../public/images/penguine.png')} alt="" />
            </div>
            {buttons.map((button, index) => (
            <div className={styles.listManagerItem}>
                <button 
                    className={`${styles.listManagerButton} ${selectedButton === index ? styles.activeButton : ''}`}
                    onClick={()=> handleButtonClick(index)}>
                    {button}
                </button>
            </div>
        ))}
        </div>
        <div className={styles.managerContent}>
            {renderComponent()}
        </div>
    </div>
  )
}

export default ManagerScreen


