import React from 'react';
import styles from './styles/Sidebar.module.css';

const UserInfo = ({ userName = 'Emilio Pérez', avatarUrl, onLogout }) => {
    return (
        <div className={styles.userInfoWrapper}>
            <div className={styles.userInfo}>
                <img
                    src={avatarUrl || 'https://picsum.photos/50/50?grayscale'}
                    alt="User"
                    className={styles.avatar}
                />
                <span className={styles.userName}>{userName}</span>
            </div>
            <button className={styles.logoutBtn} onClick={onLogout}>
                🔒 Cerrar sesión
            </button>
        </div>
    );
};

export default UserInfo;