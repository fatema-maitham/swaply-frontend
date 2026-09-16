import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import './UserDetails.css';

const UserDetails = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACK_END_SERVER_URL}/users/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.err || 'Failed to load profile.'
          );
        }

        setUser(data.user);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  if (loading) {
    return (
      <main className="user-details-page">
        <div className="user-details-message">
          Loading profile...
        </div>
      </main>
    );
  }

  if (error || !user) {
    return (
      <main className="user-details-page">
        <div className="user-details-message">
          <h2>Profile not found</h2>
          <p>{error || 'This profile does not exist.'}</p>

          <Link to="/community">
            Back to Community
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="user-details-page">

      <Link
        to="/community"
        className="user-details-back"
      >
        ← Back to Community
      </Link>

      <section className="user-details-card">

        <div className="user-details-image">

          <img
            src={user.profileImage || '/default-profile.png'}
            alt={user.name}
          />

        </div>

        <div className="user-details-content">

          <span className="user-details-label">
            SWAPLY MEMBER
          </span>

          <h1>{user.name}</h1>

          <p className="user-details-bio">
            {user.bio ||
              'This member has not added a bio yet.'}
          </p>

          <div className="user-details-actions">
            <Link
              to="/community"
              className="user-details-button"
            >
              Back to Community
            </Link>
          </div>

        </div>

      </section>

    </main>
  );
};

export default UserDetails;