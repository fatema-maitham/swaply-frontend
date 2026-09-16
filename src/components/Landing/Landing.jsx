import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getSkills } from '../../services/skillService';
const Landing = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const data = await getSkills();
        setSkills(data || []);
      } catch (err) {
        console.log(err);
      }
    };

    loadSkills();
  }, []);

  const popularSkills = skills.slice(0, 4);

  return (
    <main className="home-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero-content">
          <p className="home-eyebrow">LEARN · TEACH · GROW</p>

          <h1>
            Learn.
            <br />
            Teach.
            <br />
            Swap.
            <br />
            <span>Grow Together.</span>
          </h1>

          <p className="home-hero-description">
            Exchange skills, meet new people, and build a brighter you.
          </p>

          <div className="home-hero-actions">
            <Link to="/skills" className="home-primary-button">
              Browse Skills
            </Link>

            <Link to="/sign-up" className="home-secondary-button">
              Get Started
            </Link>
          </div>
        </div>

        <div className="home-hero-visual">
          <div className="hero-image-area">
            <img
              src="/hero.png"
              alt="Swaply community members"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="home-how-it-works">
        <div className="home-section-heading">
          <p className="home-eyebrow">HOW IT WORKS</p>

          <h2>Swap skills in three simple steps.</h2>

          <p>
            Find people who have the skills you want and offer the skills you
            already know.
          </p>
        </div>

        <div className="home-steps">
          <article className="home-step">
            <div className="home-step-top">
              <span className="home-step-number">01</span>
              <span className="home-step-line"></span>
            </div>

            <div className="home-step-content">
              <h3>Find a Skill</h3>

              <p>
                Explore skills from people in the Swaply community and find
                something you want to learn.
              </p>
            </div>
          </article>

          <article className="home-step">
            <div className="home-step-top">
              <span className="home-step-number">02</span>
              <span className="home-step-line"></span>
            </div>

            <div className="home-step-content">
              <h3>Offer Your Skill</h3>

              <p>
                Share your knowledge by adding a skill you can teach to other
                members.
              </p>
            </div>
          </article>

          <article className="home-step">
            <div className="home-step-top">
              <span className="home-step-number">03</span>
            </div>

            <div className="home-step-content">
              <h3>Start Swapping</h3>

              <p>
                Send a swap request, connect with another learner, and start
                exchanging knowledge.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Popular Skills */}
      <section className="home-popular-skills">
        <div className="home-section-heading home-popular-heading">
          <div>
            <p className="home-eyebrow">EXPLORE</p>
            <h2>Popular Skills</h2>
          </div>

          <Link to="/skills" className="home-view-all">
            View all skills
          </Link>
        </div>

        <div className="home-skill-preview-grid">
          {popularSkills.map((skill) => (
            <article
              className="home-skill-preview"
              key={skill._id}
            >
              <span className="home-skill-category">
                {skill.category?.toUpperCase()}
              </span>

              <h3>{skill.name}</h3>

              <p>
                {skill.description}
              </p>
            </article>
          ))}
        </div>

        {!skills.length && (
          <p className="home-skill-empty">
            No skills available yet.
          </p>
        )}
      </section>

      {/* Community CTA */}
      <section className="home-community">
        <div className="home-community-content">
          <p className="home-eyebrow">JOIN THE COMMUNITY</p>

          <h2>
            Your next skill could
            <span> one swap away.</span>
          </h2>

          <p>
            Join Swaply, meet people with different skills, and turn knowledge
            into meaningful connections.
          </p>

          <Link to="/sign-up" className="home-primary-button">
            Get Started
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Landing;