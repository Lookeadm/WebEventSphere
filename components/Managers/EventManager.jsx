import React, { useEffect } from 'react'
import styles from '../../styles/EventManager.module.css'
import { useState } from 'react';
import Link from 'next/link';

const events = [
    { name: "Nguyen Tien Si", images: "/images/penguine.png", ticketCost: "120.000 VND", ticketCount: 1000 },
    { name: "trungnguyen", images: "/images/penguine.png", ticketCost: "120.000 VND", ticketCount: 1000 },
    { name: "toan", images: "/images/penguine.png", ticketCost: "120.000 VND", ticketCount: 1000 },
    { name: "si đẹp trai hehehe", images: "/images/penguine.png", ticketCost: "120.000 VND", ticketCount: 1000 },
    { name: "dat", images: "/images/penguine.png", ticketCost: "120.000 VND", ticketCount: 1000 },
    { name: "Nam Nguyễn", images: "/images/penguine.png", ticketCost: "120.000 VND", ticketCount: 1000 },
    { name: "nam", images: "/images/penguine.png", ticketCost: "120.000 VND", ticketCount: 1000 },
    { name: "toanpt301ne", images: "/images/penguine.png", ticketCost: "120.000 VND", ticketCount: 1000 },
    { name: "đạt", images: "/images/penguine.png", ticketCost: "120.000 VND", ticketCount: 1000 },
];

const userPerPage = 5;

export default function EventManager() {
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(events.length / userPerPage);
    const startIndex = currentPage * userPerPage;
    const selectedevents = events.slice(startIndex, startIndex + userPerPage);
    const [event, setEvent] = useState([]);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const getEvent = await fetch('/api/eventsApi');
                const eventsData = await getEvent.json();
                setEvent(eventsData.data);
            } catch (e) {
                console.log("Lấy sự kiện thất bại", e)
            }
        }
        fetchEvent();
    }, [])

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const emptyRows = [];
    if (selectedevents.length < userPerPage) {
        const emptyRowsCount = userPerPage - selectedevents.length;
        for (let i = 0; i < emptyRowsCount; i++) {
            emptyRows.push(i);
        }
    }
    return (
        <div className={styles.managerContainer}>
            <div className={styles.managerTitle}>
                <h2>Quản lý sự kiện</h2>
            </div>
            <div className={styles.tableTitle}>
                <h3>
                    Danh sách sự kiện
                </h3>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Tên sự kiện</th>
                        <th>Ảnh</th>
                        <th>Giá vé</th>
                        <th>Số lượng vé</th>
                        <th>Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {event.map((event, index) => (
                        <tr key={index}>
                            <td>{event.name}</td>
                            <td>
                                <img src={event.avatar} alt="" className={styles.eventImages} />
                            </td>
                            <td>{event.ticketPrice}</td>
                            <td>{event.ticketQuantity}</td>
                            <td>
                                <Link href='/EventManagerDetail'>
                                    <button className={styles.detailButton}>Chi tiết</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    {emptyRows.map((i) => (
                        <tr key={`empty-${i}`} className={styles.emptyRow}>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.paginationContainer}>
                <div>
                    <button onClick={handlePreviousPage} className={styles.paginationButtons}>
                        <img src="/assets/arrow-narrow-left.svg" alt="" />
                    </button>
                    <button onClick={handleNextPage} className={styles.paginationButtons}>
                        <img src="/assets/arrow-narrow-right.svg" alt="" />
                    </button>
                </div>
                <div className={styles.numberOfPages}>
                    <span>Page {currentPage + 1} of {totalPages}</span>
                </div>
            </div>
        </div>

    )
}
