import { useContext } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (user?.role === 'admin') {
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-left">
            <Link to="/" className="navbar-logo">
              <img src="/logo.png" alt="Swaply" />
            </Link>

            <div className="navbar-center">
              <Link to="/admin/dashboard">Dashboard</Link>
              <Link to="/admin/users">Users</Link>
              <Link to="/admin/skills">Skills</Link>
              <Link to="/admin/swaps">Swap Requests</Link>
              <Link to="/admin/reviews">Reviews</Link>
            </div>
          </div>

          <div className="navbar-right">
            <Link to="/profile" className="navbar-profile">
              <img
                src={user.profileImage || '/default-profile.png'}
                alt={`${user.name || 'User'} profile`}
                className="navbar-profile-image"
              />
            </Link>

            <Link
              to="/"
              onClick={handleSignOut}
              className="navbar-signout"
            >
              Sign Out
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <img src="/logo.png" alt="Swaply" />
          </Link>

          <div className="navbar-center">
            <Link to="/">Home</Link>
            <Link to="/skills">Skills</Link>
            <Link to="/community">Community</Link>

            {user && (
              <>
                <Link to="/swaps">My Swaps</Link>
                <Link to="/profile">Profile</Link>
              </>
            )}
          </div>
        </div>

        <div className="navbar-right">
          {user ? (
            <>
            <Link
              to="/"
              onClick={handleSignOut}
              className="navbar-signout"
            >
              Sign Out
            </Link>

            <Link to="/profile" className="navbar-profile">
              <img
                src={user.profileImage || '/default-profile.png'}
                alt={`${user.name || 'User'} profile`}
                className="navbar-profile-image"
              />
            </Link>
            </>
          ) : (
            <>
              <Link to="/sign-in" className="navbar-signin">
                Sign In
              </Link>

              <Link to="/sign-up" className="navbar-signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;