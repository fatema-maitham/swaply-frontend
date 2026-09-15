import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import {
  getProfile,
  updateProfile,
  deleteProfile,
} from '../../services/userService';

import { getSkills } from '../../services/skillService';

import { UserContext } from '../../contexts/UserContext';

const Profile = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const fileInputRef = useRef(null);

  const [user, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [message, setMessage] = useState('');

  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState(false);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getProfile();
        setProfile(profile);

        const allSkills = await getSkills();

        const mySkills = allSkills.filter((skill) => {
          const ownerId =
            skill.owner?._id || skill.owner;

          return ownerId === profile._id;
        });

        setSkills(mySkills);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadProfile();
  }, []);

  const handleProfileImageChange = async (evt) => {
    const file = evt.target.files[0];

    if (!file) {
      return;
    }

    try {
      setIsUploading(true);
      setMessage('');

      const data = new FormData();

      data.append('name', user.name || '');
      data.append('bio', user.bio || '');
      data.append('profileImage', file);

      const updatedUser = await updateProfile(data);

      setProfile(updatedUser);
      setUser(updatedUser);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setIsUploading(false);
      evt.target.value = '';
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      setMessage('');

      await deleteProfile();

      localStorage.removeItem('token');

      setUser(null);

      navigate('/');
    } catch (err) {
      setMessage(err.message);
      setIsDeleting(false);
    }
  };

  if (!user) {
    return (
      <main className="profile-page">
        <div className="profile-loading">
          {message || 'Loading profile...'}
        </div>
      </main>
    );
  }

  return (
    <main className="profile-page">

      <h1 className="profile-page-title">
        My Profile
      </h1>

      {message && (
        <p className="profile-message">
          {message}
        </p>
      )}

      {/* PROFILE HEADER */}

      <section className="profile-header">

        <div className="profile-image-section">

          <div className="profile-image-wrapper">

            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={`${user.name}'s profile`}
              />
            ) : (
              <div className="profile-image-placeholder">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg"
              className="profile-image-input"
              onChange={handleProfileImageChange}
            />

            <button
              type="button"
              className="profile-camera-button"
              aria-label="Change profile photo"
              title="Change profile photo"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M9 5l1.5-2h3L15 5h3a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h3z"
                />

                <circle
                  cx="12"
                  cy="12"
                  r="3.5"
                />
              </svg>
            </button>

          </div>

        </div>

        <div className="profile-info">

          <h2>
            {user.name}
          </h2>

          <p className="profile-email">
            {user.email}
          </p>

          <p className="profile-bio">
            {user.bio ||
              'No bio yet. Tell the Swaply community a little about yourself.'}
          </p>

          <div className="profile-actions">

            <Link
              to="/profile/edit"
              className="profile-edit-button"
            >
              Edit Profile
            </Link>

          </div>

        </div>

      </section>

      {/* PROFILE CONTENT */}

      <section className="profile-content">

        <div className="profile-card">

          <div className="profile-tabs">

            <button
              type="button"
              className={
                activeTab === 'about'
                  ? 'profile-tab active'
                  : 'profile-tab'
              }
              onClick={() => setActiveTab('about')}
            >
              About
            </button>

            <button
              type="button"
              className={
                activeTab === 'skills'
                  ? 'profile-tab active'
                  : 'profile-tab'
              }
              onClick={() => setActiveTab('skills')}
            >
              Skills
            </button>

            <button
              type="button"
              className={
                activeTab === 'reviews'
                  ? 'profile-tab active'
                  : 'profile-tab'
              }
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>

          </div>

          {/* ABOUT */}

          {activeTab === 'about' && (
            <div className="profile-about">

              <span className="profile-section-label">
                ABOUT ME
              </span>

              <h2>
                About
              </h2>

              <p>
                {user.bio || 'No bio yet.'}
              </p>

            </div>
          )}

          {/* SKILLS */}

          {activeTab === 'skills' && (
            <div className="profile-skills-content">

              <div className="profile-skills-heading">

                <div>
                  <span className="profile-section-label">
                    MY SKILLS
                  </span>

                  <h2>
                    Skills I Teach
                  </h2>

                  <p>
                    Share your skills with the Swaply community.
                  </p>
                </div>

                <Link
                  to="/skills/new"
                  state={{ from: '/profile' }}
                  className="profile-add-skill-button"
                >
                  + Add a Skill
                </Link>

              </div>

              {skills.length === 0 ? (

                <div className="profile-no-skills">

                  <div className="profile-no-skills-icon">
                    +
                  </div>

                  <h3>
                    No skills added yet
                  </h3>

                  <p>
                    Add a skill you can teach to start connecting
                    with people who want to learn from you.
                  </p>

                  <Link
                    to="/skills/new"
                    state={{ from: '/profile' }}
                    className="profile-add-skill-button"
                  >
                    Add Your First Skill
                  </Link>

                </div>

              ) : (

                <div className="profile-skills-grid">

                  {skills.map((skill) => (

                    <article
                      key={skill._id}
                      className="profile-skill-card"
                    >

                      <div className="profile-skill-image">

                        {skill.skillImage ? (
                          <img
                            src={skill.skillImage}
                            alt={skill.name}
                          />
                        ) : (
                          <span>
                            {skill.name?.charAt(0).toUpperCase()}
                          </span>
                        )}

                      </div>

                      <div className="profile-skill-card-content">

                        <h3>
                          {skill.name}
                        </h3>

                        <span className="profile-skill-category">
                          {skill.category}
                        </span>

                        <p>
                          {skill.description}
                        </p>

                        <Link
                          to={`/skills/${skill._id}`}
                          className="profile-view-skill-button"
                        >
                          View Skill
                        </Link>

                      </div>

                    </article>

                  ))}

                </div>

              )}

            </div>
          )}

          {/* REVIEWS */}

          {activeTab === 'reviews' && (
            <div className="profile-tab-content">

              <span className="profile-section-label">
                COMMUNITY FEEDBACK
              </span>

              <h2>
                Reviews
              </h2>

              <p>
                Reviews from other Swaply members will appear
                here after you complete swaps.
              </p>

            </div>
          )}

        </div>

      </section>

      {/* DANGER ZONE */}

      <section className="profile-danger-zone">

        <div>

          <h2>
            Danger Zone
          </h2>

          <p>
            Permanently delete your Swaply account and all
            associated data.
          </p>

        </div>

        {!showDeleteConfirmation ? (

          <button
            type="button"
            className="delete-account-button"
            onClick={() => setShowDeleteConfirmation(true)}
          >
            Delete Account
          </button>

        ) : (

          <div className="delete-confirmation">

            <h3>
              Are you sure you want to delete your account?
            </h3>

            <p>
              This action cannot be undone.
            </p>

            <div className="delete-confirmation-actions">

              <button
                type="button"
                className="confirm-delete-button"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
              >
                {isDeleting
                  ? 'Deleting...'
                  : 'Delete My Account'}
              </button>

              <button
                type="button"
                className="cancel-delete-button"
                onClick={() => setShowDeleteConfirmation(false)}
                disabled={isDeleting}
              >
                Cancel
              </button>

            </div>

          </div>

        )}

      </section>

    </main>
  );
};

export default Profile;