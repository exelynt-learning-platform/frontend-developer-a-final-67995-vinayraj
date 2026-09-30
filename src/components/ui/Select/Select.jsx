import React from 'react';
import styles from './Select.module.css';

export const Select = ({
  label,
  id,
  name,
  value,
  onChange,
  onBlur,
  options = [],
  placeholder = 'Select an option',
  error,
  required = false,
  isDisabled = false,
  isLoading = false,
  className = '',
  ...props
}) => {
  const selectId = id || name;

  return (
    <div className={`${styles.wrapper} ${error ? styles.hasError : ''} ${className}`}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.selectContainer}>
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={isDisabled || isLoading}
          className={styles.select}
          {...props}
        >
          <option value="">
            {isLoading ? 'Loading options...' : placeholder}
          </option>
          {options.map((opt, idx) => {
            let optionValue = '';
            let optionLabel = '';

            if (typeof opt === 'string' || typeof opt === 'number') {
              optionValue = String(opt);
              optionLabel = String(opt);
            } else if (typeof opt === 'object' && opt !== null) {
              optionValue = opt.value || opt.country || opt.name || opt.id || String(idx);
              optionLabel = opt.label || opt.country || opt.name || optionValue;
            }

            if (!optionValue && !optionLabel) return null;

            return (
              <option key={`${optionValue}-${idx}`} value={optionValue}>
                {optionLabel}
              </option>
            );
          })}
        </select>
        <div className={styles.arrow} />
      </div>
      {error && <p className={styles.errorMessage} role="alert">{error}</p>}
    </div>
  );
};
