import React from 'react';
import styles from './Input.module.css';

export const Input = ({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  helperText,
  required = false,
  isDisabled = false,
  icon: Icon = null,
  className = '',
  ...props
}) => {
  const inputId = id || name;

  return (
    <div className={`${styles.wrapper} ${error ? styles.hasError : ''} ${className}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.inputContainer}>
        {Icon && <Icon size={18} className={styles.inputIcon} />}
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={isDisabled}
          className={`${styles.input} ${Icon ? styles.hasLeftIcon : ''}`}
          {...props}
        />
      </div>
      {error ? (
        <p className={styles.errorMessage} role="alert">{error}</p>
      ) : helperText ? (
        <p className={styles.helperMessage}>{helperText}</p>
      ) : null}
    </div>
  );
};
