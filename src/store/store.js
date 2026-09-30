import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './slices/employeeSlice';
import countryReducer from './slices/countrySlice';

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    countries: countryReducer,
  },
});
