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
        const [skillData, reviewsData] =
          await Promise.all([
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
      <main>
        {message || 'Loading skill...'}
      </main>
    );
  }

  const skillReviews = reviews.filter((review) => {
    const reviewSkillId = String(
      review.skill?._id || review.skill
    );

    return reviewSkillId === String(skill._id);
  });

  const averageRating =
    skillReviews.length > 0
      ? skillReviews.reduce(
          (total, review) =>
            total + Number(review.rating),
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
    skill.owner?._id || skill.owner
  );

  const isOwner = user?._id === ownerId;

  return (
    <main className="skill-details-page">

      {message && <p>{message}</p>}

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

          <div className="skill-owner-info">

            <div className="owner-image">
              {skill.owner?.profileImage ? (
                <img
                  src={skill.owner.profileImage}
                  alt={skill.owner.name}
                />
              ) : (
                <span>Profile</span>
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

                </div>
              ) : (
                <p>No reviews yet</p>
              )}
            </div>

          </div>

          <div className="skill-actions">
            <button type="button">
              Request Skill Swap
            </button>
          </div>

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
                    Are you sure you want to delete this skill?
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

      <section className="about-skill">
        <h2>About Skill</h2>

        <p>{skill.description}</p>
      </section>

    </main>
  );
};

export default SkillDetails;