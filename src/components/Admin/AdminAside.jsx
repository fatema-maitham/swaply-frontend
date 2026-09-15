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

          <NavLink
            to="/admin/audit-logs"
            className="admin-nav-link"
          >
            Audit Logs
          </NavLink>

        </nav>

        <button
          type="button"
          className="admin-logout-button"
          onClick={handleLogout}
        >
          <svg
            className="admin-logout-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M10 17l5-5-5-5" />
            <path d="M15 12H3" />
            <path d="M12 3h7a2 2 0 012 2v14a2 2 0 01-2 2h-7" />
          </svg>

          <span>Log Out</span>
        </button>

      </div>
    </aside>
  );
};

export default AdminAside;
