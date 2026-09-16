import { useEffect, useState } from 'react';

import { getReviews } from '../../services/reviewService';

import ReviewCard from './ReviewCard';

import './Reviews.css';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await getReviews();

        setReviews(data);
      } catch (error) {
        setMessage(error.message);
      }
    };

    loadReviews();
  }, []);

  return (
    <main className="reviews-page">
      <div className="reviews-header">
        <div>
          <h1>Reviews</h1>

          <p className="reviews-subtitle">
            See what people are saying about their
            skill swap experiences.
          </p>
        </div>
      </div>

      {message && (
        <p className="review-message">
          {message}
        </p>
      )}

      {reviews.length === 0 ? (
        <div className="empty-reviews">
          <h2>No reviews yet</h2>

          <p>
            Complete a skill swap to leave the first
            review.
          </p>
        </div>
      ) : (
        <ul className="reviews-list">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
            />
          ))}
        </ul>
      )}
    </main>
  );
};

export default ReviewList;