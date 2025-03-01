import React from 'react'
import styles from '../../styles/StatisticManager.module.css'

export default function StatisticManager() {

  // doanh thu
  const statistics = [
    {
      title: "Tổng doanh thu",
      value: "1,245,600,000 VND",
      change: 15.2,
    },
    {
      title: "Số vé đã bán",
      value: "3,456",
      change: 10.5,
    },
    {
      title: "Sự kiện đã diễn ra",
      value: "4",
      change: -1,
    },

  ];

  const getRevenueClass = (change) => {
    return change >= 0 ? styles.revenuePositive : styles.revenueNegative;
  };

  const formatChangeText = (change) => {
    return change >= 0
      ? `+${change}% so với tháng trước`
      : `${change}% so với tháng trước`;
  };

  // su kien
  const events = [
    { name: 'Hội thảo', revenue: 420 },
    { name: 'Hạo thổi', revenue: 285 },
    { name: 'Wibu world', revenue: 360 },
    { name: 'Thực tập ko lương', revenue: 180 }
  ];

  const maxRevenue = Math.max(...events.map(e => e.revenue))

  // ve
  const tickets = [
    { type: 'VIP', price: '1.2tr', percent: 25 },
    { type: 'Thường', price: '800k', percent: 45 },
    { type: 'Sinh viên', price: '500k', percent: 20 },
    { type: 'Đoàn', price: '450k', percent: 10 },
  ];

  const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  return (
    <div className={styles.statisticContainer}>
      <div className={styles.title}>
        <h2>Thống kê</h2>
      </div>
      <div className={styles.subTitle}>
        <h3>Thống kê vé và doanh thu</h3>
      </div>
      <div>
        {statistics.map((item, index) => (
          <div key={index} className={styles.statisticCard}>
            <span className={styles.cardTitle}>{item.title}</span>
            <span className={styles.cardValue}>{item.value}</span>
            <span className={getRevenueClass(item.change)}>
              {formatChangeText(item.change)}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.chartContainer}>
        <h3 className={styles.chartTitle}>Doanh thu theo sự kiện</h3>
        <div className={styles.barChart}>
          {events.map((event, index) => {
            const barHeight = (event.revenue / maxRevenue) * 100;
            return (
              <div key={index} className={styles.barItem}>
                <div className={styles.bar}
                  style={{ height: `${Math.max(barHeight, 1)}%` }}
                >
                  <span className={styles.barLabel}>{event.revenue}tr</span>
                </div>
                <span className={styles.eventName}>{event.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.ticketContainer}>
        <h3 className={styles.ticketTitle}>Phân bổ loại vé</h3>
        <div className={styles.ticketList}>
          {tickets.map((ticket, index) => (
            <div key={index} className={styles.ticketItem}>
              <div className={styles.ticketInfo}>
                  <div className={styles.ticketType}>{ticket.type} ({ticket.price})</div>
                  <div className={styles.ticketPercent}>{ticket.percent}%</div>
              </div>
              <div className={styles.progressBar}>
                  <div
                  className={styles.progressFill}
                  style={{width:`${ticket.percent}%`}}
                  >
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
