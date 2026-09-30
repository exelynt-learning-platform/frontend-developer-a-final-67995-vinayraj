import React from 'react';
import styles from './Spinner.module.css';

export const Spinner = ({ size = 'md', label = 'Loading...' }) => {
  return (
    <div className={styles.container} role="status">
      <div className={`${styles.spinner} ${styles[size]}`} />
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
};
