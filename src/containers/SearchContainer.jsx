import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchBox } from '../components/employee/SearchBox/SearchBox';
import { Modal } from '../components/ui/Modal/Modal';
import { Alert } from '../components/ui/Alert/Alert';
import { Badge } from '../components/ui/Badge/Badge';
import { Button } from '../components/ui/Button/Button';
import {
  setSearchQuery,
  fetchEmployeeById,
  clearSearchById,
  openEditModal,
} from '../store/slices/employeeSlice';
import { Mail, Phone, Globe, MapPin, Building, UserCheck } from 'lucide-react';
import styles from './SearchContainer.module.css';

export const SearchContainer = () => {
  const dispatch = useDispatch();
  const {
    searchQuery,
    searchByIdResult,
    searchByIdLoading,
    searchByIdError,
  } = useSelector((state) => state.employees);

  const handleSearchChange = (query) => {
    dispatch(setSearchQuery(query));
  };

  const handleSearchById = (id) => {
    dispatch(fetchEmployeeById(id));
  };

  const handleClearSearch = () => {
    dispatch(clearSearchById());
  };

  return (
    <div className={styles.wrapper}>
      <SearchBox
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchById={handleSearchById}
        onClearSearch={handleClearSearch}
        isLoading={searchByIdLoading}
      />

      {/* Error / Not Found Alert Banner */}
      {searchByIdError && (
        <div className={styles.alertContainer}>
          <Alert
            type="error"
            title="Search Result"
            onClose={handleClearSearch}
          >
            {searchByIdError}
          </Alert>
        </div>
      )}

      {/* Single Employee Found Modal Preview */}
      {searchByIdResult && (
        <Modal
          isOpen={Boolean(searchByIdResult)}
          onClose={handleClearSearch}
          title="Employee Found"
          subtitle={`Details for Employee ID #${searchByIdResult.id}`}
          maxWidth="500px"
        >
          <div className={styles.resultCard}>
            <div className={styles.headerRow}>
              <div className={styles.userAvatar}>
                <UserCheck size={28} />
              </div>
              <div>
                <h3 className={styles.userName}>{searchByIdResult.name}</h3>
                <span className={styles.userId}>ID: #{searchByIdResult.id}</span>
              </div>
              <Badge variant="primary">{searchByIdResult.country}</Badge>
            </div>

            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <Mail size={16} className={styles.detailIcon} />
                <div>
                  <label className={styles.label}>Email</label>
                  <p className={styles.value}>{searchByIdResult.email}</p>
                </div>
              </div>

              <div className={styles.detailItem}>
                <Phone size={16} className={styles.detailIcon} />
                <div>
                  <label className={styles.label}>Mobile</label>
                  <p className={styles.value}>{searchByIdResult.mobile}</p>
                </div>
              </div>

              <div className={styles.detailItem}>
                <Globe size={16} className={styles.detailIcon} />
                <div>
                  <label className={styles.label}>Country</label>
                  <p className={styles.value}>{searchByIdResult.country}</p>
                </div>
              </div>

              {(searchByIdResult.state || searchByIdResult.district) && (
                <div className={styles.detailItem}>
                  <MapPin size={16} className={styles.detailIcon} />
                  <div>
                    <label className={styles.label}>Location</label>
                    <p className={styles.value}>
                      {searchByIdResult.district}, {searchByIdResult.state}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.actionsRow}>
              <Button variant="secondary" onClick={handleClearSearch}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  dispatch(openEditModal(searchByIdResult));
                  handleClearSearch();
                }}
              >
                Edit Employee
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
