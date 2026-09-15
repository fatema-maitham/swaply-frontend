import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getSwap, updateSwap } from '../../services/swapService';

const SwapEdit = () => {
  const { swapId } = useParams();
  const navigate = useNavigate();

  const [swap, setSwap] = useState(null);
  const [formData, setFormData] = useState({
    receiver: '',
    skillOffered: '',
    skillRequested: '',
    scheduledDate: '',
    status: '',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSwap = async () => {
      try {
        setIsLoading(true);
        setMessage('');

        const data = await getSwap(swapId);

        setSwap(data);

        setFormData({
          receiver: data.receiver?._id || data.receiver || '',
          skillOffered: data.skillOffered?._id || data.skillOffered || '',
          skillRequested: data.skillRequested?._id || data.skillRequested || '',
          scheduledDate: data.scheduledDate
            ? new Date(data.scheduledDate).toISOString().slice(0, 16)
            : '',
          status: data.status || 'pending',
        });
      } catch (error) {
        setMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadSwap();
  }, [swapId]);

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
      setMessage('');

      await updateSwap(swapId, formData);

      navigate(`/swaps/${swapId}`);
    } catch (error) {
      setMessage(error.message);
    }
  };

  if (isLoading) {
    return (
      <main className="swap-edit-page">
        <p className="swap-edit-loading">Loading swap...</p>
      </main>
    );
  }

  if (!swap) {
    return (
      <main className="swap-edit-page">
        <p className="swap-edit-message">{message || 'Swap not found.'}</p>
      </main>
    );
  }

  return (
    <main className="swap-edit-page">
      <div className="swap-edit-header">
        <p className="swap-edit-eyebrow">SWAP REQUEST</p>
        <h1>Edit Swap</h1>
        <p>Update the schedule or status of your skill exchange.</p>
      </div>

      {message && (
        <p className="swap-edit-message">{message}</p>
      )}

      <section className="swap-edit-card">
        <div className="swap-edit-summary">
          <div className="swap-edit-skill">
            <span>OFFERING</span>
            <h2>{swap.skillOffered?.name || 'Unknown skill'}</h2>
            <p>{swap.skillOffered?.category || 'No category'}</p>
          </div>

          <div className="swap-edit-arrow">↔</div>

          <div className="swap-edit-skill swap-edit-skill-right">
            <span>REQUESTING</span>
            <h2>{swap.skillRequested?.name || 'Unknown skill'}</h2>
            <p>{swap.skillRequested?.category || 'No category'}</p>
          </div>
        </div>

        <div className="swap-edit-participants">
          <div className="swap-edit-info">
            <span>Receiver</span>
            <strong>{swap.receiver?.name || 'Unknown'}</strong>
            <p>{swap.receiver?.email || ''}</p>
          </div>

          <div className="swap-edit-info">
            <span>Requester</span>
            <strong>{swap.requester?.name || 'Unknown'}</strong>
            <p>{swap.requester?.email || ''}</p>
          </div>
        </div>

        <form className="swap-edit-form" onSubmit={handleSubmit}>
          <div className="swap-edit-field">
            <label htmlFor="scheduledDate">Scheduled Date</label>
            <input
              type="datetime-local"
              id="scheduledDate"
              name="scheduledDate"
              value={formData.scheduledDate}
              onChange={handleChange}
            />
          </div>

          <div className="swap-edit-field">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="swap-edit-actions">
            <button
              type="submit"
              className="swap-edit-save-button"
            >
              Update Swap
            </button>

            <button
              type="button"
              className="swap-edit-cancel-button"
              onClick={() => navigate(`/swaps/${swapId}`)}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default SwapEdit;