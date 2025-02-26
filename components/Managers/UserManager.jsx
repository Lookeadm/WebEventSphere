import React from 'react'
import styles from '../../styles/UserManager.module.css'
import { useState } from 'react';


const users = [
    { name: "Nguyen Tien Si", email: "titiensibo2706@gmail.com", phone: "0979723641" },
    { name: "trungnguyen", email: "trungnguyenk4.it@gmail.com", phone: "0945691404" },
    { name: "toan", email: "thanhtoan123@gmail.com", phone: "0945691421" },
    { name: "si đẹp trai hehehe", email: "titiensibo2706@gmail.com", phone: "0979723641" },
    { name: "dat", email: "datn3460@gmail.com", phone: "0345618563" },
    { name: "Nam Nguyễn", email: "namnnps38713@gmail.com", phone: "0399092212" },
    { name: "nam", email: "namnn51204@gmail.com", phone: "0390922121" },
    { name: "toanpt301ne", email: "phamthanhtoan301bt@gmail.com", phone: "0349535063" },
    { name: "đạt", email: "datn34886@gmail.com", phone: "09231245781" },
];
const userPerPage = 8;

export default function UserManager() {
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(users.length / userPerPage);
    const startIndex = currentPage * userPerPage;
    const selectedUsers = users.slice(startIndex, startIndex + userPerPage);

    const handlePreviousPage = () => {
        if(currentPage > 0){
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if(currentPage < totalPages - 1){
            setCurrentPage(currentPage + 1);
        }
    };

    const emptyRows = [];
    if (selectedUsers.length < userPerPage) {
        const emptyRowsCount = userPerPage - selectedUsers.length;
        for (let i = 0; i < emptyRowsCount; i++) {
            emptyRows.push(i);
        }
    }
  return (
        <div className={styles.managerContainer}>
            <div className={styles.managerTitle}>
                <h2>Quản lý người dùng</h2>
            </div>
            <div>
                <h3>
                    Danh sách người dùng
                </h3>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Tên người dùng</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Sự kiện</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedUsers.map((user, index) => (
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
                            Prev
                        </button>
                        <button onClick={handleNextPage} className={styles.paginationButtons}>
                            Next
                        </button>
                    </div>
                    <div className={styles.numberOfPages}>
                        <span>Page {currentPage + 1} of {totalPages}</span>
                    </div>
                </div>
        </div>
   
  )
}
