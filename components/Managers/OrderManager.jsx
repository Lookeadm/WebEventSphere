import React, { useEffect, useState } from 'react';
import styles from '../../styles/OrderManager.module.css';
import AxiosInstance from '../../pages/api/AxiosInstance';

const userPerPage = 4;

export default function OrderManager() {
    const [currentPage, setCurrentPage] = useState(0);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true);
            setError('');
            try {
                const { data } = await AxiosInstance().get('orders/getOrders');
                setOrders(data);
            } catch (e) {
                setError('Lấy đơn hàng thất bại!');
                console.error('Lấy đơn hàng thất bại: ', e);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, []);

    const handleSortByDate = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        setCurrentPage(0);
    };

    const sortedOrders = [...orders].sort((a, b) => {
        if (sortOrder === 'asc') {
            return new Date(a.createdAt) - new Date(b.createdAt);
        } else {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
    });



    const totalPages = Math.ceil(sortedOrders.length / userPerPage);
    const startIndex = currentPage * userPerPage;
    const paginatedOrders = sortedOrders.slice(startIndex, startIndex + userPerPage);

    const handlePreviousPage = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
    };


    const emptyRowsCount = userPerPage - paginatedOrders.length;
    const emptyRows = Array.from({ length: emptyRowsCount }, (_, i) => i);


    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    return (
        <div className={styles.managerContainer}>
            <div className={styles.managerTitle}>
                <h2>Quản lý đơn hàng</h2>
            </div>
            <div className={styles.tableTitle}>
                <h3>Danh sách đơn hàng</h3>
            </div>


            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : error ? (
                <p className={styles.errorText}>{error}</p>
            ) : (
                <>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID đơn hàng</th>
                                <th>Sự kiện</th>
                                <th>Tên người dùng</th>
                                <th>Email</th>
                                <th>Trạng thái</th>
                                <th onClick={handleSortByDate}>
                                    Ngày tạo  {sortOrder === 'asc'
                                        ? <img className={styles.sortIcon} src='/assets/sort-up-svgrepo-com.svg' alt="asc" />
                                        : <img className={styles.sortIcon} src='/assets/sort-down-svgrepo-com.svg' alt="desc" />
                                    }
                                </th>
                                <th>Chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedOrders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.eventId?.name || 'Không có tên sự kiện'}</td>
                                    <td>{order.userId?.username || 'Không có tên người dùng'}</td>
                                    <td>{order.userId?.email || 'Không có email'}</td>
                                    <td>{order.status}</td>
                                    <td>{formatDateTime(order.createdAt)}</td>
                                    <td>
                                        <button className={styles.detailButton}>Chi tiết</button>
                                    </td>
                                </tr>
                            ))}
                            {emptyRows.map((i) => (
                                <tr key={`empty-${i}`} className={styles.emptyRow}>
                                    <td colSpan={7}>&nbsp;</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className={styles.paginationContainer}>
                        <div>
                            <button
                                onClick={handlePreviousPage}
                                className={styles.paginationButtons}
                                disabled={currentPage === 0}
                            >
                                <img src="/assets/arrow-narrow-left.svg" alt="Previous" />
                            </button>
                            <button
                                onClick={handleNextPage}
                                className={styles.paginationButtons}
                                disabled={currentPage >= totalPages - 1}
                            >
                                <img src="/assets/arrow-narrow-right.svg" alt="Next" />
                            </button>
                        </div>
                        <div className={styles.numberOfPages}>
                            <span>Trang {currentPage + 1} / {totalPages}</span>
                        </div>
                    </div>
                    <div className={styles.dashboardContainer}>
                            <div className={styles.dashboard}>
                                <span className={styles.dashboardTitle}>Tổng quan</span>
                                <div className={styles.dashboardItem}>
                                    <span className={styles.dashboardItemTitle}>Tổng đơn hàng</span>
                                    <span className={styles.dashboardItemCount}>123</span>
                                </div>

                                <div className={styles.dashboardItem}>
                                    <span className={styles.dashboardItemTitle}>Đã xác nhận</span>
                                    <span className={styles.dashboardItemCount}>256</span>
                                </div>

                                <div className={styles.dashboardItem}>
                                    <span className={styles.dashboardItemTitle}>Đã hủy</span>
                                    <span className={styles.dashboardItemCount}>15</span>
                                </div>
                            </div>
                    </div>
                </>
            )}
        </div>
    );
}
