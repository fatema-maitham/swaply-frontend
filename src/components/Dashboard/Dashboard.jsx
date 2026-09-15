import { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';

import { getSkills } from '../../services/skillService';

const Dashboard = () => {
  const { user } = useContext(UserContext);

  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const data = await getSkills();
        setSkills(data.slice(0, 4));
      } catch (err) {
        console.error('Failed to load skills:', err);
      }
    };

    loadSkills();
  }, []);

  return (
    <main className="dashboard-page">

      {/* Welcome */}
      <section className="dashboard-welcome">
        <div>
          <p className="dashboard-eyebrow">WELCOME BACK</p>

          <h1>Welcome back, {user?.name}!</h1>

          <p>
            Ready to learn something new or share your skills?
          </p>
        </div>

        <div className="dashboard-actions">
          <Link
            to="/skills"
            className="dashboard-primary-button"
          >
            Find a Skill
          </Link>

          <Link
            to="/skills/new"
            className="dashboard-secondary-button"
          >
            Offer a Skill
          </Link>
        </div>
      </section>

      {/* Your Activity */}
      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <div>
            <p className="dashboard-eyebrow">YOUR ACTIVITY</p>

            <h2>Overview</h2>
          </div>
        </div>

        <div className="dashboard-activity-grid">
          <article className="dashboard-activity-card">
            <span>Active Swaps</span>
            <strong>3</strong>
          </article>

          <article className="dashboard-activity-card">
            <span>Pending Requests</span>
            <strong>2</strong>
          </article>

          <article className="dashboard-activity-card">
            <span>Skills Offered</span>
            <strong>5</strong>
          </article>

          <article className="dashboard-activity-card">
            <span>Skills Learned</span>
            <strong>4</strong>
          </article>
        </div>
      </section>

      {/* Recommended Skills */}
      <section className="dashboard-section">
        <div className="dashboard-section-heading dashboard-heading-row">
          <div>
            <p className="dashboard-eyebrow">EXPLORE</p>

            <h2>Skills You Might Like</h2>
          </div>

          <Link
            to="/skills"
            className="dashboard-view-all"
          >
            View All
          </Link>
        </div>

        <div className="dashboard-skill-grid">
          {skills.map((skill) => (
            <article
              key={skill._id}
              className="dashboard-skill-card"
            >
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
          ))}
        </div>
      </section>

      {/* Recent Swaps */}
      <section className="dashboard-section">
        <div className="dashboard-section-heading dashboard-heading-row">
          <div>
            <p className="dashboard-eyebrow">YOUR ACTIVITY</p>

            <h2>Your Recent Swaps</h2>
          </div>

          <Link
            to="/swaps"
            className="dashboard-view-all"
          >
            View All
          </Link>
        </div>

        <div className="dashboard-swaps">
          <article className="dashboard-swap-row">
            <div>
              <h3>JavaScript</h3>
              <p>With David A.</p>
            </div>

            <span className="dashboard-status active">
              Active
            </span>
          </article>

          <article className="dashboard-swap-row">
            <div>
              <h3>UI Design</h3>
              <p>With Sara M.</p>
            </div>

            <span className="dashboard-status pending">
              Pending
            </span>
          </article>

          <article className="dashboard-swap-row">
            <div>
              <h3>Photography</h3>
              <p>With Noor A.</p>
            </div>

            <span className="dashboard-status completed">
              Completed
            </span>
          </article>
        </div>
      </section>

      {/* Community */}
      <section className="dashboard-section">
        <div className="dashboard-section-heading dashboard-heading-row">
          <div>
            <p className="dashboard-eyebrow">COMMUNITY</p>

            <h2>People You Might Learn From</h2>
          </div>

          <Link
            to="/community"
            className="dashboard-view-all"
          >
            View Community
          </Link>
        </div>

        <div className="dashboard-community-grid">
          <article className="dashboard-person-card">
            <div className="dashboard-avatar">
              DA
            </div>

            <h3>David A.</h3>

            <p>JavaScript · Python</p>

            <Link to="/community">
              View Profile
            </Link>
          </article>

          <article className="dashboard-person-card">
            <div className="dashboard-avatar">
              SM
            </div>

            <h3>Sara M.</h3>

            <p>UI Design · Figma</p>

            <Link to="/community">
              View Profile
            </Link>
          </article>

          <article className="dashboard-person-card">
            <div className="dashboard-avatar">
              NA
            </div>

            <h3>Noor A.</h3>

            <p>Photography · Editing</p>

            <Link to="/community">
              View Profile
            </Link>
          </article>
        </div>
      </section>

    </main>
  );
};

export default Dashboard;
