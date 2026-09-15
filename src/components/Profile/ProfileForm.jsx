import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router';

import {
  getProfile,
  updateProfile,
} from '../../services/userService';

const ProfileForm = () => {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
  });

  const [currentImage, setCurrentImage] = useState('');

  const [profileImage, setProfileImage] = useState(null);

  const [previewImage, setPreviewImage] = useState('');

  const [message, setMessage] = useState('');

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = await getProfile();

        setFormData({
          name: user.name || '',
          bio: user.bio || '',
        });

        setCurrentImage(user.profileImage || '');
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (evt) => {
    setMessage('');

    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleImageChange = (evt) => {
    const file = evt.target.files[0];

    if (!file) {
      return;
    }

    setProfileImage(file);

    const imageUrl = URL.createObjectURL(file);

    setPreviewImage(imageUrl);

    setMessage('');
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      setIsSaving(true);
      setMessage('');

      const data = new FormData();

      data.append('name', formData.name);

      data.append('bio', formData.bio);

      if (profileImage) {
        data.append('profileImage', profileImage);
      }

      await updateProfile(data);

      navigate('/profile');
    } catch (err) {
      setMessage(err.message);
      setIsSaving(false);
    }
  };

  const imageToShow = previewImage || currentImage;

  return (
    <main className="profile-form-page">

      <section className="profile-form-card">

        <div className="profile-form-heading">

          <span className="profile-section-label">
            ACCOUNT SETTINGS
          </span>

          <h1>
            Edit Profile
          </h1>

          <p className="profile-form-subtitle">
            Keep your Swaply profile up to date.
          </p>

        </div>

        {message && (
          <p className="profile-form-error">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          {/* PROFILE PHOTO */}

          <div className="profile-form-photo-section">

            <div className="profile-form-image-wrapper">

              {imageToShow ? (
                <img
                  src={imageToShow}
                  alt="Profile preview"
                />
              ) : (
                <div className="profile-form-image-placeholder">
                  {formData.name?.charAt(0).toUpperCase() || '?'}
                </div>
              )}

              <button
                type="button"
                className="profile-form-camera-button"
                onClick={handleCameraClick}
                aria-label="Change profile photo"
                title="Change profile photo"
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


            <input
              ref={fileInputRef}
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
              className="profile-image-input"
            />

          </div>

          {/* FORM */}

          <div className="profile-form-fields">

            <div className="profile-form-group">

              <label htmlFor="name">
                Full Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />

            </div>

            <div className="profile-form-group">

              <label htmlFor="bio">
                Bio
              </label>

              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell the Swaply community about yourself..."
                rows="5"
              />

            </div>

          </div>

          {/* ACTIONS */}

          <div className="profile-form-actions">

            <button
              type="submit"
              className="profile-save-button"
              disabled={isSaving}
            >
              {isSaving
                ? 'Saving...'
                : 'Save Changes'}
            </button>

            <button
              type="button"
              className="profile-cancel-button"
              onClick={() => navigate('/profile')}
              disabled={isSaving}
            >
              Cancel
            </button>

          </div>

        </form>

      </section>

    </main>
  );
};

export default ProfileForm;
