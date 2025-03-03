import React, { useEffect, useState } from 'react';
import styles from '../../styles/EventManager.module.css';
import Link from 'next/link';

const eventPerPage = 5;

export default function EventManager() {
    const [currentPage, setCurrentPage] = useState(0);
    const [event, setEvent] = useState([]);
    const [sortEvent, setSortEvent] = useState('asc');
    const [sortColumn, setSortColumn] = useState('name');
    const [filterStatus, setFilterStatus] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await fetch('/api/eventsApi');
                const data = await res.json();
                setEvent(data.data || []);
            } catch (e) {
                console.log("Lấy sự kiện thất bại", e);
            }
        };
        fetchEvent();
    }, []);

    const handleSortByColumn = (column) => {
        if (sortColumn === column) {
            setSortEvent(sortEvent === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortEvent('asc');
        }
        setCurrentPage(0);
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
    };

    const SortIcon = ({ column }) => {
        const isActive = sortColumn === column;
        const iconSrc = isActive
            ? (sortEvent === 'asc' ? '/assets/sort-up-svgrepo-com.svg' : '/assets/sort-down-svgrepo-com.svg')
            : '/assets/sort-svgrepo-com.svg';
        return <img className={styles.sortIcon} src={iconSrc} />;
    };

    const handleFilterChange = (status) => {
        setFilterStatus(status);
    };

    const getEventStatus = (event) => {
        const now = new Date();
        if (new Date(event.timeEnd) < now) {
            return 'Kết thúc';
        } else if (new Date(event.timeStart) > now) {
            return 'Sắp diễn ra';
        } else {
            return 'Đang diễn ra';
        }
    };

    const sortedEvents = [...event].sort((a, b) => {
        let compare = 0;
        if (sortColumn === 'name') {
            compare = a.name.localeCompare(b.name, 'vi');
        } else if (sortColumn === 'ticketCount') {
            compare = a.ticketQuantity - b.ticketQuantity;
        } else if (sortColumn === 'ticketCost') {
            const priceA = parseInt(String(a.ticketPrice).replace(/[^\d]/g, ''), 10) || 0;
            const priceB = parseInt(String(b.ticketPrice).replace(/[^\d]/g, ''), 10) || 0;
            compare = priceA - priceB;
        }
        return sortEvent === 'asc' ? compare : -compare;
    });

    const filteredEvents = filterStatus
        ? event.filter(event => getEventStatus(event) === filterStatus)
        : event;

    const totalPages = Math.ceil(filteredEvents.length / eventPerPage);
    const startIndex = currentPage * eventPerPage;
    const paginatedEvents = filteredEvents.slice(startIndex, startIndex + eventPerPage);
    const emptyRows = Array(eventPerPage - paginatedEvents.length).fill(null);

    return (
        <div className={styles.managerContainer}>
            <div className={styles.managerTitle}>
                <h2>Quản lý sự kiện</h2>
                
            </div>
            <div className={styles.tableTitle}>
                <h3>Danh sách sự kiện</h3>
                <Link href={'/EventManagerDetail'}>
                <button className={styles.addEventButton}>
                    Thêm sự kiện 
                </button>
                </Link>
            </div>

            <div>
                <label>
                    <input type="radio" name="status" value="" checked={!filterStatus} onChange={() => handleFilterChange('')} />
                    Tất cả
                </label>
                <label>
                    <input type="radio" name="status" value="Kết thúc" onChange={() => handleFilterChange('Kết thúc')} />
                    Kết thúc
                </label>
                <label>
                    <input type="radio" name="status" value="Đang diễn ra" onChange={() => handleFilterChange('Đang diễn ra')} />
                    Đang diễn ra
                </label>
                <label>
                    <input type="radio" name="status" value="Sắp diễn ra" onChange={() => handleFilterChange('Sắp diễn ra')} />
                    Sắp diễn ra
                </label>
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th onClick={() => handleSortByColumn('name')} className={styles.sortableHeader}>
                            Tên sự kiện <SortIcon column="name" />
                        </th>
                        <th>Ảnh</th>
                        <th onClick={() => handleSortByColumn('ticketCost')} className={styles.sortableHeader}>
                            Giá vé <SortIcon column="ticketCost" />
                        </th>
                        <th onClick={() => handleSortByColumn('ticketCount')} className={styles.sortableHeader}>
                            Số lượng vé <SortIcon column="ticketCount" />
                        </th>
                        <th>Trạng thái</th>
                        <th>Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedEvents.length > 0 ? (
                        paginatedEvents.map((event, index) => (
                            <tr key={index}>
                                <td>{event.name}</td>
                                <td>
                                    <img src={event.avatar} alt="" className={styles.eventImages} />
                                </td>
                                <td>{event.ticketPrice}</td>
                                <td>{event.ticketQuantity}</td>
                                <td>{getEventStatus(event)}</td>
                                <td>
                                    <Link href={`/EventManagerDetail?id=${event._id}`}>
                                        <button className={styles.detailButton}>Chi tiết</button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6}>Không có sự kiện nào để hiển thị.</td>
                        </tr>
                    )}
                    {emptyRows.map((_, index) => (
                        <tr key={`empty-${index}`} className={styles.emptyRow}>
                            <td colSpan={5}>&nbsp;</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={styles.paginationContainer}>
                <div>
                    <button onClick={handlePreviousPage} className={styles.paginationButtons}>
                        <img src="/assets/arrow-narrow-left.svg" alt="Previous" />
                    </button>
                    <button onClick={handleNextPage} className={styles.paginationButtons}>
                        <img src="/assets/arrow-narrow-right.svg" alt="Next" />
                    </button>
                </div>
                <div className={styles.numberOfPages}>
                    <span>Trang {currentPage + 1} /  {totalPages}</span>
                </div>
            </div>
        </div>
    );
}
