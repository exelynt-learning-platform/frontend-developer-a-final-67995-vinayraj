import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/apiService';

// Async Thunks
export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiService.fetchEmployees();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch employees');
    }
  }
);

export const fetchEmployeeById = createAsyncThunk(
  'employees/fetchEmployeeById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await apiService.fetchEmployeeById(id);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || `No employee found with ID "${id}".`);
    }
  }
);

export const createEmployee = createAsyncThunk(
  'employees/createEmployee',
  async (employeeData, { rejectWithValue }) => {
    try {
      const data = await apiService.createEmployee(employeeData);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to create employee');
    }
  }
);

export const updateEmployee = createAsyncThunk(
  'employees/updateEmployee',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const result = await apiService.updateEmployee(id, data);
      return result;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to update employee');
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  'employees/deleteEmployee',
  async (id, { rejectWithValue }) => {
    try {
      const deletedId = await apiService.deleteEmployee(id);
      return deletedId;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to delete employee');
    }
  }
);

const initialState = {
  list: [],
  loading: false,
  mutationLoading: false,
  error: null,
  successMessage: null,
  
  // Search & Filter state
  searchQuery: '',
  searchByIdResult: null,
  searchByIdLoading: false,
  searchByIdError: null,
  
  // Active selection state for edit / detail modal
  selectedEmployee: null,
  isFormOpen: false,
  formMode: 'create', // 'create' | 'edit'
  
  // Delete modal state
  deleteCandidate: null,
  isDeleteModalOpen: false,
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearSearchById: (state) => {
      state.searchByIdResult = null;
      state.searchByIdError = null;
      state.searchByIdLoading = false;
    },
    openCreateModal: (state) => {
      state.selectedEmployee = null;
      state.formMode = 'create';
      state.isFormOpen = true;
    },
    openEditModal: (state, action) => {
      state.selectedEmployee = action.payload;
      state.formMode = 'edit';
      state.isFormOpen = true;
    },
    closeFormModal: (state) => {
      state.isFormOpen = false;
      state.selectedEmployee = null;
    },
    openDeleteModal: (state, action) => {
      state.deleteCandidate = action.payload;
      state.isDeleteModalOpen = true;
    },
    closeDeleteModal: (state) => {
      state.deleteCandidate = null;
      state.isDeleteModalOpen = false;
    },
    clearNotification: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchEmployees
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchEmployeeById
      .addCase(fetchEmployeeById.pending, (state) => {
        state.searchByIdLoading = true;
        state.searchByIdError = null;
        state.searchByIdResult = null;
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.searchByIdLoading = false;
        state.searchByIdResult = action.payload;
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.searchByIdLoading = false;
        state.searchByIdError = action.payload;
      })

      // createEmployee
      .addCase(createEmployee.pending, (state) => {
        state.mutationLoading = true;
        state.error = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.mutationLoading = false;
        state.list.unshift(action.payload);
        state.isFormOpen = false;
        state.successMessage = `Employee "${action.payload.name}" added successfully!`;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.mutationLoading = false;
        state.error = action.payload;
      })

      // updateEmployee
      .addCase(updateEmployee.pending, (state) => {
        state.mutationLoading = true;
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.mutationLoading = false;
        const index = state.list.findIndex((e) => String(e.id) === String(action.payload.id));
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        state.isFormOpen = false;
        state.selectedEmployee = null;
        state.successMessage = `Employee "${action.payload.name}" updated successfully!`;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.mutationLoading = false;
        state.error = action.payload;
      })

      // deleteEmployee
      .addCase(deleteEmployee.pending, (state) => {
        state.mutationLoading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.mutationLoading = false;
        const deletedId = action.payload;
        state.list = state.list.filter((e) => String(e.id) !== String(deletedId));
        state.isDeleteModalOpen = false;
        state.deleteCandidate = null;
        state.successMessage = 'Employee deleted successfully!';
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.mutationLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSearchQuery,
  clearSearchById,
  openCreateModal,
  openEditModal,
  closeFormModal,
  openDeleteModal,
  closeDeleteModal,
  clearNotification,
} = employeeSlice.actions;

export default employeeSlice.reducer;
