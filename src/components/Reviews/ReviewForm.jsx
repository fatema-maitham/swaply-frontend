import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { createReview } from '../../services/reviewService';

import './Reviews.css';

const ReviewForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const swapId = searchParams.get('swap');

  const [formData, setFormData] = useState({
    swap: swapId || '',
    rating: '',
    comment: '',
  });

  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRating = (rating) => {
    setMessage('');

    setFormData({
      ...formData,
      rating,
    });
  };

  const handleChange = (evt) => {
    setMessage('');

    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (!swapId) {
      setMessage(
        'A valid completed swap is required to leave a review.'
      );
      return;
    }

    if (!formData.rating) {
      setMessage(
        'Please select a rating from 1 to 5 stars.'
      );
      return;
    }

    if (
      Number(formData.rating) < 1 ||
      Number(formData.rating) > 5
    ) {
      setMessage(
        'Rating must be between 1 and 5 stars.'
      );
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage('');

      await createReview(formData);

      navigate('/reviews');
    } catch (error) {
      setMessage(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <main className="review-form-page">
      <h1>Leave a Review</h1>

      <p className="reviews-subtitle">
        Share your feedback about your completed skill swap.
      </p>

      {message && (
        <p className="review-message">
          {message}
        </p>
      )}

      <form
        className="review-form"
        onSubmit={handleSubmit}
      >
        <div className="review-form-field">
          <p>Rating</p>

          <div
            className="review-rating"
            aria-label="Choose a rating from 1 to 5"
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="review-star"
                onClick={() => handleRating(star)}
                aria-label={`Give ${star} star${
                  star > 1 ? 's' : ''
                }`}
                title={`${star} star${
                  star > 1 ? 's' : ''
                }`}
              >
                {star <= Number(formData.rating)
                  ? '★'
                  : '☆'}
              </button>
            ))}
          </div>

          {formData.rating && (
            <p className="review-selected-rating">
              {formData.rating}/5
            </p>
          )}
        </div>

        <div className="review-form-field">
          <label htmlFor="comment">
            Comment
          </label>

          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Tell us about your experience..."
            required
          />
        </div>

        <div className="review-form-actions">
          <button
            type="submit"
            className="review-submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Submitting...'
              : 'Submit Review'}
          </button>

          <button
            type="button"
            className="review-cancel-button"
            onClick={() => navigate('/swaps')}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default ReviewForm;