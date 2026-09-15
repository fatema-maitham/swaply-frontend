import { useEffect, useState } from 'react';

import {
  getAuditLogs,
} from '../../services/adminService';

import AdminAside from './AdminAside';

import './Admin.css';

const AdminAuditLogs = () => {
  const [auditLogs, setAuditLogs] = useState([]);

  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadAuditLogs = async () => {
      try {
        const data = await getAuditLogs();

        setAuditLogs(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadAuditLogs();
  }, []);

  return (
    <main className="admin-page">
      <AdminAside />

      <section className="admin-content">
        <header className="admin-header">
          <p className="admin-header-label">
            ADMINISTRATION
          </p>

          <h1>Audit Logs</h1>

          <p>
            View important actions performed by administrators.
          </p>
        </header>

        {message && (
          <p className="admin-message">
            {message}
          </p>
        )}

        {auditLogs.length === 0 ? (
          <p className="admin-empty">
            No audit logs found.
          </p>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Admin</th>
                  <th>Action</th>
                  <th>Target</th>
                  <th>Details</th>
                </tr>
              </thead>

              <tbody>
                {auditLogs.map((log) => (
                  <tr key={log._id}>
                    <td>
                      {new Date(
                        log.createdAt
                      ).toLocaleString()}
                    </td>

                    <td>
                      <div className="admin-audit-admin">
                        <strong>
                          {log.admin?.name || 'Unknown'}
                        </strong>

                        <span>
                          {log.admin?.email || ''}
                        </span>
                      </div>
                    </td>

                    <td>
                      <span className="admin-audit-action">
                        {log.action}
                      </span>
                    </td>

                    <td>
                      <div className="admin-audit-target">
                        <strong>
                          {log.targetName || 'Unknown'}
                        </strong>

                        <span>
                          {log.targetType}
                        </span>
                      </div>
                    </td>

                    <td>
                      {log.details || 'No details'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
};

export default AdminAuditLogs;
