import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import styles from './Alert.module.css';

export const Alert = ({
  type = 'info', // 'success' | 'error' | 'warning' | 'info'
  title,
  children,
  onClose,
  className = '',
}) => {
  const iconMap = {
    success: CheckCircle2,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const Icon = iconMap[type] || Info;

  return (
    <div className={`${styles.alert} ${styles[type]} ${className}`} role="alert">
      <Icon size={20} className={styles.icon} />
      <div className={styles.content}>
        {title && <h4 className={styles.title}>{title}</h4>}
        <div className={styles.message}>{children}</div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className={styles.closeBtn}
          aria-label="Dismiss alert"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
