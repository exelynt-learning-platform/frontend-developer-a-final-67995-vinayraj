import React from 'react';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>© 2026 EXELYNT Assignment Solution. Built by <strong>Vinay Raj Dhondi Jugge</strong>.</p>
        <p className={styles.subtext}>React JS • Redux Toolkit • CSS Modules • Smart/Dumb Architecture</p>
      </div>
    </footer>
  );
};
