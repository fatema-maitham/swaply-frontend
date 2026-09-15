import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signIn } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';
import '../../Auth.css';

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

        <div className="auth-left">
          <img
            src="/logoW.png"
            alt="Skill Swap"
            className="auth-logo"
          />

          <div className="auth-left-content">
            <h1>Welcome Back</h1>

            <p>
              Sign in to continue your skill exchange journey.
            </p>
          </div>

          <img
            src="/bgcolor.png"
            alt=""
            className="auth-decoration"
          />
        </div>

        <div className="auth-right">
          <div className="auth-form-content">

            {message && (
              <p className="auth-message">
                {message}
              </p>
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
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="off"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>

                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="off"
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
                  Forgot password?
                </button>
              </div>

              <button
                className="auth-primary-button"
                type="submit"
                disabled={isFormInvalid()}
              >
                Sign In
              </button>

              <p className="auth-switch">
                Don’t have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/sign-up')}
                >
                  Sign Up
                </button>
              </p>
            </form>
          </div>
        </div>

      </section>
    </main>
  );
};

export default SignInForm;
