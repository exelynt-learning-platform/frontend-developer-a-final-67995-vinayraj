import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { EmployeeForm } from '../components/employee/EmployeeForm/EmployeeForm';

describe('EmployeeForm UI Component', () => {
  const defaultProps = {
    formData: {
      name: '',
      email: '',
      mobile: '',
      country: '',
      state: '',
      district: '',
    },
    errors: {},
    countries: ['India', 'United States'],
    onChange: vi.fn(),
    onSubmit: vi.fn(),
    onCancel: vi.fn(),
  };

  it('renders all required form input fields', () => {
    render(<EmployeeForm {...defaultProps} />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mobile number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/state/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/district/i)).toBeInTheDocument();
  });

  it('displays field validation errors when present', () => {
    const errors = {
      name: 'Full name is required',
      email: 'Please enter a valid email address',
    };
    render(<EmployeeForm {...defaultProps} errors={errors} />);
    expect(screen.getByText('Full name is required')).toBeInTheDocument();
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
  });

  it('pre-populates form input fields when edit mode is active', () => {
    const editProps = {
      ...defaultProps,
      mode: 'edit',
      formData: {
        name: 'Vinay Raj',
        email: 'vinay@example.com',
        mobile: '9876543210',
        country: 'India',
        state: 'Maharashtra',
        district: 'Pune',
      },
    };
    render(<EmployeeForm {...editProps} />);
    expect(screen.getByDisplayValue('Vinay Raj')).toBeInTheDocument();
    expect(screen.getByDisplayValue('vinay@example.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update employee/i })).toBeInTheDocument();
  });
});
