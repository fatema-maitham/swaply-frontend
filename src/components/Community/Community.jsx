import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getCommunityUsers } from '../../services/communityService';
import './Community.css';

const Community = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getCommunityUsers();

        setUsers(data || []);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const filteredUsers = users.filter((member) => {
    const name = member.name || '';
    const bio = member.bio || '';

    const searchText = search.toLowerCase();

    return (
      name.toLowerCase().includes(searchText) ||
      bio.toLowerCase().includes(searchText)
    );
  });

  return (
    <main className="community-page">

      {/* =========================================
          HEADER
      ========================================= */}

      <section className="community-header">

        <span className="community-label">
          SWAPLY COMMUNITY
        </span>

        <h1>
          Meet the Community
        </h1>

        <p>
          Discover people on Swaply and find someone
          to learn from, teach, or connect with.
        </p>

      </section>

      {/* =========================================
          SEARCH
      ========================================= */}

      <section className="community-controls">

        <div className="community-search">

          <input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

        </div>

      </section>

      {/* =========================================
          ERROR
      ========================================= */}

      {error && (
        <div className="community-message">
          {error}
        </div>
      )}

      {/* =========================================
          LOADING
      ========================================= */}

      {loading && (
        <div className="community-empty">

          <h2>
            Loading community...
          </h2>

        </div>
      )}

      {/* =========================================
          NO USERS
      ========================================= */}

      {!loading && !error && filteredUsers.length === 0 && (
        <div className="community-empty">

          <h2>
            No members found
          </h2>

          <p>
            Try a different search.
          </p>

        </div>
      )}

      {/* =========================================
          USERS
      ========================================= */}

      {!loading && !error && filteredUsers.length > 0 && (

        <section className="community-grid">

          {filteredUsers.map((member) => (

            <article
              className="community-card"
              key={member._id}
            >

              {/* PROFILE IMAGE */}

              <div className="community-card-top">

                {member.profileImage ? (

                  <img
                    src={member.profileImage}
                    alt={`${member.name}'s profile`}
                    className="community-avatar"
                  />

                ) : (

                  <div className="community-avatar-placeholder">
                    {member.name
                      ?.charAt(0)
                      .toUpperCase()}
                  </div>

                )}

              </div>

              {/* USER INFORMATION */}

              <div className="community-card-content">

                <h2>
                  {member.name}
                </h2>

                <p className="community-bio">
                  {member.bio ||
                    'This member has not added a bio yet.'}
                </p>

                <div className="community-card-actions">

                  <Link
                    to={`/users/${member._id}`}
                    className="community-view-button"
                  >
                    View Profile
                  </Link>

                </div>

              </div>

            </article>

          ))}

        </section>

      )}

    </main>
  );
};

export default Community;
