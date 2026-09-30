import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EmployeeForm } from '../components/employee/EmployeeForm/EmployeeForm';
import { createEmployee, updateEmployee, closeFormModal } from '../store/slices/employeeSlice';
import { validateEmployeeForm } from '../utils/validation';

export const EmployeeFormContainer = () => {
  const dispatch = useDispatch();
  const { selectedEmployee, formMode, isFormOpen, mutationLoading } = useSelector(
    (state) => state.employees
  );
  const { list: countries } = useSelector((state) => state.countries);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    country: '',
    state: '',
    district: '',
  });

  const [errors, setErrors] = useState({});

  // Pre-populate data when editing or reset when adding
  useEffect(() => {
    if (formMode === 'edit' && selectedEmployee) {
      setFormData({
        name: selectedEmployee.name || '',
        email: selectedEmployee.email || '',
        mobile: selectedEmployee.mobile || '',
        country: selectedEmployee.country || '',
        state: selectedEmployee.state || '',
        district: selectedEmployee.district || '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        mobile: '',
        country: '',
        state: '',
        district: '',
      });
    }
    setErrors({});
  }, [formMode, selectedEmployee, isFormOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Real-time error clearing when user edits field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateEmployeeForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    if (formMode === 'edit' && selectedEmployee) {
      dispatch(updateEmployee({ id: selectedEmployee.id, data: formData }));
    } else {
      dispatch(createEmployee(formData));
    }
  };

  const handleCancel = () => {
    dispatch(closeFormModal());
  };

  return (
    <EmployeeForm
      formData={formData}
      errors={errors}
      countries={countries}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isLoading={mutationLoading}
      mode={formMode}
    />
  );
};
