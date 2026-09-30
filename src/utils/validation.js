/**
 * Form Validation Utilities for Employee Management System
 */

export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return 'Email is required';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address';
  }
  return '';
};

export const validateMobile = (mobile) => {
  if (!mobile || !mobile.trim()) {
    return 'Mobile number is required';
  }
  const mobileRegex = /^[0-9+\s-]{10,15}$/;
  if (!mobileRegex.test(mobile.trim())) {
    return 'Mobile number must contain 10 to 15 valid digits';
  }
  return '';
};

export const validateName = (name) => {
  if (!name || !name.trim()) {
    return 'Full name is required';
  }
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters long';
  }
  if (name.trim().length > 50) {
    return 'Name cannot exceed 50 characters';
  }
  return '';
};

export const validateRequired = (value, fieldName = 'Field') => {
  if (!value || !value.trim()) {
    return `${fieldName} is required`;
  }
  return '';
};

export const validateEmployeeForm = (formData) => {
  const errors = {};

  const nameError = validateName(formData.name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  const mobileError = validateMobile(formData.mobile);
  if (mobileError) errors.mobile = mobileError;

  const countryError = validateRequired(formData.country, 'Country');
  if (countryError) errors.country = countryError;

  const stateError = validateRequired(formData.state, 'State');
  if (stateError) errors.state = stateError;

  const districtError = validateRequired(formData.district, 'District');
  if (districtError) errors.district = districtError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
