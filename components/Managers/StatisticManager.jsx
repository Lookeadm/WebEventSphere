import React, { useEffect, useState, useMemo } from 'react'
import styles from '../../styles/StatisticManager.module.css'
import AxiosInstance from '../../pages/api/AxiosInstance'

export default function StatisticManager() {
  const [revenue, setRevenue] = useState([]);
  const [eventsEnd, setEventsEnd] = useState([]);
  const [eventsProgress, setEventsProgress] = useState([]);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const resRevenue = await AxiosInstance().get('events/revenue');
        setRevenue(resRevenue.data);
      }
      catch (e) {
        console.log("Thống kê thất bại " + e);
      }
    }
    fetchRevenue();
  }, []);

  const totalRevenue = () => revenue.reduce((total, rev) => total + rev.revenue, 0);

  const totalTicket = () => revenue.reduce((total, rev) => total + rev.soldTickets, 0);

  const eventProgress = () => revenue.filter(rev => rev.status === "Progress").length;

  const eventEnd = () => revenue.filter(rev => rev.status === "End").length;

  const statistics = useMemo(() => [
    {
      title: "Tổng doanh thu",
      value: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalRevenue()),
      change: 15.2,
    },
    {
      title: "Số vé đã bán",
      value: totalTicket(),
      change: 10.5,
    },
    {
      title: "Sự kiện đã diễn ra",
      value: eventEnd(),
      change: -1,
    },
    {
      title: "Sự kiện đang diễn ra",
      value: eventProgress(),
      change: -1,
    },
  ], [revenue]);

  const getRevenueClass = (change) => {
    return change >= 0 ? styles.revenuePositive : styles.revenueNegative;
  };

  const formatChangeText = (change) => {
    return change >= 0
      ? `+${change}% so với tháng trước`
      : `${change}% so với tháng trước`;
  };

  // su kien
  const events = () => {
    const endEvents = [];
    const progressEvents = [];
    
    revenue.forEach(revenue => {
      if (revenue.status === "End") {
        endEvents.push(revenue);
      } else {
        progressEvents.push(revenue);
      }
    });

    setEventsEnd(endEvents);
    setEventsProgress(progressEvents);
  };

  useEffect(() => {
    if (revenue.length > 0) {
      events();
    }
  }, [revenue]);

  const maxRevenue = useMemo(() => Math.max(...eventsEnd.map(e => e.revenue)), [eventsEnd]);

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
        <h3 className={styles.chartTitle}>Doanh thu theo sự kiện đang diễn ra</h3>
        <div className={styles.barChart}>
          {eventsProgress.map((event, index) => {
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

      <div className={styles.chartContainer}>
        <h3 className={styles.chartTitle}>Doanh thu sự kiện đã diễn ra</h3>
        <div className={styles.barChart}>
          {eventsEnd.map((event, index) => {
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

      {/* <div className={styles.ticketContainer}>
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
                  style={{ width: `${ticket.percent}%` }}
                >
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  )
}
