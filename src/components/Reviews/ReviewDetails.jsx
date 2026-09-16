import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router';

import { getReview } from '../../services/reviewService';

import './Reviews.css';

const ReviewDetails = () => {
  const { reviewId } = useParams();
  const navigate = useNavigate();

  const [review, setReview] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadReview = async () => {
      try {
        const data = await getReview(reviewId);
        setReview(data);
      } catch (error) {
        setMessage(error.message);
      }
    };

    loadReview();
  }, [reviewId]);

  if (message) {
    return (
      <main className="review-details-page">
        <p className="review-message">{message}</p>

        <button
          type="button"
          className="review-back-button"
          onClick={() => navigate('/reviews')}
        >
          Back to Reviews
        </button>
      </main>
    );
  }

  if (!review) {
    return (
      <main className="review-details-page">
        <p className="review-details-loading">
          Loading...
        </p>
      </main>
    );
  }

  const rating = Number(review.rating);

  const reviewerName =
    review.reviewer?.name || 'Unknown';

  const reviewedUserName =
    review.reviewedUser?.name || 'Unknown';

  const skillName =
    review.skill?.name || 'Skill';

  const createdDate = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString()
    : 'Not available';

  return (
    <main className="review-details-page">
      <div className="review-details-header">
        <p className="reviews-eyebrow">
          SKILL SWAP FEEDBACK
        </p>

        <h1>Review Details</h1>

        <p className="reviews-subtitle">
          See the feedback shared after a completed skill swap.
        </p>
      </div>

      <section className="review-details-card">
        <div className="review-details-rating">
          <div className="review-details-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star}>
                {star <= rating ? '★' : '☆'}
              </span>
            ))}
          </div>

          <strong>{rating}/5</strong>
        </div>

        <div className="review-details-skill">
          <span>SKILL</span>
          <h2>{skillName}</h2>
        </div>

        <div className="review-details-comment">
          <span>COMMENT</span>
          <p>“{review.comment}”</p>
        </div>

        <div className="review-details-info">
          <div>
            <span>Reviewed by</span>
            <strong>{reviewerName}</strong>
          </div>

          <div>
            <span>Reviewed user</span>
            <strong>{reviewedUserName}</strong>
          </div>

          <div>
            <span>Date</span>
            <strong>{createdDate}</strong>
          </div>
        </div>

        <div className="review-details-actions">
          <button
            type="button"
            className="review-back-button"
            onClick={() => navigate('/reviews')}
          >
            Back to Reviews
          </button>
        </div>
      </section>
    </main>
  );
};

export default ReviewDetails;