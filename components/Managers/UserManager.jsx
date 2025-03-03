import React, { useEffect } from 'react'
import styles from '../../styles/UserManager.module.css'
import { useState } from 'react';
import AxiosInstance from '../../pages/api/AxiosInstance';

const users = [
    { name: "Nguyen Tien Si", email: "titiensibo2706@gmail.com", phone: "0979723641" },
    { name: "trungnguyen", email: "trungnguyenk4.it@gmail.com", phone: "0945691404" },
    { name: "toan", email: "thanhtoan123@gmail.com", phone: "0945691421" },
    { name: "dat", email: "datn3460@gmail.com", phone: "0345618563" },
    { name: "Nam Nguyễn", email: "namnnps38713@gmail.com", phone: "0399092212" },
    { name: "nam", email: "namnn51204@gmail.com", phone: "0390922121" },
    { name: "đạt", email: "datn34886@gmail.com", phone: "09231245781" },
];
const userPerPage = 8;

export default function UserManager() {
    const [currentPage, setCurrentPage] = useState(0);
    const [sortUser, setSortUser] = useState('asc');
    const [user, setUser] = useState([]);
    

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await AxiosInstance().get('users/all');
                setUser(userData.data);
            } catch (e) {
                console.log("Lấy người dùng thất bại: " + e);
            }
        }
        fetchUser();
    }, []);

    const handleSortByName = () => {
        setSortUser(sortUser === 'asc' ? 'desc' : 'asc');
        setCurrentPage(0);
    };

    const sortedUsers = [...users].sort((a, b) => {
        if (sortUser === 'asc') {
            return a.name.localeCompare(b.name, 'vi');
        } else {
            return b.name.localeCompare(a.name, 'vi');
        }
    })

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
                <h2>Quản lý người dùng</h2>
            </div>
            <div className={styles.tableTitle}>
                <h3>
                    Danh sách người dùng
                </h3>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th onClick={handleSortByName} className={styles.sortableHeader}>
                            Tên người dùng {sortUser === 'asc' ? <img className={styles.sortIcon} src='/assets/sort-up-svgrepo-com.svg'></img> : <img className={styles.sortIcon} src='/assets/sort-down-svgrepo-com.svg'></img>}
                        </th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedUsers.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
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
                    <span>Trang {currentPage + 1} / {totalPages}</span>
                </div>
            </div>
        </div>

    )
}
