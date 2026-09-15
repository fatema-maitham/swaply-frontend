import { useContext, useEffect, useState } from 'react';

import {
  Link,
  useNavigate,
  useParams,
} from 'react-router';

import {
  getSkill,
  deleteSkill,
} from '../../services/skillService';

import { UserContext } from '../../contexts/UserContext';

const SkillDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [skill, setSkill] = useState(null);
  const [message, setMessage] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadSkill = async () => {
      try {
        const data = await getSkill(id);
        setSkill(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadSkill();
  }, [id]);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setMessage('');

      await deleteSkill(id);
      navigate('/skills');
    } catch (err) {
      setMessage(err.message);
      setIsDeleting(false);
    }
  };

  const handleRequestSwap = () => {
    navigate(`/swaps/new?skill=${skill._id}`);
  };

  if (!skill) {
    return (
      <main>
        {message || 'Loading skill...'}
      </main>
    );
  }

  const ownerId = skill.owner?._id || skill.owner;
  const isOwner = user?._id === ownerId;

  return (
    <main className="skill-details-page">
      {message && <p>{message}</p>}

      <section className="skill-details-hero">
        <div className="skill-details-image">
          {skill.skillImage ? (
            <img
              src={skill.skillImage}
              alt={skill.name}
            />
          ) : (
            <span>Skill Image</span>
          )}
        </div>

        <div className="skill-details-info">
          <div className="skill-details-title">
            <h1>{skill.name}</h1>
          </div>

          <div className="skill-tags">
            <span className="skill-tag">
              {skill.category}
            </span>
          </div>

          <div className="skill-owner-info">
            <div className="owner-image">
              {skill.owner?.profileImage ? (
                <img
                  src={skill.owner.profileImage}
                  alt={skill.owner.name}
                />
              ) : (
                <span>Profile</span>
              )}
            </div>

            <div>
              <p>BY</p>

              <strong>
                {skill.owner?.name || 'Unknown'}
              </strong>

              <p>Review: 8/10</p>
            </div>
          </div>

          <div className="skill-actions">
            {!isOwner && (
              <button
                type="button"
                onClick={handleRequestSwap}
              >
                Request Skill Swap
              </button>
            )}
          </div>

          {isOwner && (
            <div className="skill-owner-actions">
              <Link to={`/skills/${skill._id}/edit`}>
                Edit Skill
              </Link>

              {!showDeleteConfirmation ? (
                <button
                  type="button"
                  onClick={() =>
                    setShowDeleteConfirmation(true)
                  }
                >
                  Delete Skill
                </button>
              ) : (
                <div className="delete-confirmation">
                  <p>
                    Are you sure you want to delete this skill?
                  </p>

                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting
                      ? 'Deleting...'
                      : 'Delete Skill'}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setShowDeleteConfirmation(false)
                    }
                    disabled={isDeleting}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="about-skill">
        <h2>About Skill</h2>
        <p>{skill.description}</p>
      </section>
    </main>
  );
};

export default SkillDetails;