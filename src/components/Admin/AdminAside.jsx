import { NavLink } from 'react-router';

const AdminAside = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    window.location.href = '/sign-in';
  };

  return (
    <aside className="admin-sidebar">

      <div className="admin-sidebar-top">

        <img
          src="/logoW.png"
          alt="Swaply"
          className="admin-logo"
        />

        <nav className="admin-nav">

          <NavLink
            to="/admin/dashboard"
            className="admin-nav-link"
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/users"
            className="admin-nav-link"
          >
            Users
          </NavLink>

          <NavLink
            to="/admin/skills"
            className="admin-nav-link"
          >
            Skills
          </NavLink>

          <NavLink
            to="/admin/swaps"
            className="admin-nav-link"
          >
            Swap Requests
          </NavLink>

          <NavLink
            to="/admin/reviews"
            className="admin-nav-link"
          >
            Reviews
          </NavLink>

        </nav>

        <button
          type="button"
          className="admin-logout-button"
          onClick={handleLogout}
        >
          Log Out
        </button>

      </div>

    </aside>
  );
};

export default AdminAside;
