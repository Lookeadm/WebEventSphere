import React, { useState } from 'react';
import styles from '../styles/LoginScreen.module.css';
import { useRouter } from 'next/router';

export default function LoginScreen() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');

    const userList = [
        { username: 'nam', password: '123' },
        { username: 'nguyen', password: '123' },
        { username: 'toan', password: '123' },
        { username: 'dat', password: '123' },
        { username: 'si', password: '123' }
    ];

    const handleLogin = () => {
        let isValid = true;
        setLoginError('');

        if (username.trim() === '') {
            setUsernameError('Tên đăng nhập không được để trống');
            isValid = false;
        } else {
            setUsernameError('');
        }

        if (password.trim() === '') {
            setPasswordError('Mật khẩu không được để trống');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (isValid) {
            const foundUser = userList.find(user => user.username === username && user.password === password);
            if (foundUser) {
                alert('Đăng nhập thành công');
                router.push('/ManagerScreen');
            } else {
                setLoginError('Tên đăng nhập hoặc mật khẩu không đúng');
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginContainer}>
                <h1>Đăng nhập</h1>

                <div className={styles.formItems}>
                    <input
                        className={styles.formInputs}
                        type="text"
                        placeholder="Tên đăng nhập"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <span className={usernameError ? 'show' : ''}>{usernameError}</span>
                </div>

                <div className={styles.formItems}>
                    <input
                        className={styles.formInputs}
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className={passwordError ? 'show' : ''}>{passwordError}</span>
                </div>

                <div className={styles.formItems}>
                    <button
                        className={styles.formButtons}
                        type="button"
                        onClick={handleLogin}
                    >
                        Đăng nhập
                    </button>
                    <span className={loginError ? 'show' : ''}>{loginError}</span>
                </div>
            </div>
        </div>
    );
}
