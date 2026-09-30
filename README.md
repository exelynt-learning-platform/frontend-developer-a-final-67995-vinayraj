# EXELYNT Frontend Developer Assignment - Employee Management System

Build a responsive, modern **Employee Management Application** using **React JS**, **Redux Toolkit (RTK)**, **Structured CSS Modules**, **Smart/Dumb Component Architecture**, **Form Validation**, **API Integration**, and **Vitest Unit Testing**.

**Developer**: Vinay Raj Dhondi Jugge  

---

## 🚀 Key Features & Highlights

- **Employee Listing Table & Mobile Card View**: Responsive display showing ID, Name, Email, Mobile, Country, Location (State / District), and Edit/Delete actions.
- **Search Employee by ID**: Interactive ID lookup displaying employee preview modal or clear "No employee found with ID X" alert if not found.
- **Add & Edit Employee Modal**: Pre-populates employee data when editing.
- **Delete Confirmation Dialog**: Interactive modal asking confirmation before deleting records.
- **Form Fields & Validation**:
  - Fields: Name, Email, Mobile, Country, State, District.
  - Validations: Required fields, valid email format regex, mobile phone digits (10-15 digits), and field length boundaries with per-field error messages.
- **API Integration**: Integration with MockAPI endpoints (`GET/POST/PUT/DELETE /employee` and `GET /country`) with automatic local storage fallback.
- **State Management**: Redux Toolkit store configured with `employeeSlice.js` and `countrySlice.js`.
- **Structured CSS Modules**: Modular `.module.css` files per component utilizing design custom properties (`variables.css`).
- **Unit Testing**: 27/27 Vitest unit tests passing covering components, RTK slices, thunks, form validation, and user interactions.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Core**: React JS, HTML5, JavaScript (ES6+)
- **State Management**: Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- **Styling**: CSS Modules (`*.module.css`), CSS Custom Variables
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Testing Framework**: Vitest, React Testing Library, JSDOM

---

## 🧪 Running Unit Tests & Build

```bash
# Run unit tests
npm test

# Build for production
npm run build

# Start dev server
npm run dev
```
