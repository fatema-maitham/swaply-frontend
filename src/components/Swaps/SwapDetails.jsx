import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import {
  getSwap,
  deleteSwap,
} from '../../services/swapService';

import { getReviews } from '../../services/reviewService';
import { UserContext } from '../../contexts/UserContext';

import './Swaps.css';

const SwapDetails = () => {
  const { swapId } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const [swap, setSwap] = useState(null);
  const [review, setReview] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSwap = async () => {
      try {
        setLoading(true);

        const data = await getSwap(swapId);

        setSwap(data);

        // Check for an existing review only when the swap is completed
        if (data.status === 'completed') {
          const allReviews = await getReviews();

          const currentUserId = user?._id;

          const existingReview = allReviews.find((item) => {
            const reviewerId =
              item.reviewer?._id || item.reviewer;

            const itemSwapId =
              item.swap?._id || item.swap;

            return (
              String(itemSwapId) === String(data._id) &&
              String(reviewerId) === String(currentUserId)
            );
          });

          setReview(existingReview || null);
        }
      } catch (error) {
        console.error(error);
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadSwap();
    }
  }, [swapId, user]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this swap?'
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteSwap(swapId);

      navigate('/swaps');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleLeaveReview = () => {
    navigate(`/ reviews / new? swap = ${swap._id} `);
  };

  if (loading) {
    return (
      <main className="swap-details-page">
        <p className="swap-details-loading">
          Loading...
        </p>
      </main>
    );
  }

  if (message && !swap) {
    return (
      <main className="swap-details-page">
        <p className="swap-details-message">
          {message}
        </p>
      </main>
    );
  }

  if (!swap) {
    return (
      <main className="swap-details-page">
        <p className="swap-details-message">
          Swap not found.
        </p>
      </main>
    );
  }

  return (
    <main className="swap-details-page">

      {/* HEADER */}

      <div className="swap-details-header">
        <p className="swap-details-eyebrow">
          SWAP REQUEST
        </p>

        <h1>
          Swap Details
        </h1>

        <p>
          View the details of this skill exchange and
          manage your swap.
        </p>
      </div>

      {message && (
        <p className="swap-details-message">
          {message}
        </p>
      )}

      {/* MAIN CARD */}

      <section className="swap-details-card">

        {/* STATUS */}

        <div className="swap-details-top">
          <span
            className={`swap - status ${swap.status} `}
          >
            {swap.status}
          </span>
        </div>

        {/* SKILLS */}

        <div className="swap-details-skills">

          <div className="swap-details-skill">
            <span>
              OFFERING
            </span>

            <h2>
              {swap.skillOffered?.name}
            </h2>

            <p>
              {swap.skillOffered?.category}
            </p>
          </div>

          <div className="swap-details-arrow">
            ↔
          </div>

          <div className="swap-details-skill swap-details-skill-right">
            <span>
              REQUESTING
            </span>

            <h2>
              {swap.skillRequested?.name}
            </h2>

            <p>
              {swap.skillRequested?.category}
            </p>
          </div>

        </div>

        {/* INFORMATION */}

        <div className="swap-details-info">

          <div className="swap-details-info-item">
            <span>
              Requester
            </span>

            <strong>
              {swap.requester?.name}
            </strong>

            <p>
              {swap.requester?.email}
            </p>
          </div>

          <div className="swap-details-info-item">
            <span>
              Receiver
            </span>

            <strong>
              {swap.receiver?.name}
            </strong>

            <p>
              {swap.receiver?.email}
            </p>
          </div>

          <div className="swap-details-info-item">
            <span>
              Scheduled Date
            </span>

            <strong>
              {swap.scheduledDate
                ? new Date(
                  swap.scheduledDate
                ).toLocaleDateString()
                : 'Not scheduled'}
            </strong>
          </div>

          <div className="swap-details-info-item">
            <span>
              Created
            </span>

            <strong>
              {swap.createdAt
                ? new Date(
                  swap.createdAt
                ).toLocaleDateString()
                : 'Not available'}
            </strong>
          </div>

        </div>

        {/* REVIEW */}

        {swap.status === 'completed' && (
          <div className="swap-review-section">

            {review ? (

              /* EXISTING REVIEW */

              <div className="swap-review-existing">

                <div className="swap-review-header">

                  <div>
                    <span className="swap-review-label">
                      REVIEW
                    </span>

                    <h2>
                      Your Review
                    </h2>
                  </div>

                  <div className="swap-review-rating">

                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}>
                        {star <= Number(review.rating)
                          ? '★'
                          : '☆'}
                      </span>
                    ))}

                  </div>

                </div>

                <div className="swap-review-content">

                  <div className="swap-review-rating-number">

                    <span>
                      Rating
                    </span>

                    <strong>
                      {review.rating}/5
                    </strong>

                  </div>

                  <div className="swap-review-comment-box">

                    <span>
                      Comment
                    </span>

                    <p>
                      “{review.comment}”
                    </p>

                  </div>

                </div>

              </div>

            ) : (

              /* NO REVIEW YET */

              <div className="swap-review-new">

                <div>

                  <span className="swap-review-label">
                    COMPLETED SWAP
                  </span>

                  <h2>
                    Leave a Review
                  </h2>

                  <p>
                    Share your experience with this skill swap.
                  </p>

                </div>

                <button
                  type="button"
                  className="swap-review-button"
                  onClick={handleLeaveReview}
                >
                  Leave a Review
                </button>

              </div>

            )}

          </div>
        )}

        {/* ACTIONS */}

        <div className="swap-details-actions">

          <button
            type="button"
            className="swap-edit-button"
            onClick={() =>
              navigate(`/ swaps / ${swap._id}/edit`)
            }
          >
            Edit Swap
          </button >

          <button
            type="button"
            className="swap-delete-button"
            onClick={handleDelete}
          >
            Delete Swap
          </button>

          <button
            type="button"
            className="swap-back-button"
            onClick={() => navigate('/swaps')}
          >
            Back to Swaps
          </button>

        </div >

      </section >

    </main >
  );
};

export default SwapDetails;

