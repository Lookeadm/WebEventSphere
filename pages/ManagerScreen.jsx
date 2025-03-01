import React from 'react'
import styles from '../styles/ManagerList.module.css';
import { useState } from 'react';
import UserManager from '../components/Managers/UserManager';
import EventManager from '../components/Managers/EventManager';
import StatisticManager from '../components/Managers/StatisticManager';
import TicketManager from '../components/Managers/TicketManager';
import Link from 'next/link';
const ManagerScreen = () => {
    const [selectedButton, setSelectedButton] = useState(0);

    const handleButtonClick = (index) => {
        setSelectedButton(index);
    }
    const buttons = [
        {
            title: 'Người dùng',
            icon : 'assets/avatar-people-profile-svgrepo-com.svg'
        },
        {
            title: 'Sự kiện',
            icon : 'assets/article-svgrepo-com.svg'
        },
        {
            title: 'Thống kê',
            icon : 'assets/bar-chart-diagram-graph-large-svgrepo-com.svg'
        }
        ];

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
            <div style={{width:'100%'}}>
            {buttons.map((button, index) => (
            <div className={styles.listManagerItem}>
                <button 
                    className={`${styles.listManagerButton} ${selectedButton === index ? styles.activeButton : ''}`}
                    onClick={()=> handleButtonClick(index)}>
                    <img className={styles.buttonIcon} src={button.icon} alt="" />
                    {button.title}
                </button>
            </div>
        ))}
        </div>
        <div>
            <Link href={'/LoginScreen'}>
            <button className={styles.logoutButton}>
                <img className={styles.logoutIcon} src="assets/logout-svgrepo-com.svg" alt="" />
                Đăng xuất
            </button>
            </Link>
        </div>
        </div>
        <div className={styles.managerContent}>
            {renderComponent()}
        </div>
    </div>
  )
}

export default ManagerScreen


