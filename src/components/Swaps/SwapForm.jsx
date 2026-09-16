import { useContext, useEffect, useState } from 'react';

import {
  useNavigate,
  useSearchParams,
} from 'react-router';

import { createSwap } from '../../services/swapService';

import {
  getSkill,
  getSkills,
} from '../../services/skillService';

import { UserContext } from '../../contexts/UserContext';

const SwapForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useContext(UserContext);

  const skillId = searchParams.get('skillId');

  const [requestedSkill, setRequestedSkill] = useState(null);
  const [mySkills, setMySkills] = useState([]);

  const [formData, setFormData] = useState({
    receiver: '',
    skillOffered: '',
    skillRequested: '',
    scheduledDate: '',
  });

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSwapData = async () => {
      try {
        setIsLoading(true);
        setMessage('');

        if (!skillId) {
          throw new Error('No skill was selected.');
        }

        const [selectedSkill, skills] = await Promise.all([
          getSkill(skillId),
          getSkills(),
        ]);

        setRequestedSkill(selectedSkill);

        const userSkills = skills.filter((skill) => {
          const ownerId = skill.owner?._id || skill.owner;
          const currentUserId = user?._id || user?.id;

          return String(ownerId) === String(currentUserId);
        });

        setMySkills(userSkills);

        setFormData((prev) => ({
          ...prev,
          receiver: String(
            selectedSkill.owner?._id || selectedSkill.owner
          ),
          skillRequested: String(selectedSkill._id),
        }));
      } catch (error) {
        setMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      loadSwapData();
    }
  }, [skillId, user]);

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
      await createSwap(formData);
      navigate('/swaps');
    } catch (error) {
      setMessage(error.message);
    }
  };

  if (isLoading) {
    return (
      <main className="swap-form-page">
        <p className="swap-form-loading">
          Loading swap details...
        </p>
      </main>
    );
  }

  if (message && !requestedSkill) {
    return (
      <main className="swap-form-page">
        <p className="swap-form-message">{message}</p>
      </main>
    );
  }

  return (
    <main className="swap-form-page">
      <div className="swap-form-header">
        <p className="swap-form-eyebrow">
          START A SWAP
        </p>

        <h1>Request a Skill Swap</h1>

        <p>
          Choose one of your skills to offer in exchange.
        </p>
      </div>

      {message && (
        <p className="swap-form-message">
          {message}
        </p>
      )}

      <form
        className="swap-form"
        onSubmit={handleSubmit}
      >
        <div className="swap-requested-skill">
          <span className="swap-requested-label">
            YOU WANT TO LEARN
          </span>

          <h2>{requestedSkill.name}</h2>

          <p>
            {requestedSkill.owner?.name || 'Unknown'}
          </p>

          <span className="swap-requested-category">
            {requestedSkill.category}
          </span>
        </div>

        <div className="swap-form-fields">
          <div className="swap-form-field swap-form-field-full">
            <label htmlFor="skillOffered">
              Offer One of Your Skills
            </label>

            <select
              id="skillOffered"
              name="skillOffered"
              value={formData.skillOffered}
              onChange={handleChange}
              required
            >
              <option value="">
                Select a skill
              </option>

              {mySkills.map((skill) => (
                <option
                  key={skill._id}
                  value={skill._id}
                >
                  {skill.name}
                </option>
              ))}
            </select>

            {mySkills.length === 0 && (
              <p className="swap-form-helper">
                You need to add a skill before creating a swap.
              </p>
            )}
          </div>

          <div className="swap-form-field swap-form-field-full">
            <label htmlFor="scheduledDate">
              Scheduled Date
            </label>

            <input
              type="datetime-local"
              id="scheduledDate"
              name="scheduledDate"
              value={formData.scheduledDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="swap-form-actions">
          <button
            type="submit"
            className="swap-create-button"
            disabled={mySkills.length === 0}
          >
            Send Swap Request
          </button>

          <button
            type="button"
            className="swap-cancel-button"
            onClick={() => navigate('/swaps')}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default SwapForm;