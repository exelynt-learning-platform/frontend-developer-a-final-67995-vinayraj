import React from 'react';
import { Edit2, Trash2, Mail, Phone, Globe, UserX, User } from 'lucide-react';
import { Button } from '../../ui/Button/Button';
import { Badge } from '../../ui/Badge/Badge';
import styles from './EmployeeTable.module.css';

export const EmployeeTable = ({
  employees = [],
  onEdit,
  onDelete,
  isLoading = false,
}) => {
  if (employees.length === 0 && !isLoading) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIconContainer}>
          <UserX size={36} />
        </div>
        <h3 className={styles.emptyTitle}>No Employees Found</h3>
        <p className={styles.emptySubtitle}>
          There are currently no employee records matching your query. Add a new employee to get started!
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Desktop Table View */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Country</th>
              <th>Location (State / District)</th>
              <th className={styles.actionsHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className={styles.row}>
                <td className={styles.idCell}>
                  <span className={styles.idBadge}>#{emp.id}</span>
                </td>
                <td className={styles.nameCell}>
                  <div className={styles.userInfo}>
                    <div className={styles.avatar}>
                      <User size={16} />
                    </div>
                    <span className={styles.userName}>{emp.name}</span>
                  </div>
                </td>
                <td>
                  <div className={styles.metaInfo}>
                    <Mail size={14} className={styles.metaIcon} />
                    <span>{emp.email}</span>
                  </div>
                </td>
                <td>
                  <div className={styles.metaInfo}>
                    <Phone size={14} className={styles.metaIcon} />
                    <span>{emp.mobile}</span>
                  </div>
                </td>
                <td>
                  <Badge variant="primary">
                    <Globe size={12} style={{ marginRight: '4px' }} />
                    {emp.country}
                  </Badge>
                </td>
                <td className={styles.locationCell}>
                  {emp.state && emp.district
                    ? `${emp.district}, ${emp.state}`
                    : emp.state || emp.district || '—'}
                </td>
                <td>
                  <div className={styles.actions}>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Edit2}
                      onClick={() => onEdit(emp)}
                      title="Edit employee"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      icon={Trash2}
                      onClick={() => onDelete(emp)}
                      title="Delete employee"
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Responsive Cards View */}
      <div className={styles.cardGrid}>
        {employees.map((emp) => (
          <div key={emp.id} className={styles.mobileCard}>
            <div className={styles.cardHeader}>
              <div className={styles.userInfo}>
                <div className={styles.avatar}>
                  <User size={18} />
                </div>
                <div>
                  <h4 className={styles.cardName}>{emp.name}</h4>
                  <span className={styles.cardId}>ID: #{emp.id}</span>
                </div>
              </div>
              <Badge variant="primary">{emp.country}</Badge>
            </div>
            
            <div className={styles.cardBody}>
              <div className={styles.cardMetaRow}>
                <Mail size={14} />
                <span>{emp.email}</span>
              </div>
              <div className={styles.cardMetaRow}>
                <Phone size={14} />
                <span>{emp.mobile}</span>
              </div>
              {(emp.state || emp.district) && (
                <div className={styles.cardMetaRow}>
                  <Globe size={14} />
                  <span>{emp.district}, {emp.state}</span>
                </div>
              )}
            </div>

            <div className={styles.cardFooter}>
              <Button
                variant="outline"
                size="sm"
                icon={Edit2}
                onClick={() => onEdit(emp)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                icon={Trash2}
                onClick={() => onDelete(emp)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
