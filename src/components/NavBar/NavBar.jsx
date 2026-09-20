import { useContext, useState } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    setMenuOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // =========================
  // ADMIN NAVBAR
  // =========================

  if (user?.role === 'admin') {
    return (
      <nav className="navbar">
        <div className="navbar-container">

          <div className="navbar-left">
            <Link to="/" className="navbar-logo">
              <img src="/logo.png" alt="Swaply" />
            </Link>

            <div
              className={`navbar-center ${menuOpen ? 'navbar-menu-open' : ''
                }`}
            >
              <Link to="/admin/dashboard" onClick={closeMenu}>
                Dashboard
              </Link>

              <Link to="/admin/users" onClick={closeMenu}>
                Users
              </Link>

              <Link to="/admin/skills" onClick={closeMenu}>
                Skills
              </Link>

              <Link to="/admin/categories" onClick={closeMenu}>
                Categories
              </Link>

              <Link to="/admin/swaps" onClick={closeMenu}>
                Swap Requests
              </Link>

              <Link to="/admin/reviews" onClick={closeMenu}>
                Reviews
              </Link>

              <Link
                to="/"
                onClick={handleSignOut}
                className="navbar-mobile-auth"
              >
                Sign Out
              </Link>
            </div>
          </div>

          <div className="navbar-right">

            {/* Profile image */}
            <Link
              to="/profile"
              className="navbar-profile"
            >
              <img
                src={user.profileImage || '/default-profile.png'}
                alt={`${user.name || 'User'} profile`}
                className="navbar-profile-image"
              />
            </Link>

            {/* Desktop sign out */}
            <Link
              to="/"
              onClick={handleSignOut}
              className="navbar-signout navbar-desktop-only"
            >
              Sign Out
            </Link>

            {/* Hamburger */}
            <button
              type="button"
              className="navbar-menu-button"
              onClick={() => setMenuOpen((current) => !current)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? '✕' : '☰'}
            </button>

          </div>
        </div>
      </nav>
    );
  }

  // =========================
  // NORMAL USER / LOGGED OUT
  // =========================

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="navbar-left">

          <Link to="/" className="navbar-logo">
            <img src="/logo.png" alt="Swaply" />
          </Link>

          <div
            className={`navbar-center ${menuOpen ? 'navbar-menu-open' : ''
              }`}
          >
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>

            <Link to="/skills" onClick={closeMenu}>
              Skills
            </Link>

            <Link to="/community" onClick={closeMenu}>
              Community
            </Link>

            {user && (
              <>
                <Link to="/swaps" onClick={closeMenu}>
                  My Swaps
                </Link>

                <Link to="/profile" onClick={closeMenu}>
                  Profile
                </Link>
              </>
            )}

            {!user && (
              <>
                <Link
                  to="/sign-in"
                  onClick={closeMenu}
                  className="navbar-mobile-auth"
                >
                  Sign In
                </Link>

                <Link
                  to="/sign-up"
                  onClick={closeMenu}
                  className="navbar-mobile-auth navbar-mobile-signup"
                >
                  Sign Up
                </Link>
              </>
            )}

            {user && (
              <Link
                to="/"
                onClick={handleSignOut}
                className="navbar-mobile-auth"
              >
                Sign Out
              </Link>
            )}
          </div>
        </div>

        <div className="navbar-right">

          {user ? (
            <>
              {/* Profile image */}
              <Link
                to="/profile"
                className="navbar-profile"
              >
                <img
                  src={user.profileImage || '/default-profile.png'}
                  alt={`${user.name || 'User'} profile`}
                  className="navbar-profile-image"
                />
              </Link>

              {/* Desktop sign out */}
              <Link
                to="/"
                onClick={handleSignOut}
                className="navbar-signout navbar-desktop-only"
              >
                Sign Out
              </Link>
            </>
          ) : (
            <>
              {/* Desktop sign in */}
              <Link
                to="/sign-in"
                className="navbar-signin navbar-desktop-only"
              >
                Sign In
              </Link>

              {/* Desktop sign up */}
              <Link
                to="/sign-up"
                className="navbar-signup navbar-desktop-only"
              >
                Sign Up
              </Link>
            </>
          )}

          {/* Hamburger */}
          <button
            type="button"
            className="navbar-menu-button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>

        </div>
      </div>
    </nav>
  );
};

export default NavBar;