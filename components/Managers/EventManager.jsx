import React from 'react'
import styles from '../../styles/EventManager.module.css'
import { useState } from 'react';
import Link from 'next/link';


const events = [
    { name: "Nguyen Tien Si", images: "/images/penguine.png", ticketCost: "120.000 VND", ticketCount: 1200 },
    { name: "trungnguyen", images: "/images/penguine.png", ticketCost: "140.000 VND", ticketCount: 500 },
    { name: "toan", images: "/images/penguine.png", ticketCost: "100.000 VND", ticketCount: 5000 },
    { name: "si đẹp trai hehehe", images: "/images/penguine.png", ticketCost: "120.000 VND", ticketCount: 1000 },
    { name: "dat", images: "/images/penguine.png", ticketCost: "130.000 VND", ticketCount: 1000 },
    { name: "Nam Nguyễn", images: "/images/penguine.png", ticketCost: "90.000 VND", ticketCount: 1100 },
    { name: "nam", images: "/images/penguine.png", ticketCost: "170.000 VND", ticketCount: 900 },
    { name: "toanpt301ne", images: "/images/penguine.png", ticketCost: "120.000 VND", ticketCount: 1200 },
    { name: "đạt", images: "/images/penguine.png", ticketCost: "200.000 VND", ticketCount: 700 },
];
const eventPerPage = 5;

export default function EventManager() {
    const [currentPage, setCurrentPage] = useState(0);
    const [sortEvent, setSortEvent] = useState('asc');
    const [sortColumn, setSortColumn] = useState('name');

    const handleSortByColumn = (column) => {
        if (sortColumn === column) {
            setSortEvent(sortEvent === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortEvent('asc');
        }
        setCurrentPage(0);
    };


    const sortedEvents = [...events].sort((a, b) => {
        let compare = 0;

        if (sortColumn === 'name') {
            compare = a.name.localeCompare(b.name, 'vi');
        } else if (sortColumn === 'ticketCount') {
            compare = a.ticketCount - b.ticketCount;
        } else if (sortColumn === 'ticketCost') {
            const priceA = parseInt(a.ticketCost.replace(/[^\d]/g, ''), 10);
            const priceB = parseInt(b.ticketCost.replace(/[^\d]/g, ''), 10);
            compare = priceA - priceB;
        }

        return sortEvent === 'asc' ? compare : -compare;
    });


    const totalPages = Math.ceil(events.length / eventPerPage);

    const startIndex = currentPage * eventPerPage;

    const paginatedEvents = sortedEvents.slice(startIndex, startIndex + eventPerPage);

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
    if (paginatedEvents.length < eventPerPage) {
        const emptyRowsCount = eventPerPage - paginatedEvents.length;
        for (let i = 0; i < emptyRowsCount; i++) {
            emptyRows.push(i);
        }
    }

    const SortIcon = ({ column }) => {
        const isActive = sortColumn === column;
        const iconSrc = isActive
            ? (sortEvent === 'asc' ? '/assets/sort-up-svgrepo-com.svg' : '/assets/sort-down-svgrepo-com.svg')
            : '/assets/sort-svgrepo-com.svg'; 
    
        return <img className={styles.sortIcon} src={iconSrc} />;
    };

    
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
                        <th onClick={() => handleSortByColumn('name')} className={styles.sortableHeader}>
                            Tên sự kiện <SortIcon column="name" />                        </th>
                        <th>Ảnh</th>
                        <th onClick={() => handleSortByColumn('ticketCost')} className={styles.sortableHeader}>
                            Giá vé <SortIcon column="ticketCost" />                        </th>
                        <th onClick={() => handleSortByColumn('ticketCount')} className={styles.sortableHeader}>
                            Số lượng vé <SortIcon column="ticketCount" />                        </th>
                        <th>Chi tiết</th>

                    </tr>
                </thead>
                <tbody>
                    {paginatedEvents.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>
                                <img src={user.images} alt="" className={styles.eventImages} />
                            </td>
                            <td>{user.ticketCost}</td>
                            <td>{user.ticketCount}</td>
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
