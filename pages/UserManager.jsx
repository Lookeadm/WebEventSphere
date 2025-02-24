import React from 'react'
import ManagerList from '../components/Managers/ManagerList'
import styles from '../styles/Manager.module.css'
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
export default function UserManager() {
  return (
    <div className={styles.container}>
        <ManagerList />
        <div className={styles.managerContainer}>
            <div className={styles.managerTitle}>
                <h2>Quan ly nguoi dung</h2>
            </div>
            <div>
                <h3>
                    Danh sach nguoi dung
                </h3>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Ten nguoi dung</th>
                        <th>Email</th>
                        <th>So dien thoai</th>
                        <th>Su kien</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                                <button className={styles.detailButton}>Chi tiet</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}
