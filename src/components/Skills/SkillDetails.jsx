import { useContext, useEffect, useState } from 'react';

import {
  Link,
  useNavigate,
  useParams,
} from 'react-router';

import {
  getSkill,
  deleteSkill,
} from '../../services/skillService';

import { getReviews } from '../../services/reviewService';

import { UserContext } from '../../contexts/UserContext';

const SkillDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const [skill, setSkill] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState('');

  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadSkillAndReviews = async () => {
      try {
        const [skillData, reviewsData] = await Promise.all([
          getSkill(id),
          getReviews(),
        ]);

        setSkill(skillData);
        setReviews(reviewsData);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadSkillAndReviews();
  }, [id]);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setMessage('');

      await deleteSkill(id);

      navigate('/skills');
    } catch (err) {
      setMessage(err.message);
      setIsDeleting(false);
    }
  };

  if (!skill) {
    return (
      <main className="skill-details-loading">
        {message || 'Loading skill...'}
      </main>
    );
  }

  /*
   * Get the reviews that belong to this skill.
   *
   * Supports:
   * 1. review.skill
   * 2. review.swap.skillRequested
   * 3. review.swap.skillOffered
   */
  const skillReviews = reviews.filter((review) => {
    const currentSkillId = String(skill._id);

    // Direct skill reference
    const directSkillId = String(
      review.skill?._id || review.skill || ''
    );

    if (directSkillId === currentSkillId) {
      return true;
    }

    // Review connected through swap
    const requestedSkillId = String(
      review.swap?.skillRequested?._id ||
      review.swap?.skillRequested ||
      ''
    );

    const offeredSkillId = String(
      review.swap?.skillOffered?._id ||
      review.swap?.skillOffered ||
      ''
    );

    return (
      requestedSkillId === currentSkillId ||
      offeredSkillId === currentSkillId
    );
  });

  const averageRating =
    skillReviews.length > 0
      ? skillReviews.reduce(
        (total, review) => total + Number(review.rating || 0),
        0
      ) / skillReviews.length
      : null;

  const displayRating =
    averageRating !== null
      ? Number.isInteger(averageRating)
        ? averageRating
        : averageRating.toFixed(1)
      : null;

  const ownerId = String(
    skill.owner?._id || skill.owner || ''
  );

  const currentUserId = String(user?._id || '');

  const isOwner = currentUserId === ownerId;

  const getReviewer = (review) => {
    return (
      review.reviewer ||
      review.user ||
      review.author ||
      review.createdBy ||
      null
    );
  };

  const getReviewerName = (review) => {
    const reviewer = getReviewer(review);

    return (
      reviewer?.name ||
      review.reviewerName ||
      'Anonymous User'
    );
  };

  const getReviewerImage = (review) => {
    const reviewer = getReviewer(review);

    return reviewer?.profileImage || null;
  };

  const getReviewerInitials = (review) => {
    const name = getReviewerName(review);

    return name
      .split(' ')
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  const getReviewDate = (review) => {
    const date = review.createdAt || review.updatedAt;

    if (!date) {
      return '';
    }

    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <main className="skill-details-page">
      {message && (
        <p className="skill-details-message">
          {message}
        </p>
      )}

      {/* =========================
          SKILL HERO
      ========================= */}

      <section className="skill-details-hero">
        <div className="skill-details-image">
          {skill.skillImage ? (
            <img
              src={skill.skillImage}
              alt={skill.name}
            />
          ) : (
            <span>Skill Image</span>
          )}
        </div>

        <div className="skill-details-info">
          <div className="skill-details-title">
            <h1>{skill.name}</h1>
          </div>

          <div className="skill-tags">
            <span className="skill-tag">
              {skill.category}
            </span>
          </div>

          {/* OWNER */}

          <div className="skill-owner-info">
            <div className="owner-image">
              {skill.owner?.profileImage ? (
                <img
                  src={skill.owner.profileImage}
                  alt={skill.owner.name}
                />
              ) : (
                <span>
                  {skill.owner?.name
                    ?.slice(0, 2)
                    .toUpperCase() || 'US'}
                </span>
              )}
            </div>

            <div>
              <p>BY</p>

              <strong>
                {skill.owner?.name || 'Unknown'}
              </strong>

              {displayRating !== null ? (
                <div className="skill-review-rating">
                  <span className="skill-review-stars">
                    ★
                  </span>

                  <span className="skill-review-score">
                    {displayRating}/5
                  </span>

                  <span className="skill-review-count">
                    ({skillReviews.length}{' '}
                    {skillReviews.length === 1
                      ? 'review'
                      : 'reviews'})
                  </span>
                </div>
              ) : (
                <p className="no-owner-reviews">
                  No reviews yet
                </p>
              )}
            </div>
          </div>

          {/* REQUEST */}

          <div className="skill-actions">
            <button type="button">
              Request Skill Swap
            </button>
          </div>

          {/* OWNER ACTIONS */}

          {isOwner && (
            <div className="skill-owner-actions">
              <Link to={`/skills/${skill._id}/edit`}>
                Edit Skill
              </Link>

              {!showDeleteConfirmation ? (
                <button
                  type="button"
                  onClick={() =>
                    setShowDeleteConfirmation(true)
                  }
                >
                  Delete Skill
                </button>
              ) : (
                <div className="delete-confirmation">
                  <p>
                    Are you sure you want to delete this
                    skill?
                  </p>

                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting
                      ? 'Deleting...'
                      : 'Delete Skill'}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setShowDeleteConfirmation(false)
                    }
                    disabled={isDeleting}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* =========================
          ABOUT SKILL
      ========================= */}

      <section className="about-skill">
        <p className="skill-details-eyebrow">
          ABOUT THIS SKILL
        </p>

        <h2>About Skill</h2>

        <p className="skill-description">
          {skill.description}
        </p>
      </section>

      {/* =========================
          REVIEWS
      ========================= */}

      <section className="skill-reviews-section">
        <div className="skill-reviews-heading">
          <div>
            <p className="skill-details-eyebrow">
              COMMUNITY FEEDBACK
            </p>

            <h2>Reviews</h2>
          </div>

          {displayRating !== null && (
            <div className="reviews-summary">
              <strong>{displayRating}</strong>

              <div>
                <div className="reviews-summary-stars">
                  {'★'.repeat(
                    Math.round(averageRating)
                  )}
                  {'☆'.repeat(
                    5 - Math.round(averageRating)
                  )}
                </div>

                <span>
                  Based on {skillReviews.length}{' '}
                  {skillReviews.length === 1
                    ? 'review'
                    : 'reviews'}
                </span>
              </div>
            </div>
          )}
        </div>

        {skillReviews.length === 0 ? (
          <div className="reviews-empty">
            <div className="reviews-empty-icon">
              ★
            </div>

            <h3>No reviews yet</h3>

            <p>
              Be the first to share your experience
              with this skill.
            </p>
          </div>
        ) : (
          <div className="reviews-list">
            {skillReviews.map((review) => {
              const reviewerName =
                getReviewerName(review);

              const reviewerImage =
                getReviewerImage(review);

              const reviewerInitials =
                getReviewerInitials(review);

              const reviewRating = Number(
                review.rating || 0
              );

              return (
                <article
                  key={review._id}
                  className="skill-review-card"
                >
                  <div className="skill-review-header">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">
                        {reviewerImage ? (
                          <img
                            src={reviewerImage}
                            alt={`${reviewerName} profile`}
                          />
                        ) : (
                          <span>
                            {reviewerInitials}
                          </span>
                        )}
                      </div>

                      <div>
                        <h3>{reviewerName}</h3>

                        <p className="review-date">
                          {getReviewDate(review)}
                        </p>
                      </div>
                    </div>

                    <div className="review-rating">
                      <span className="review-stars">
                        {'★'.repeat(reviewRating)}
                        {'☆'.repeat(
                          5 - reviewRating
                        )}
                      </span>

                      <strong>
                        {reviewRating}/5
                      </strong>
                    </div>
                  </div>

                  {review.comment && (
                    <p className="review-comment">
                      {review.comment}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default SkillDetails;
