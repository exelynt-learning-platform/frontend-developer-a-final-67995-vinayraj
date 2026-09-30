const BASE_URL = 'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1';

// Comprehensive default country list ensuring all major countries are available
const DEFAULT_WORLD_COUNTRIES = [
  'India',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'United Arab Emirates',
  'Singapore',
  'Brazil',
  'China',
  'South Korea',
  'Netherlands',
  'Switzerland',
  'Sweden',
  'Spain',
  'Italy',
  'South Africa',
  'New Zealand',
  'Saudi Arabia',
  'Mexico',
  'Indonesia',
  'Malaysia',
  'Thailand',
  'Egypt',
  'Nigeria',
  'Argentina',
  'Ireland',
  'Belgium'
];

const INITIAL_FALLBACK_EMPLOYEES = [
  {
    id: '1',
    name: 'Vinay Raj Dhondi Jugge',
    email: 'vinay.raj@example.com',
    mobile: '9876543210',
    country: 'India',
    state: 'Maharashtra',
    district: 'Pune',
    createdAt: '2026-09-01T10:00:00.000Z'
  },
  {
    id: '2',
    name: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    mobile: '9123456789',
    country: 'India',
    state: 'Karnataka',
    district: 'Bengaluru',
    createdAt: '2026-09-02T11:30:00.000Z'
  },
  {
    id: '3',
    name: 'John Miller',
    email: 'john.miller@example.com',
    mobile: '+1-202-555-0143',
    country: 'United States',
    state: 'California',
    district: 'San Francisco',
    createdAt: '2026-09-05T14:15:00.000Z'
  },
  {
    id: '4',
    name: 'Sophia Chen',
    email: 'sophia.chen@example.com',
    mobile: '+1-415-555-0188',
    country: 'Canada',
    state: 'Ontario',
    district: 'Toronto',
    createdAt: '2026-09-08T09:45:00.000Z'
  }
];

const getLocalEmployees = () => {
  const stored = localStorage.getItem('app_employees');
  if (!stored) {
    localStorage.setItem('app_employees', JSON.stringify(INITIAL_FALLBACK_EMPLOYEES));
    return INITIAL_FALLBACK_EMPLOYEES;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return INITIAL_FALLBACK_EMPLOYEES;
  }
};

const saveLocalEmployees = (employees) => {
  localStorage.setItem('app_employees', JSON.stringify(employees));
};

export const apiService = {
  // Fetch All Countries with normalization and deduplication
  async fetchCountries() {
    try {
      const response = await fetch(`${BASE_URL}/country`);
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();

      let apiCountries = [];
      if (Array.isArray(data)) {
        apiCountries = data
          .map((item) => {
            if (typeof item === 'string') return item.trim();
            if (typeof item === 'object' && item !== null) {
              return (item.country || item.name || item.label || '').trim();
            }
            return '';
          })
          .filter(Boolean);
      }

      // Combine API countries + world countries, capitalize properly, remove duplicates & sort alphabetically
      const mergedSet = new Set([
        ...apiCountries.map(c => c.charAt(0).toUpperCase() + c.slice(1)),
        ...DEFAULT_WORLD_COUNTRIES
      ]);

      return Array.from(mergedSet).sort((a, b) => a.localeCompare(b));
    } catch (err) {
      console.warn('Countries API unreachable. Using standard world countries list.', err.message);
      return DEFAULT_WORLD_COUNTRIES.sort((a, b) => a.localeCompare(b));
    }
  },

  // Fetch All Employees
  async fetchEmployees() {
    try {
      const response = await fetch(`${BASE_URL}/employee`);
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();
      saveLocalEmployees(data);
      return data;
    } catch (err) {
      console.warn('Employees API unreachable. Operating on local cache.', err.message);
      return getLocalEmployees();
    }
  },

  // Fetch Employee By ID
  async fetchEmployeeById(id) {
    try {
      const response = await fetch(`${BASE_URL}/employee/${id}`);
      if (response.status === 404) {
        throw new Error(`Employee with ID "${id}" was not found.`);
      }
      if (!response.ok) {
        throw new Error(`Failed to fetch employee with ID ${id}`);
      }
      return await response.json();
    } catch (err) {
      const localList = getLocalEmployees();
      const found = localList.find((emp) => String(emp.id) === String(id));
      if (found) return found;
      throw new Error(err.message || `Employee with ID "${id}" not found`);
    }
  },

  // Create Employee
  async createEmployee(employeeData) {
    try {
      const response = await fetch(`${BASE_URL}/employee`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData),
      });
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const created = await response.json();
      const currentLocal = getLocalEmployees();
      saveLocalEmployees([created, ...currentLocal]);
      return created;
    } catch (err) {
      console.warn('Create Employee API unreachable. Adding to local cache.', err.message);
      const currentLocal = getLocalEmployees();
      const newEmp = {
        id: String(Date.now()),
        ...employeeData,
        createdAt: new Date().toISOString()
      };
      const updated = [newEmp, ...currentLocal];
      saveLocalEmployees(updated);
      return newEmp;
    }
  },

  // Update Employee
  async updateEmployee(id, employeeData) {
    try {
      const response = await fetch(`${BASE_URL}/employee/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData),
      });
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const updated = await response.json();
      const currentLocal = getLocalEmployees();
      const nextLocal = currentLocal.map((emp) => (String(emp.id) === String(id) ? updated : emp));
      saveLocalEmployees(nextLocal);
      return updated;
    } catch (err) {
      console.warn('Update Employee API unreachable. Updating local cache.', err.message);
      const currentLocal = getLocalEmployees();
      const updated = { id: String(id), ...employeeData };
      const nextLocal = currentLocal.map((emp) => (String(emp.id) === String(id) ? updated : emp));
      saveLocalEmployees(nextLocal);
      return updated;
    }
  },

  // Delete Employee
  async deleteEmployee(id) {
    try {
      const response = await fetch(`${BASE_URL}/employee/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const currentLocal = getLocalEmployees();
      saveLocalEmployees(currentLocal.filter((emp) => String(emp.id) !== String(id)));
      return id;
    } catch (err) {
      console.warn('Delete Employee API unreachable. Removing from local cache.', err.message);
      const currentLocal = getLocalEmployees();
      saveLocalEmployees(currentLocal.filter((emp) => String(emp.id) !== String(id)));
      return id;
    }
  }
};
