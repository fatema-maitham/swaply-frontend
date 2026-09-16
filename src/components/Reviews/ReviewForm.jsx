import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { createReview } from '../../services/reviewService';

const ReviewForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const reviewedUser = searchParams.get('reviewedUser');
  const swap = searchParams.get('swap');

  const [formData, setFormData] = useState({
    reviewedUser: '',
    swap: '',
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
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          >
            <option value="">Select Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
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