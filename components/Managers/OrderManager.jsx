import React, { useEffect } from 'react'
import styles from '../../styles/UserManager.module.css'
import { useState } from 'react';
import AxiosInstance from '../../pages/api/AxiosInstance';

const userPerPage = 8;

export default function OrderManager() {
    const [currentPage, setCurrentPage] = useState(0);
    const [sortUser, setSortUser] = useState('asc');
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await AxiosInstance().get('orders/getOrders');
                setOrders(data);
                console.log(data);
            } catch (e) {
                console.log("Lấy đơn hàng thất bại: " + e);
            }
        }
        fetchOrder();
    }, []);

    const handleSortByName = () => {
        setSortUser(prevSort => prevSort === 'asc' ? 'desc' : 'asc');
        setCurrentPage(0);
    };

    const sortedUsers = [...orders].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt); 
    });

    const totalPages = Math.ceil(sortedUsers.length / userPerPage);

    const startIndex = currentPage * userPerPage;

    const paginatedUsers = sortedUsers.slice(startIndex, startIndex + userPerPage);

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
    if (paginatedUsers.length < userPerPage) {
        const emptyRowsCount = userPerPage - paginatedUsers.length;
        for (let i = 0; i < emptyRowsCount; i++) {
            emptyRows.push(i);
        }
    }

    return (
        <div className={styles.managerContainer}>
            <div className={styles.managerTitle}>
                <h2>Quản lý đơn hàng</h2>
            </div>
            <div className={styles.tableTitle}>
                <h3>
                    Danh sách đơn hàng
                </h3>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>
                            ID đơn hàng 
                        </th>
                        <th>Sự kiện</th>
                        <th>Tên người dùng</th>
                        <th>Email</th>
                        <th>Trạng thái</th>
                        <th>Ngày tạo</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.eventId?.name || "Không có tên sự kiện"}</td>
                            <td>{order.userId?.username || "Không có tên người dùng"}</td>
                            <td>{order.userId?.email || "Không có email"}</td>
                            <td>{order.status}</td>
                            <td>
                                {(() => {
                                    const date = new Date(order.createdAt);
                                    const day = String(date.getUTCDate()).padStart(2, '0');
                                    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                                    const year = date.getUTCFullYear();
                                    const hours = String(date.getUTCHours()).padStart(2, '0');
                                    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
                                    return `${day}/${month}/${year} ${hours}:${minutes}`;
                                })()}
                            </td>
                            <td>
                                <button className={styles.detailButton}>Chi tiết</button>
                            </td>
                        </tr>
                    ))}
                    {emptyRows.map((i) => (
                        <tr key={`empty-${i}`} className={styles.emptyRow}>
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
