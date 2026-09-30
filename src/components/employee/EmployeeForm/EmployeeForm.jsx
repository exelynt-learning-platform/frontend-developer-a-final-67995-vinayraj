import React from 'react';
import { User, Mail, Phone, Globe, MapPin, Building } from 'lucide-react';
import { Input } from '../../ui/Input/Input';
import { Select } from '../../ui/Select/Select';
import { Button } from '../../ui/Button/Button';
import styles from './EmployeeForm.module.css';

export const EmployeeForm = ({
  formData,
  errors = {},
  countries = [],
  onChange,
  onSubmit,
  onCancel,
  isLoading = false,
  mode = 'create', // 'create' | 'edit'
}) => {
  return (
    <form onSubmit={onSubmit} className={styles.form} noValidate>
      <div className={styles.grid}>
        {/* Name */}
        <Input
          label="Full Name"
          name="name"
          value={formData.name || ''}
          onChange={onChange}
          placeholder="e.g. Vinay Raj"
          icon={User}
          error={errors.name}
          required
        />

        {/* Email */}
        <Input
          label="Email Address"
          name="email"
          type="email"
          value={formData.email || ''}
          onChange={onChange}
          placeholder="e.g. vinay@example.com"
          icon={Mail}
          error={errors.email}
          required
        />

        {/* Mobile */}
        <Input
          label="Mobile Number"
          name="mobile"
          value={formData.mobile || ''}
          onChange={onChange}
          placeholder="e.g. 9876543210"
          icon={Phone}
          error={errors.mobile}
          required
        />

        {/* Country */}
        <Select
          label="Country"
          name="country"
          value={formData.country || ''}
          onChange={onChange}
          options={countries}
          placeholder="Select Country"
          error={errors.country}
          required
        />

        {/* State */}
        <Input
          label="State"
          name="state"
          value={formData.state || ''}
          onChange={onChange}
          placeholder="e.g. Maharashtra"
          icon={MapPin}
          error={errors.state}
          required
        />

        {/* District */}
        <Input
          label="District / City"
          name="district"
          value={formData.district || ''}
          onChange={onChange}
          placeholder="e.g. Pune"
          icon={Building}
          error={errors.district}
          required
        />
      </div>

      <div className={styles.formFooter}>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          isDisabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
        >
          {mode === 'edit' ? 'Update Employee' : 'Add Employee'}
        </Button>
      </div>
    </form>
  );
};
