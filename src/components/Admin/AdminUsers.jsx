import { useEffect, useState } from 'react';

import {
  deleteUser,
  getUsers,
  toggleUserStatus,
} from '../../services/adminService';

import AdminAside from './AdminAside';

import './Admin.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const [message, setMessage] = useState('');

  const [deletingId, setDeletingId] = useState(null);

  const [togglingId, setTogglingId] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getUsers();

        setUsers(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadUsers();
  }, []);

  const handleToggleStatus = async (userId) => {
    try {
      setTogglingId(userId);

      setMessage('');

      const updatedUser = await toggleUserStatus(userId);

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user._id === userId
            ? {
              ...user,
              isActive: updatedUser.isActive,
            }
            : user
        )
      );
    } catch (err) {
      setMessage(err.message);
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async (userId) => {
    const shouldDelete = window.confirm(
      'Are you sure you want to permanently delete this user?'
    );

    if (!shouldDelete) {
      return;
    }

    try {
      setDeletingId(userId);

      setMessage('');

      await deleteUser(userId);

      setUsers((currentUsers) =>
        currentUsers.filter((user) => user._id !== userId)
      );
    } catch (err) {
      setMessage(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="admin-page">
      <AdminAside />

      <section className="admin-content">
        <header className="admin-header">
          <p className="admin-header-label">
            ADMINISTRATION
          </p>

          <h1>Users</h1>

          <p>
            Manage registered users.
          </p>
        </header>

        {message && (
          <p className="admin-message">
            {message}
          </p>
        )}

        {users.length === 0 ? (
          <p className="admin-empty">
            No users found.
          </p>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>

                  <th>Email</th>

                  <th>Role</th>

                  <th>Bio</th>

                  <th>Status</th>

                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      {user.name}
                    </td>

                    <td>
                      {user.email}
                    </td>

                    <td>
                      <span className="admin-role">
                        {user.role}
                      </span>
                    </td>

                    <td>
                      {user.bio || 'No bio'}
                    </td>

                    <td>
                      <span
                        className={
                          user.isActive
                            ? 'admin-user-status active'
                            : 'admin-user-status disabled'
                        }
                      >
                        {user.isActive
                          ? 'Active'
                          : 'Disabled'}
                      </span>
                    </td>

                    <td>
                      <div className="admin-user-actions">
                        <button
                          type="button"
                          className={
                            user.isActive
                              ? 'admin-disable-button'
                              : 'admin-enable-button'
                          }
                          onClick={() =>
                            handleToggleStatus(user._id)
                          }
                          disabled={
                            togglingId === user._id ||
                            deletingId === user._id
                          }
                        >
                          {togglingId === user._id
                            ? 'Updating...'
                            : user.isActive
                              ? 'Disable'
                              : 'Enable'}
                        </button>

                        <button
                          type="button"
                          className="admin-delete-button"
                          onClick={() =>
                            handleDelete(user._id)
                          }
                          disabled={
                            deletingId === user._id ||
                            togglingId === user._id
                          }
                        >
                          {deletingId === user._id
                            ? 'Deleting...'
                            : 'Delete'}
                        </button>
                      </div>
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

export default AdminUsers;
