import { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';

import { getSkills } from '../../services/skillService';
import { getReviews } from '../../services/reviewService';
import { getSwaps } from '../../services/swapService';
import { getUsers } from '../../services/userService';

const Dashboard = () => {
  const { user } = useContext(UserContext);

  const [skills, setSkills] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [swaps, setSwaps] = useState([]);
  const [users, setUsers] = useState([]);

  const getUserId = (userData) => {
    if (!userData) return null;

    if (typeof userData === 'object') {
      return userData._id || userData.id || null;
    }

    return userData;
  };

  const getSkillData = (skillData) => {
    if (!skillData) return null;

    if (typeof skillData === 'object') {
      return skillData;
    }

    return (
      skills.find(
        (skill) =>
          String(skill._id) === String(skillData)
      ) || null
    );
  };

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [skillsData, reviewsData] =
          await Promise.all([
            getSkills(),
            getReviews(),
          ]);

        setSkills(skillsData.slice(0, 4));
        setReviews(reviewsData);
      } catch (err) {
        console.error(
          'Failed to load skills and reviews:',
          err
        );

        setSkills([]);
        setReviews([]);
      }
    };

    loadDashboardData();
  }, []);

  const getAverageRating = (skill) => {
    const skillId = String(skill._id);

    const skillReviews = reviews.filter((review) => {
      const reviewSkillId = String(
        review.skill?._id || review.skill
      );

      return reviewSkillId === skillId;
    });

    if (skillReviews.length === 0) {
      return null;
    }

    const totalRating = skillReviews.reduce(
      (total, review) =>
        total + Number(review.rating),
      0
    );

    return totalRating / skillReviews.length;
  };

  useEffect(() => {
    const loadSwaps = async () => {
      try {
        const data = await getSwaps();

        const sortedSwaps = [...data].sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );

        setSwaps(sortedSwaps.slice(0, 3));
      } catch (err) {
        setSwaps([]);
      }
    };

    loadSwaps();
  }, []);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getUsers();

        const currentUserId = getUserId(user);

        const otherUsers = data.filter(
          (userData) =>
            String(userData._id) !==
            String(currentUserId)
        );

        setUsers(otherUsers.slice(0, 3));
      } catch (err) {
        setUsers([]);
      }
    };

    loadUsers();
  }, [user]);

  return (
    <main className="dashboard-page">

      {/* Welcome */}

      <section className="dashboard-welcome">

        <div>

          <p className="dashboard-eyebrow">
            WELCOME BACK
          </p>

          <h1>
            Welcome back, {user?.name}!
          </h1>

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

            <p className="dashboard-eyebrow">
              YOUR ACTIVITY
            </p>

            <h2>
              Overview
            </h2>

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

            <p className="dashboard-eyebrow">
              EXPLORE
            </p>

            <h2>
              Skills You Might Like
            </h2>

          </div>

          <Link
            to="/skills"
            className="dashboard-view-all"
          >
            View All
          </Link>

        </div>

        <div className="dashboard-skill-grid">

          {skills.map((skill) => {

            const averageRating =
              getAverageRating(skill);

            const displayRating =
              averageRating !== null
                ? Number.isInteger(averageRating)
                  ? averageRating
                  : averageRating.toFixed(1)
                : null;

            return (
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
                      {skill.name
                        ?.slice(0, 2)
                        .toUpperCase()}
                    </div>
                  )}

                </div>

                <span>
                  {skill.category?.toUpperCase()}
                </span>

                <h3>
                  {skill.name}
                </h3>

                <p>
                  By {skill.owner?.name || 'Unknown'}
                </p>

                <div className="dashboard-skill-bottom">

                  {displayRating !== null && (
                    <strong>
                      ★ {displayRating}/5
                    </strong>
                  )}

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
          })}

        </div>

      </section>


      {/* Recent Swaps */}

      <section className="dashboard-section">

        <div className="dashboard-section-heading dashboard-heading-row">

          <div>

            <p className="dashboard-eyebrow">
              YOUR ACTIVITY
            </p>

            <h2>
              Your Recent Swaps
            </h2>

          </div>

          <Link
            to="/swaps"
            className="dashboard-view-all"
          >
            View All
          </Link>

        </div>

        <div className="dashboard-swaps">

          {swaps.length === 0 ? (

            <div className="dashboard-empty-swaps">

              <p>
                No swaps yet.
              </p>

              <Link to="/skills">
                Find a Skill
              </Link>

            </div>

          ) : (

            swaps.map((swap) => {

              const currentUserId =
                getUserId(user);

              const requesterId =
                getUserId(swap.requester);

              const isRequester =
                String(requesterId) ===
                String(currentUserId);

              const otherUser = isRequester
                ? swap.receiver
                : swap.requester;

              const skillData = isRequester
                ? swap.skillRequested
                : swap.skillOffered;

              const skill =
                getSkillData(skillData);

              return (
                <article
                  key={swap._id}
                  className="dashboard-swap-row"
                >

                  <div className="dashboard-swap-content">

                    <div className="dashboard-swap-image">

                      {skill?.skillImage ? (
                        <img
                          src={skill.skillImage}
                          alt={skill.name}
                        />
                      ) : (
                        <div className="dashboard-swap-image-placeholder">
                          {skill?.name
                            ?.slice(0, 2)
                            .toUpperCase() || 'SK'}
                        </div>
                      )}

                    </div>

                    <div className="dashboard-swap-text">

                      {skill?._id ? (

                        <h3>

                          <Link
                            to={`/skills/${skill._id}`}
                          >
                            {skill.name}
                          </Link>

                        </h3>

                      ) : (

                        <h3>
                          {skill?.name || 'Unknown Skill'}
                        </h3>

                      )}

                      <p>
                        With {otherUser?.name || 'Unknown User'}
                      </p>

                    </div>

                  </div>

                  <span
                    className={`dashboard-status ${swap.status}`}
                  >
                    {swap.status}
                  </span>

                </article>
              );
            })

          )}

        </div>

      </section>


      {/* Community */}

      <section className="dashboard-section">

        <div className="dashboard-section-heading dashboard-heading-row">

          <div>

            <p className="dashboard-eyebrow">
              COMMUNITY
            </p>

            <h2>
              People You Might Learn From
            </h2>

          </div>

          <Link
            to="/community"
            className="dashboard-view-all"
          >
            View Community
          </Link>

        </div>

        <div className="dashboard-community-grid">

          {users.length === 0 ? (

            <div className="dashboard-community-empty">

              <p>
                No other users yet.
              </p>

            </div>

          ) : (

            users.map((communityUser) => (

              <article
                key={communityUser._id}
                className="dashboard-person-card"
              >

                {/* PROFILE IMAGE */}

                <div className="dashboard-avatar">

                  <img
                    src={
                      communityUser.profileImage ||
                      '/default-profile.png'
                    }
                    alt={`${communityUser.name} profile`}
                    onError={(event) => {
                      event.currentTarget.src =
                        '/default-profile.png';
                    }}
                  />

                </div>


                {/* NAME */}

                <h3>
                  {communityUser.name}
                </h3>


                {/* BIO */}

                <p>
                  {communityUser.bio ||
                    'Skill Swap Member'}
                </p>


                {/* PROFILE LINK */}

                <Link
                  to={`/users/${communityUser._id}`}
                >
                  View Profile
                </Link>

              </article>

            ))

          )}

        </div>

      </section>

    </main>
  );
};

export default Dashboard;