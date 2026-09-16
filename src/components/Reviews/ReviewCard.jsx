import { Link } from 'react-router';

const ReviewCard = ({ review }) => {
  const rating = Number(review.rating);

  const skillName =
    review.skill?.name || 'Skill';

  const reviewerName =
    review.reviewer?.name || 'Unknown';

  return (
    <li className="review-card">
      <div className="review-card-top">
        <div className="review-card-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star}>
              {star <= rating ? '★' : '☆'}
            </span>
          ))}
        </div>

        <p className="review-card-score">
          {rating}/5
        </p>
      </div>

      <p className="review-card-skill">
        {skillName}
      </p>

      <p className="review-card-comment">
        “{review.comment}”
      </p>

      <p className="review-card-reviewer">
        Reviewed by{' '}
        <strong>{reviewerName}</strong>
      </p>

      <Link
        className="review-card-link"
        to={`/reviews/${review._id}`}
      >
        View Review
      </Link>
    </li>
  );
};

export default ReviewCard;