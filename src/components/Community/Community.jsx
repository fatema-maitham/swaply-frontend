import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getCommunityUsers } from '../../services/communityService';
import './Community.css';

const Community = () => {
  const navigate = useNavigate();

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
    const searchText = search.toLowerCase().trim();

    return (
      name.toLowerCase().includes(searchText) ||
      bio.toLowerCase().includes(searchText)
    );
  });

  const handleProfileClick = (userId) => {
    navigate(`/users/${userId}`);
  };

  return (
    <main className="community-page">

      {/* =========================
          HEADER
      ========================= */}

      <section className="community-header">
        <div>
          <h1>Meet the Community</h1>

          <p>
            Discover people on Swaply and find someone
            to learn from, teach, or connect with.
          </p>
        </div>
      </section>

      {/* =========================
          SEARCH
      ========================= */}

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

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <div className="community-message">
          {error}
        </div>
      )}

      {/* =========================
          LOADING
      ========================= */}

      {loading && (
        <div className="community-empty">
          <h2>Loading community...</h2>
        </div>
      )}

      {/* =========================
          NO RESULTS
      ========================= */}

      {!loading &&
        !error &&
        filteredUsers.length === 0 && (
          <div className="community-empty">
            <h2>No members found</h2>

            <p>
              {search
                ? 'Try a different search.'
                : 'There are no community members yet.'}
            </p>
          </div>
        )}

      {/* =========================
          COMMUNITY CARDS
      ========================= */}

      {!loading &&
        !error &&
        filteredUsers.length > 0 && (
          <section className="community-grid">

            {filteredUsers.map((member) => (
              <article
                className="dashboard-skill-card community-card"
                key={member._id}
                onClick={() =>
                  handleProfileClick(member._id)
                }
              >

                {/* PROFILE IMAGE */}

                <div className="community-avatar-wrapper">
                  <img
                    src={member.profileImage || '/default-profile.png'}
                    alt={member.name}
                    className="community-avatar"
                  />
                </div>

                {/* NAME */}

                <h3>{member.name}</h3>

                {/* BIO */}

                <p className="community-bio">
                  {member.bio ||
                    'This member has not added a bio yet.'}
                </p>

                {/* BUTTON */}

                <button
                  type="button"
                  className="community-profile-button"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleProfileClick(member._id);
                  }}
                >
                  View Profile
                </button>

              </article>
            ))}

          </section>
        )}
    </main>
  );
};

export default Community;