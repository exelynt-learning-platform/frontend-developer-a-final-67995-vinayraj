import { describe, it, expect } from 'vitest';
import employeeReducer, {
  setSearchQuery,
  openCreateModal,
  openEditModal,
  closeFormModal,
  openDeleteModal,
  closeDeleteModal,
  clearNotification,
} from '../store/slices/employeeSlice';

describe('Employee Redux Slice Reducers', () => {
  const initialState = {
    list: [],
    loading: false,
    mutationLoading: false,
    error: null,
    successMessage: null,
    searchQuery: '',
    searchByIdResult: null,
    searchByIdLoading: false,
    searchByIdError: null,
    selectedEmployee: null,
    isFormOpen: false,
    formMode: 'create',
    deleteCandidate: null,
    isDeleteModalOpen: false,
  };

  it('should return initial state when passed an undefined action', () => {
    expect(employeeReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle setSearchQuery', () => {
    const nextState = employeeReducer(initialState, setSearchQuery('Vinay'));
    expect(nextState.searchQuery).toBe('Vinay');
  });

  it('should handle openCreateModal', () => {
    const nextState = employeeReducer(initialState, openCreateModal());
    expect(nextState.isFormOpen).toBe(true);
    expect(nextState.formMode).toBe('create');
    expect(nextState.selectedEmployee).toBeNull();
  });

  it('should handle openEditModal', () => {
    const emp = { id: '1', name: 'Vinay', email: 'vinay@example.com' };
    const nextState = employeeReducer(initialState, openEditModal(emp));
    expect(nextState.isFormOpen).toBe(true);
    expect(nextState.formMode).toBe('edit');
    expect(nextState.selectedEmployee).toEqual(emp);
  });

  it('should handle closeFormModal', () => {
    const modifiedState = { ...initialState, isFormOpen: true, selectedEmployee: { id: '1' } };
    const nextState = employeeReducer(modifiedState, closeFormModal());
    expect(nextState.isFormOpen).toBe(false);
    expect(nextState.selectedEmployee).toBeNull();
  });

  it('should handle openDeleteModal and closeDeleteModal', () => {
    const candidate = { id: '2', name: 'John' };
    const openedState = employeeReducer(initialState, openDeleteModal(candidate));
    expect(openedState.isDeleteModalOpen).toBe(true);
    expect(openedState.deleteCandidate).toEqual(candidate);

    const closedState = employeeReducer(openedState, closeDeleteModal());
    expect(closedState.isDeleteModalOpen).toBe(false);
    expect(closedState.deleteCandidate).toBeNull();
  });

  it('should handle clearNotification', () => {
    const notifiedState = { ...initialState, error: 'Some Error', successMessage: 'Success!' };
    const nextState = employeeReducer(notifiedState, clearNotification());
    expect(nextState.error).toBeNull();
    expect(nextState.successMessage).toBeNull();
  });
});
