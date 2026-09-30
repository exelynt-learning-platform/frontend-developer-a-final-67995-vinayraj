import React from 'react';
import { Users, Plus, Building2 } from 'lucide-react';
import { Button } from '../../ui/Button/Button';
import styles from './Navbar.module.css';

export const Navbar = ({ totalEmployees = 0, onAddClick }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logoBadge}>
            <Building2 size={22} />
          </div>
          <div>
            <h1 className={styles.title}>Employee Manager</h1>
            <p className={styles.author}>Developed by Vinay Raj Dhondi Jugge</p>
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.statChip}>
            <Users size={16} className={styles.statIcon} />
            <span>Total Employees: <strong>{totalEmployees}</strong></span>
          </div>

          <Button
            variant="primary"
            size="md"
            icon={Plus}
            onClick={onAddClick}
          >
            Add Employee
          </Button>
        </div>
      </div>
    </header>
  );
};
