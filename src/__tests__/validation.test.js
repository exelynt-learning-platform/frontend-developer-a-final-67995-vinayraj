import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validateMobile,
  validateName,
  validateRequired,
  validateEmployeeForm,
} from '../utils/validation';

describe('Form Validation Utilities', () => {
  describe('validateEmail', () => {
    it('returns error when email is empty', () => {
      expect(validateEmail('')).toBe('Email is required');
      expect(validateEmail('   ')).toBe('Email is required');
    });

    it('returns error for invalid email formats', () => {
      expect(validateEmail('invalidemail')).toBe('Please enter a valid email address');
      expect(validateEmail('test@com')).toBe('Please enter a valid email address');
      expect(validateEmail('@domain.com')).toBe('Please enter a valid email address');
    });

    it('returns empty string for valid email addresses', () => {
      expect(validateEmail('user@example.com')).toBe('');
      expect(validateEmail('john.doe@company.co.in')).toBe('');
    });
  });

  describe('validateMobile', () => {
    it('returns error when mobile is empty', () => {
      expect(validateMobile('')).toBe('Mobile number is required');
    });

    it('returns error for invalid phone numbers', () => {
      expect(validateMobile('12345')).toBe('Mobile number must contain 10 to 15 valid digits');
      expect(validateMobile('abc123456789')).toBe('Mobile number must contain 10 to 15 valid digits');
    });

    it('returns empty string for valid 10-15 digit mobile numbers', () => {
      expect(validateMobile('9876543210')).toBe('');
      expect(validateMobile('+91-9876543210')).toBe('');
    });
  });

  describe('validateName', () => {
    it('returns error when name is empty or too short', () => {
      expect(validateName('')).toBe('Full name is required');
      expect(validateName('A')).toBe('Name must be at least 2 characters long');
    });

    it('returns error when name exceeds max length', () => {
      const longName = 'A'.repeat(51);
      expect(validateName(longName)).toBe('Name cannot exceed 50 characters');
    });

    it('returns empty string for valid names', () => {
      expect(validateName('Vinay Raj')).toBe('');
    });
  });

  describe('validateEmployeeForm', () => {
    it('validates a complete valid employee object', () => {
      const validData = {
        name: 'Vinay Raj Dhondi Jugge',
        email: 'vinay@example.com',
        mobile: '9876543210',
        country: 'India',
        state: 'Maharashtra',
        district: 'Pune',
      };
      const result = validateEmployeeForm(validData);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it('identifies missing or invalid fields in form data', () => {
      const invalidData = {
        name: '',
        email: 'bademail',
        mobile: '123',
        country: '',
        state: '',
        district: '',
      };
      const result = validateEmployeeForm(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBe('Full name is required');
      expect(result.errors.email).toBe('Please enter a valid email address');
      expect(result.errors.mobile).toBe('Mobile number must contain 10 to 15 valid digits');
      expect(result.errors.country).toBe('Country is required');
    });
  });
});
