import { useEffect, useState } from 'react';

import {
  Link,
  useParams,
} from 'react-router';

import { getUsers } from '../../services/userService';

import { getSkills } from '../../services/skillService';

import './CommunityProfile.css';

const CommunityProfile = () => {
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setMessage('');

        const users = await getUsers();

        const selectedUser = users.find(
          (member) =>
            String(member._id) === String(id)
        );

        if (!selectedUser) {
          throw new Error('Profile not found');
        }

        setProfile(selectedUser);

        const allSkills = await getSkills();

        const userSkills = allSkills.filter(
          (skill) => {
            const ownerId =
              skill.owner?._id || skill.owner;

            return (
              String(ownerId) ===
              String(selectedUser._id)
            );
          }
        );

        setSkills(userSkills);
      } catch (err) {
        console.error(err);
        setMessage(
          err.message || 'Unable to load profile.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [id]);

  if (loading) {
    return (
      <main className="community-profile-page">
        <div className="community-profile-message">
          Loading profile...
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="community-profile-page">
        <div className="community-profile-message">
          <h2>Profile not found</h2>

          <p>
            This community member could not be found.
          </p>

          <Link to="/community">
            Back to Community
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="community-profile-page">
      {/* =========================
          BACK
      ========================= */}

      <Link
        to="/community"
        className="community-profile-back"
      >
        ← Back to Community
      </Link>

      {/* =========================
          PROFILE HEADER
      ========================= */}

      <section className="community-profile-header">
        <div className="community-profile-avatar-wrapper">
          {profile.profileImage ? (
            <img
              src={profile.profileImage}
              alt={profile.name}
              className="community-profile-avatar"
            />
          ) : (
            <div className="community-profile-avatar-placeholder">
              {profile.name
                ?.slice(0, 2)
                .toUpperCase()}
            </div>
          )}
        </div>

        <div className="community-profile-info">
          <p className="community-profile-eyebrow">
            SWAPLY MEMBER
          </p>

          <h1>{profile.name}</h1>

          <p className="community-profile-email">
            {profile.email}
          </p>

          <p className="community-profile-bio">
            {profile.bio ||
              'This member has not added a bio yet.'}
          </p>
        </div>
      </section>

      {/* =========================
          SKILLS
      ========================= */}

      <section className="community-profile-section">
        <div className="community-profile-section-heading">
          <div>
            <p className="community-profile-eyebrow">
              SKILLS
            </p>

            <h2>
              Skills {profile.name} Teaches
            </h2>

            <p>
              Skills this member has shared with
              the Swaply community.
            </p>
          </div>
        </div>

        {skills.length > 0 ? (
          <div className="community-profile-skills">
            {skills.map((skill) => (
              <article
                key={skill._id}
                className="community-profile-skill-card"
              >
                <div className="community-profile-skill-image">
                  {skill.skillImage ? (
                    <img
                      src={skill.skillImage}
                      alt={skill.name}
                    />
                  ) : (
                    <span>
                      {skill.name
                        ?.slice(0, 2)
                        .toUpperCase()}
                    </span>
                  )}
                </div>

                <div className="community-profile-skill-content">
                  <span className="community-profile-skill-category">
                    {skill.category?.toUpperCase()}
                  </span>

                  <h3>{skill.name}</h3>

                  <p>
                    {skill.description ||
                      'No description available.'}
                  </p>

                  <Link
                    to={`/skills/${skill._id}`}
                    className="community-profile-skill-link"
                  >
                    View Skill
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="community-profile-empty">
            <h3>No skills yet</h3>

            <p>
              This member has not added any skills yet.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default CommunityProfile;
