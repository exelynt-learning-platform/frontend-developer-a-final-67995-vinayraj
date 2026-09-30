import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EmployeeListContainer } from '../containers/EmployeeListContainer';
import employeeReducer from '../store/slices/employeeSlice';
import countryReducer from '../store/slices/countrySlice';
import { apiService } from '../services/apiService';

vi.mock('../services/apiService', () => ({
  apiService: {
    fetchEmployees: vi.fn(),
    fetchCountries: vi.fn(),
    fetchEmployeeById: vi.fn(),
    createEmployee: vi.fn(),
    updateEmployee: vi.fn(),
    deleteEmployee: vi.fn(),
  },
}));

describe('EmployeeListContainer Smart Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createMockStore = () =>
    configureStore({
      reducer: {
        employees: employeeReducer,
        countries: countryReducer,
      },
    });

  it('renders employee table with fetched data from API', async () => {
    const mockEmployees = [
      {
        id: '101',
        name: 'Vinay Raj Dhondi Jugge',
        email: 'vinay@example.com',
        mobile: '9876543210',
        country: 'India',
        state: 'Maharashtra',
        district: 'Pune',
      },
    ];

    apiService.fetchEmployees.mockResolvedValue(mockEmployees);
    apiService.fetchCountries.mockResolvedValue(['India', 'United States']);

    const store = createMockStore();
    render(
      <Provider store={store}>
        <EmployeeListContainer />
      </Provider>
    );

    const nameElements = await screen.findAllByText(/Vinay Raj Dhondi Jugge/i);
    expect(nameElements.length).toBeGreaterThan(0);
    expect(nameElements[0]).toBeInTheDocument();

    const emailElements = screen.getAllByText(/vinay@example.com/i);
    expect(emailElements.length).toBeGreaterThan(0);
  });

  it('shows empty state when employee list is empty', async () => {
    apiService.fetchEmployees.mockResolvedValue([]);
    apiService.fetchCountries.mockResolvedValue(['India', 'United States']);

    const store = createMockStore();
    render(
      <Provider store={store}>
        <EmployeeListContainer />
      </Provider>
    );

    const emptyText = await screen.findByText(/No Employees Found/i);
    expect(emptyText).toBeInTheDocument();
  });
});
