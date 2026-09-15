import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-main">

          <div className="footer-column">
            <h3>Explore</h3>

            <Link to="/">Home</Link>
            <Link to="/skills">Skills</Link>
            <Link to="/community">Community</Link>
          </div>

          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src="/logo.png" alt="Swaply" />
            </Link>

            <p>
              Learn, teach, and grow together by exchanging skills with others.
            </p>

            <div className="footer-socials">
  <a href="#" aria-label="Instagram">
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  </a>

  <a href="#" aria-label="LinkedIn">
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M6 9v9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="6" cy="5.5" r="1.25" fill="currentColor" />
      <path
        d="M10 18v-5a4 4 0 0 1 8 0v5M10 9v9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </a>

  <a href="#" aria-label="GitHub">
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 3a9 9 0 0 0-2.84 17.54c.45.08.62-.2.62-.44v-1.55c-2.52.55-3.05-1.07-3.05-1.07-.41-1.05-1-1.33-1-1.33-.82-.56.06-.55.06-.55.91.07 1.39.94 1.39.94.8 1.38 2.1.98 2.61.75.08-.58.31-.98.57-1.2-2.01-.23-4.13-1-4.13-4.48 0-.99.35-1.8.94-2.43-.09-.23-.41-1.15.09-2.4 0 0 .77-.25 2.48.93a8.6 8.6 0 0 1 4.52 0c1.71-1.18 2.48-.93 2.48-.93.5 1.25.18 2.17.09 2.4.59.63.94 1.44.94 2.43 0 3.49-2.12 4.25-4.14 4.47.32.28.61.83.61 1.68v2.49c0 .24.16.52.62.44A9 9 0 0 0 12 3Z"
        fill="currentColor"
      />
    </svg>
  </a>
</div>
          </div>

          <div className="footer-column">
            <h3>Start</h3>

            <Link to="/sign-up">Sign Up</Link>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/skills">Browse Skills</Link>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© 2026 Swaply. All rights reserved.</p>

          <p>LEARN · TEACH · GROW</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;