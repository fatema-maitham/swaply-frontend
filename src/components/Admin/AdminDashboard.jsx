import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import { getDashboard } from '../../services/adminService';
import AdminAside from './AdminAside';
import './Admin.css';

const AdminDashboard = () => {
  const { user } = useContext(UserContext);

  const [stats, setStats] = useState({
    users: 0,
    skills: 0,
    swaps: 0,
    reviews: 0,
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getDashboard();

        setStats({
          users: data.users || 0,
          skills: data.skills || 0,
          swaps: data.swaps || 0,
          reviews: data.reviews || 0,
        });
      } catch (error) {
        console.log(error);
        setMessage('Failed to load dashboard data.');
      }
    };

    loadDashboard();
  }, []);

  return (
    <main className="admin-page">
      <AdminAside />

      <section className="admin-content">
        <header className="admin-header">
          <div>
            <p className="admin-header-label">ADMINISTRATION</p>
            <h1>Dashboard</h1>
            <p>Welcome back, {user?.name || 'Admin'}.</p>
          </div>
        </header>

        {message && <div className="admin-message">{message}</div>}

        <section className="admin-stats">
          <div className="admin-stat-card">
            <p>Users</p>
            <h2>{stats.users}</h2>
          </div>

          <div className="admin-stat-card">
            <p>Skills</p>
            <h2>{stats.skills}</h2>
          </div>

          <div className="admin-stat-card">
            <p>Swap Requests</p>
            <h2>{stats.swaps}</h2>
          </div>

          <div className="admin-stat-card">
            <p>Reviews</p>
            <h2>{stats.reviews}</h2>
          </div>
        </section>

        <section className="admin-management">

          <h2>Management</h2>

          <div className="admin-management-grid">

            <NavLink
              to="/admin/users"
              className="admin-management-card"
            >
              <div>
                <h3>Users</h3>
                <p>Manage registered users.</p>
              </div>

              <span className="admin-card-arrow">
                →
              </span>
            </NavLink>

            <NavLink
              to="/admin/skills"
              className="admin-management-card"
            >
              <div>
                <h3>Skills</h3>
                <p>Manage skills available on Swaply.</p>
              </div>

              <span className="admin-card-arrow">
                →
              </span>
            </NavLink>

            <NavLink
              to="/admin/swaps"
              className="admin-management-card"
            >
              <div>
                <h3>Swap Requests</h3>
                <p>Manage user swap requests.</p>
              </div>

              <span className="admin-card-arrow">
                →
              </span>
            </NavLink>

            <NavLink
              to="/admin/reviews"
              className="admin-management-card"
            >
              <div>
                <h3>Reviews</h3>
                <p>Manage user reviews.</p>
              </div>

              <span className="admin-card-arrow">
                →
              </span>
            </NavLink>

          </div>

        </section>

      </section>
    </main>
  );
};

export default AdminDashboard;