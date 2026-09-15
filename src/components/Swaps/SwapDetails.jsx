import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router';

import { getSwap, deleteSwap } from '../../services/swapService';

const SwapDetails = () => {
  const { swapId } = useParams();
  const navigate = useNavigate();

  const [swap, setSwap] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadSwap = async () => {
      try {
        const data = await getSwap(swapId);
        setSwap(data);
      } catch (error) {
        setMessage(error.message);
      }
    };

    loadSwap();
  }, [swapId]);

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

  if (message && !swap) {
    return <p className="swap-details-message">{message}</p>;
  }

  if (!swap) {
    return <p className="swap-details-loading">Loading...</p>;
  }

  return (
    <main className="swap-details-page">
      <div className="swap-details-header">
        <p className="swap-details-eyebrow">SWAP REQUEST</p>
        <h1>Swap Details</h1>
        <p>
          View the details of this skill exchange and manage your swap.
        </p>
      </div>

      {message && (
        <p className="swap-details-message">{message}</p>
      )}

      <section className="swap-details-card">

        <div className="swap-details-top">
          <span className={`swap-status ${swap.status}`}>
            {swap.status}
          </span>
        </div>

        <div className="swap-details-skills">
          <div className="swap-details-skill">
            <span>OFFERING</span>
            <h2>{swap.skillOffered?.name}</h2>
            <p>{swap.skillOffered?.category}</p>
          </div>

          <div className="swap-details-arrow">
            ↔
          </div>

          <div className="swap-details-skill swap-details-skill-right">
            <span>REQUESTING</span>
            <h2>{swap.skillRequested?.name}</h2>
            <p>{swap.skillRequested?.category}</p>
          </div>
        </div>

        <div className="swap-details-info">

          <div className="swap-details-info-item">
            <span>Requester</span>
            <strong>{swap.requester?.name}</strong>
            <p>{swap.requester?.email}</p>
          </div>

          <div className="swap-details-info-item">
            <span>Receiver</span>
            <strong>{swap.receiver?.name}</strong>
            <p>{swap.receiver?.email}</p>
          </div>

          <div className="swap-details-info-item">
            <span>Scheduled Date</span>
            <strong>
              {swap.scheduledDate
                ? new Date(swap.scheduledDate).toLocaleDateString()
                : 'Not scheduled'}
            </strong>
          </div>

          <div className="swap-details-info-item">
            <span>Created</span>
            <strong>
              {swap.createdAt
                ? new Date(swap.createdAt).toLocaleDateString()
                : 'Not available'}
            </strong>
          </div>

        </div>

        <div className="swap-details-actions">
          <button
            type="button"
            className="swap-edit-button"
            onClick={() => navigate(`/swaps/${swap._id}/edit`)}
          >
            Edit Swap
          </button>

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
        </div>

      </section>
    </main>
  );
};

export default SwapDetails;