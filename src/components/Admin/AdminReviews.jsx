import { useEffect, useState } from 'react';

import {
  deleteReview,
  getReviews,
} from '../../services/adminService';

import AdminAside from './AdminAside';

import './Admin.css';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await getReviews();

        setReviews(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this review?'
    );

    if (!shouldDelete) {
      return;
    }

    try {
      setDeletingId(reviewId);
      setMessage('');

      await deleteReview(reviewId);

      setReviews((currentReviews) =>
        currentReviews.filter(
          (review) => review._id !== reviewId
        )
      );
    } catch (err) {
      setMessage(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="admin-page">
      <AdminAside />

      <section className="admin-content">
        <header className="admin-header">
          <p className="admin-header-label">
            ADMINISTRATION
          </p>

          <h1>Reviews</h1>

          <p>
            Manage reviews submitted by Swaply users.
          </p>
        </header>

        {message && (
          <p className="admin-message">
            {message}
          </p>
        )}

        {reviews.length === 0 ? (
          <p className="admin-empty">
            No reviews found.
          </p>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Reviewer</th>
                  <th>Reviewed User</th>
                  <th>Swap</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {reviews.map((review) => (
                  <tr key={review._id}>
                    <td>
                      {review.reviewer?.name ||
                        'Unknown'}
                    </td>

                    <td>
                      {review.reviewedUser?.name ||
                        'Unknown'}
                    </td>

                    <td>
                      {review.swap?.skillRequested?.name ||
                        review.swap?.skillOffered?.name ||
                        'Unknown'}
                    </td>

                    <td>
                      {review.rating ?? 'N/A'}/5
                    </td>

                    <td>
                      {review.comment ||
                        'No comment'}
                    </td>

                    <td>
                      <button
                        type="button"
                        className="admin-delete-button"
                        onClick={() =>
                          handleDelete(review._id)
                        }
                        disabled={
                          deletingId === review._id
                        }
                      >
                        {deletingId === review._id
                          ? 'Deleting...'
                          : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
};

export default AdminReviews;

