import React from 'react'
import styles from '../../styles/ManagerList.module.css'
const ManagerList = () => {
  return (
    <div className={styles.listManagerContainer}>
        <div className={styles.listManagerLogo}>
            <img className={styles.logo} src={require('../../public/images/penguine.jpg')} alt="" />
        </div>
        <div className="listManagerItem">
            <button className={styles.listManagerButton}>
                Quan ly nguoi dung
            </button>
        </div>
        <div className="listManagerItem">
            <button className={styles.listManagerButton}>
                Quan ly nguoi dung
            </button>
        </div>
        <div className="listManagerItem">
            <button className={styles.listManagerButton}>
                Quan ly nguoi dung
            </button>
        </div>
        <div className="listManagerItem">
            <button className={styles.listManagerButton}>
                Quan ly nguoi dung
            </button>
        </div>
    </div>
  )
}

export default ManagerList
