import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { createReview } from '../../services/reviewService';

const ReviewForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const reviewedUser = searchParams.get('reviewedUser');
  const swap = searchParams.get('swap');

  const [formData, setFormData] = useState({
    reviewedUser: reviewedUser || '',
    swap: swap || '',
    rating: '',
    comment: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (evt) => {
    setMessage('');

    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleRating = (rating) => {
    setMessage('');

    setFormData({
      ...formData,
      rating,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      await createReview(formData);
      navigate('/reviews');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <main>
      <h1>Create Review</h1>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="reviewedUser">Reviewed User:</label>
          <input
            type="text"
            id="reviewedUser"
            name="reviewedUser"
            value={formData.reviewedUser}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="swap">Swap:</label>
          <input
            type="text"
            id="swap"
            name="swap"
            value={formData.swap}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <p>Rating:</p>

          <div>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRating(star)}
                aria-label={`${star} star${star > 1 ? 's' : ''}`}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '2rem',
                }}
              >
                {star <= Number(formData.rating) ? '★' : '☆'}
              </button>
            ))}
          </div>

          <input
            type="hidden"
            name="rating"
            value={formData.rating}
            required
          />
        </div>

        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <button type="submit">Create Review</button>

          <button
            type="button"
            onClick={() => navigate('/reviews')}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default ReviewForm;