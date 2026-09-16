import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

import { getCommunityUsers } from '../../services/communityService';
import { getSkills } from '../../services/skillService';
import { getReviews } from '../../services/reviewService';

import './UserDetails.css';

const UserDetails = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError('');

        // Use the SAME service that Community already uses
        const users = await getCommunityUsers();

        const selectedUser = users.find(
          (member) => String(member._id) === String(id)
        );

        if (!selectedUser) {
          throw new Error('This profile does not exist.');
        }

        setUser(selectedUser);

        const [skillsData, reviewsData] = await Promise.all([
          getSkills(),
          getReviews(),
        ]);

        const allSkills =
          skillsData?.skills || skillsData || [];

        const allReviews =
          reviewsData?.reviews || reviewsData || [];

        const userSkills = allSkills.filter(
          (skill) =>
            String(skill.owner?._id || skill.owner) ===
            String(id)
        );

        const userReviews = allReviews.filter(
          (review) =>
            String(
              review.reviewedUser?._id ||
              review.reviewedUser
            ) === String(id)
        );

        setSkills(userSkills);
        setReviews(userReviews);
      } catch (err) {
        console.log('USER DETAILS ERROR:', err);
        setError(
          err.message || 'Failed to load profile.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
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

          <p>
            {error || 'This profile does not exist.'}
          </p>

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

      {/* PROFILE */}

      <section className="user-details-profile">

        <div className="user-details-avatar">
          <img
            src={
              user.profileImage ||
              '/default-profile.png'
            }
            alt={user.name}
            onError={(event) => {
              event.currentTarget.src =
                '/default-profile.png';
            }}
          />
        </div>

        <div className="user-details-profile-info">

          <span className="user-details-label">
            SWAPLY MEMBER
          </span>

          <h1>{user.name}</h1>

          <p className="user-details-bio">
            {user.bio ||
              'This member has not added a bio yet.'}
          </p>

        </div>

      </section>

      {/* SKILLS */}

      <section className="user-details-section">

        <div className="user-details-section-header">

          <div>
            <span className="user-details-section-label">
              SKILLS
            </span>

            <h2>
              {user.name}'s Skills
            </h2>
          </div>

          <span className="user-details-count">
            {skills.length}
          </span>

        </div>

        {skills.length === 0 ? (
          <div className="user-details-empty">

            <h3>No skills yet</h3>

            <p>
              {user.name} has not added any skills yet.
            </p>

          </div>
        ) : (
          <div className="user-details-skills-grid">

            {skills.map((skill) => (
              <Link
                to={`/skills/${skill._id}`}
                className="user-details-skill-card"
                key={skill._id}
              >

                <div className="user-details-skill-image">

                  {skill.skillImage ? (
                    <img
                      src={skill.skillImage}
                      alt={skill.name}
                    />
                  ) : (
                    <img
                      src="/default-skill.png"
                      alt=""
                    />
                  )}

                </div>

                <div className="user-details-skill-content">

                  <h3>{skill.name}</h3>

                  {skill.category && (
                    <span className="user-details-skill-category">
                      {typeof skill.category === 'object'
                        ? skill.category.name
                        : skill.category}
                    </span>
                  )}

                  <p>
                    {skill.description ||
                      'No description available.'}
                  </p>

                </div>

              </Link>
            ))}

          </div>
        )}

      </section>

      {/* REVIEWS */}

      <section className="user-details-section">

        <div className="user-details-section-header">

          <div>
            <span className="user-details-section-label">
              REVIEWS
            </span>

            <h2>
              Reviews about {user.name}
            </h2>
          </div>

          <span className="user-details-count">
            {reviews.length}
          </span>

        </div>

        {reviews.length === 0 ? (
          <div className="user-details-empty">

            <h3>No reviews yet</h3>

            <p>
              {user.name} has not received any reviews yet.
            </p>

          </div>
        ) : (
          <div className="user-details-reviews">

            {reviews.map((review) => (
              <article
                className="user-details-review-card"
                key={review._id}
              >

                <div className="user-details-review-top">

                  <div className="user-details-reviewer">

                    <div className="user-details-reviewer-avatar">

                      <img
                        src={
                          review.reviewer?.profileImage ||
                          '/default-profile.png'
                        }
                        alt={
                          review.reviewer?.name ||
                          'Reviewer'
                        }
                        onError={(event) => {
                          event.currentTarget.src =
                            '/default-profile.png';
                        }}
                      />

                    </div>

                    <div>

                      <h3>
                        {review.reviewer?.name ||
                          'Swaply Member'}
                      </h3>

                      {review.createdAt && (
                        <span>
                          {new Date(
                            review.createdAt
                          ).toLocaleDateString()}
                        </span>
                      )}

                    </div>

                  </div>

                  {review.rating !== undefined && (
                    <div className="user-details-rating">
                      {'★'.repeat(
                        Number(review.rating)
                      )}
                      {'☆'.repeat(
                        5 - Number(review.rating)
                      )}
                    </div>
                  )}

                </div>

                <p className="user-details-review-text">
                  {review.comment ||
                    review.text ||
                    'No review comment provided.'}
                </p>

              </article>
            ))}

          </div>
        )}

      </section>

    </main>
  );
};

export default UserDetails;