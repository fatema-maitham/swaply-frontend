import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';

import { signIn } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';

const SignInForm = () => {
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (evt) => {
    setMessage('');

    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const isFormInvalid = () => {
    return !formData.email || !formData.password;
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const signedInUser = await signIn(formData);

      setUser(signedInUser);

      navigate('/dashboard');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">

        <div className="auth-image">
          <img
            src="/login-banner.jpeg"
            alt="Skill Swap"
          />
        </div>

        <div className="auth-form-section">
          <h1>Login</h1>

          <p className="auth-subtitle">
            Welcome back! Login to continue swapping skills.
          </p>

          {message && (
            <p className="auth-message">{message}</p>
          )}

          <form
            className="auth-form"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="email">Email</label>

              <input
                type="email"
                autoComplete="off"
                id="email"
                value={formData.email}
                name="email"
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>

              <input
                type="password"
                autoComplete="off"
                id="password"
                value={formData.password}
                name="password"
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="auth-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="forgot-password"
              >
                Forgot password
              </button>
            </div>

            <button
              className="auth-primary-button"
              type="submit"
              disabled={isFormInvalid()}
            >
              Login
            </button>

            <p className="auth-switch">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/sign-up')}
              >
                Sign up
              </button>
            </p>
          </form>
        </div>

      </section>
    </main>
  );
};

export default SignInForm;
