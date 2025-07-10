import React from 'react';
import styles from './styles/StatCard.module.css';

const StatCard = ({ icon, title, value }) => {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.cardTitle}>{title}</div>
      <div className={styles.cardValue}>{value}</div>
    </div>
  );
};

export default StatCard;