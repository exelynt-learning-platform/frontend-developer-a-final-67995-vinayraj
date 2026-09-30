import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EmployeeTable } from '../components/employee/EmployeeTable/EmployeeTable';
import { Modal } from '../components/ui/Modal/Modal';
import { ConfirmModal } from '../components/ui/ConfirmModal/ConfirmModal';
import { Alert } from '../components/ui/Alert/Alert';
import { Spinner } from '../components/ui/Spinner/Spinner';
import { EmployeeFormContainer } from './EmployeeFormContainer';
import { SearchContainer } from './SearchContainer';
import {
  fetchEmployees,
  openCreateModal,
  openEditModal,
  closeFormModal,
  openDeleteModal,
  closeDeleteModal,
  deleteEmployee,
  clearNotification,
} from '../store/slices/employeeSlice';
import { fetchCountries } from '../store/slices/countrySlice';
import styles from './EmployeeListContainer.module.css';

export const EmployeeListContainer = () => {
  const dispatch = useDispatch();
  const {
    list: employees,
    loading,
    mutationLoading,
    error,
    successMessage,
    searchQuery,
    isFormOpen,
    formMode,
    isDeleteModalOpen,
    deleteCandidate,
  } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchCountries());
  }, [dispatch]);

  // Memoized filter calculation for list rendering optimization
  const filteredEmployees = useMemo(() => {
    if (!searchQuery) return employees;
    const query = searchQuery.toLowerCase().trim();
    return employees.filter((emp) => (
      (emp.name && emp.name.toLowerCase().includes(query)) ||
      (emp.email && emp.email.toLowerCase().includes(query)) ||
      (emp.country && emp.country.toLowerCase().includes(query)) ||
      (emp.state && emp.state.toLowerCase().includes(query)) ||
      (emp.mobile && emp.mobile.includes(query)) ||
      (emp.id && String(emp.id).includes(query))
    ));
  }, [employees, searchQuery]);

  const handleEdit = (employee) => {
    dispatch(openEditModal(employee));
  };

  const handleDeleteRequest = (employee) => {
    dispatch(openDeleteModal(employee));
  };

  const handleConfirmDelete = () => {
    if (deleteCandidate) {
      dispatch(deleteEmployee(deleteCandidate.id));
    }
  };

  return (
    <div className={styles.container}>
      {/* Top Banner Notifications */}
      {successMessage && (
        <Alert
          type="success"
          title="Success"
          onClose={() => dispatch(clearNotification())}
        >
          {successMessage}
        </Alert>
      )}

      {error && (
        <Alert
          type="error"
          title="Error"
          onClose={() => dispatch(clearNotification())}
        >
          {error}
        </Alert>
      )}

      {/* Search and Filter Section */}
      <section className={styles.searchSection}>
        <SearchContainer />
      </section>

      {/* Main Content Area */}
      <section className={styles.tableSection}>
        {loading ? (
          <Spinner label="Loading employee directory..." size="lg" />
        ) : (
          <EmployeeTable
            employees={filteredEmployees}
            onEdit={handleEdit}
            onDelete={handleDeleteRequest}
            isLoading={loading}
          />
        )}
      </section>

      {/* Form Modal (Add / Edit) */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => dispatch(closeFormModal())}
        title={formMode === 'edit' ? 'Edit Employee' : 'Add New Employee'}
        subtitle={
          formMode === 'edit'
            ? 'Update the employee details below'
            : 'Fill out the details to register a new employee'
        }
        maxWidth="640px"
      >
        <EmployeeFormContainer />
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => dispatch(closeDeleteModal())}
        onConfirm={handleConfirmDelete}
        title="Delete Employee"
        message={
          deleteCandidate
            ? `Are you sure you want to delete employee "${deleteCandidate.name}" (ID: #${deleteCandidate.id})? This action cannot be undone.`
            : 'Are you sure you want to delete this employee?'
        }
        confirmText="Delete Employee"
        isLoading={mutationLoading}
      />
    </div>
  );
};
