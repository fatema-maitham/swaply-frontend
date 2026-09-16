import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';

import {
  getProfile,
  updateProfile,
  deleteProfile,
} from '../../services/userService';

import { getSkills } from '../../services/skillService';
import { UserContext } from '../../contexts/UserContext';

import './Profile.css';

const Profile = () => {
  const { setUser } = useContext(UserContext);
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const [isUploading, setIsUploading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await getProfile();
        setProfile(profileData);

        const allSkills = await getSkills();

        const mySkills = allSkills.filter((skill) => {
          const ownerId = skill.owner?._id || skill.owner;

          return String(ownerId) === String(profileData._id);
        });

        setSkills(mySkills);
      } catch (err) {
        console.error(err);
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    try {
      setIsUploading(true);
      setMessage('');

      const formData = new FormData();

      formData.append('name', profile.name || '');
      formData.append('bio', profile.bio || '');
      formData.append('profileImage', file);

      const updatedUser = await updateProfile(formData);

      setProfile(updatedUser);
      setUser(updatedUser);
    } catch (err) {
      console.error(err);
      setMessage(err.message);
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      setMessage('');

      await deleteProfile();

      localStorage.removeItem('token');
      sessionStorage.removeItem('token');

      setUser(null);

      window.location.href = '/';
    } catch (err) {
      console.error(err);
      setMessage(err.message);
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <main className="profile-page">
        <div className="profile-message-card">
          Loading profile...
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="profile-page">
        <div className="profile-message-card">
          {message || 'Unable to load profile.'}
        </div>
      </main>
    );
  }

  return (
    <main className="profile-page">

      {/* PROFILE HEADER */}

      <section className="profile-header-card">

        <div className="profile-avatar-column">

          <div className="profile-avatar-wrapper">

            <img
              src={profile.profileImage || '/default-profile.png'}
              alt={profile.name}
              className="profile-avatar"
            />

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg"
              className="profile-file-input"
              onChange={handleImageChange}
            />

            <button
              type="button"
              className="profile-camera-button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              title="Change profile photo"
              aria-label="Change profile photo"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M4 7h3l2-2h6l2 2h3v11H4V7z" />
                <circle cx="12" cy="12.5" r="3.2" />
              </svg>
            </button>

          </div>

        </div>

        <div className="profile-header-content">

          <p className="profile-eyebrow">
            MY PROFILE
          </p>

          <h1>
            {profile.name}
          </h1>

          <p className="profile-email">
            {profile.email}
          </p>

          <p className="profile-header-bio">
            {profile.bio ||
              'Add a short bio to tell the Swaply community about yourself.'}
          </p>

          <div className="profile-header-actions">

            <Link
              to="/profile/edit"
              className="profile-edit-button"
            >
              Edit Profile
            </Link>

          </div>

        </div>

      </section>

      {message && (
        <div className="profile-alert">
          {message}
        </div>
      )}

      {/* SKILLS */}

      <section className="profile-section">

        <div className="profile-section-heading">

          <div>
            <p className="profile-eyebrow">
              MY SKILLS
            </p>

            <h2>
              Skills I Teach
            </h2>

            <p className="profile-section-description">
              Skills you can share with the Swaply community.
            </p>
          </div>

          <Link
            to="/skills/new"
            className="profile-add-button"
          >
            + Add Skill
          </Link>

        </div>

        {skills.length > 0 ? (

          <div className="skills-grid">

            {skills.map((skill) => (

              <article
                key={skill._id}
                className="dashboard-skill-card"
              >

                <div className="dashboard-skill-image">

                  {skill.skillImage ? (
                    <img
                      src={skill.skillImage}
                      alt={skill.name}
                    />
                  ) : (
                    <div className="dashboard-skill-placeholder">
                      {skill.name?.slice(0, 2).toUpperCase()}
                    </div>
                  )}

                </div>

                <span>
                  {skill.category?.toUpperCase()}
                </span>

                <h3>
                  {skill.name}
                </h3>

                <p>
                  By {profile.name}
                </p>

                <div className="dashboard-skill-bottom">

                  <strong>
                    Your Skill
                  </strong>

                  <button
                    type="button"
                    className="profile-heart"
                    aria-label="Favorite skill"
                  >
                    ♡
                  </button>

                </div>

                <Link
                  to={`/skills/${skill._id}`}
                  className="dashboard-card-link"
                >
                  View Skill
                </Link>

              </article>

            ))}

          </div>

        ) : (

          <div className="profile-empty-card">

            <div className="profile-empty-icon">
              +
            </div>

            <h3>
              No skills yet
            </h3>

            <p>
              Add your first skill and start sharing what you know.
            </p>

            <Link
              to="/skills/new"
              className="profile-add-button"
            >
              Add Your First Skill
            </Link>

          </div>

        )}

      </section>

      {/* REVIEWS */}

      <section className="profile-section">

        <div className="profile-section-heading">

          <div>
            <p className="profile-eyebrow">
              COMMUNITY FEEDBACK
            </p>

            <h2>
              Reviews
            </h2>

            <p className="profile-section-description">
              Feedback from people you have completed swaps with.
            </p>
          </div>

        </div>

        <div className="profile-reviews-card">

          <div className="profile-review-icon">
            ★
          </div>

          <div>

            <h3>
              No reviews yet
            </h3>

            <p>
              Complete a skill swap to start receiving reviews
              from other community members.
            </p>

          </div>

        </div>

      </section>

      {/* DANGER ZONE */}

      <section className="profile-danger-card">

        <div className="profile-danger-text">

          <p className="profile-eyebrow profile-danger-eyebrow">
            ACCOUNT
          </p>

          <h2>
            Danger Zone
          </h2>

          <p>
            Permanently delete your Swaply account and
            remove your account information.
          </p>

        </div>

        {!showDelete ? (

          <button
            type="button"
            className="profile-delete-button"
            onClick={() => setShowDelete(true)}
          >
            Delete Account
          </button>

        ) : (

          <div className="profile-delete-confirm">

            <h3>
              Delete your account?
            </h3>

            <p>
              This action cannot be undone.
            </p>

            <div className="profile-delete-actions">

              <button
                type="button"
                className="profile-confirm-delete"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete Account'}
              </button>

              <button
                type="button"
                className="profile-cancel-delete"
                onClick={() => setShowDelete(false)}
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