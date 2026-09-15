import { Link } from 'react-router';

const SkillCard = ({ skill }) => {
  return (
    <article className="dashboard-skill-card">

      <div className="dashboard-skill-image">
        {skill.skillImage ? (
          <img
            src={skill.skillImage}
            alt={skill.name}
          />
        ) : (
          <div className="dashboard-skill-placeholder">
            {skill.name?.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      <span>
        {skill.category?.toUpperCase()}
      </span>

      <h3>{skill.name}</h3>

      <p>
        By {skill.owner?.name || 'Unknown'}
      </p>

      <div className="dashboard-skill-bottom">
        <strong>★ 8/10</strong>

        <button
          type="button"
          aria-label={`Save ${skill.name}`}
        >
          ♡
        </button>
      </div>

      <Link
        to={`/skills/${skill._id}`}
        className="dashboard-card-link"
      >
        View Skill
      </Link>

    </article>
  );
};

export default SkillCard;

