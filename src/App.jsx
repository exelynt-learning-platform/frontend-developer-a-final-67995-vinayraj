import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from './components/layout/Navbar/Navbar';
import { Footer } from './components/layout/Footer/Footer';
import { EmployeeListContainer } from './containers/EmployeeListContainer';
import { openCreateModal } from './store/slices/employeeSlice';
import styles from './App.module.css';

export function App() {
  const dispatch = useDispatch();
  const { list: employees } = useSelector((state) => state.employees);

  const handleOpenAddModal = () => {
    dispatch(openCreateModal());
  };

  return (
    <div className={styles.appContainer}>
      <Navbar
        totalEmployees={employees.length}
        onAddClick={handleOpenAddModal}
      />
      <main className={styles.mainContent}>
        <EmployeeListContainer />
      </main>
      <Footer />
    </div>
  );
}

export default App;
