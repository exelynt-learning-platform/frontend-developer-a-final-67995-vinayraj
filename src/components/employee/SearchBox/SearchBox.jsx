import React, { useState } from 'react';
import { Search, X, Hash } from 'lucide-react';
import { Button } from '../../ui/Button/Button';
import styles from './SearchBox.module.css';

export const SearchBox = ({
  searchQuery,
  onSearchChange,
  onSearchById,
  onClearSearch,
  isLoading = false,
}) => {
  const [idQuery, setIdQuery] = useState('');

  const handleIdSearchSubmit = (e) => {
    e.preventDefault();
    if (idQuery.trim()) {
      onSearchById(idQuery.trim());
    }
  };

  const handleClear = () => {
    setIdQuery('');
    onClearSearch();
  };

  return (
    <div className={styles.container}>
      {/* Quick Local Filter Input */}
      <div className={styles.localSearch}>
        <Search size={18} className={styles.searchIcon} />
        <input
          type="text"
          className={styles.input}
          placeholder="Filter employees by Name, Email, Country..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={() => onSearchChange('')}
            title="Clear filter"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Direct Search by ID Form */}
      <form onSubmit={handleIdSearchSubmit} className={styles.idSearchForm}>
        <div className={styles.idInputWrapper}>
          <Hash size={16} className={styles.hashIcon} />
          <input
            type="text"
            className={styles.idInput}
            placeholder="Search by Employee ID..."
            value={idQuery}
            onChange={(e) => setIdQuery(e.target.value)}
          />
          {idQuery && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={handleClear}
              title="Clear ID search"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <Button
          type="submit"
          variant="secondary"
          size="md"
          isLoading={isLoading}
          isDisabled={!idQuery.trim()}
        >
          Find by ID
        </Button>
      </form>
    </div>
  );
};
