import { useContext, useState } from 'react';

import { useNavigate } from 'react-router';

import { signUp } from '../../services/authService';

import { UserContext } from '../../contexts/UserContext';

const SignUpForm = () => {
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConf: '',
  });

  const { name, email, password, passwordConf } = formData;

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
      const newUser = await signUp(formData);

      setUser(newUser);

      navigate('/');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const isFormInvalid = () => {
    return !(
      name &&
      email &&
      password &&
      password === passwordConf
    );
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
          <h1>Create Account</h1>

          <p className="auth-subtitle">
            Join Skill Swap and start sharing your skills.
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
              <label htmlFor="name">Name</label>

              <input
                type="text"
                id="name"
                value={name}
                name="name"
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>

              <input
                type="email"
                id="email"
                value={email}
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
                id="password"
                value={password}
                name="password"
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm">Confirm Password</label>

              <input
                type="password"
                id="confirm"
                value={passwordConf}
                name="passwordConf"
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>

            <button
              className="auth-primary-button"
              type="submit"
              disabled={isFormInvalid()}
            >
              Sign Up
            </button>

            <p className="auth-switch">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/sign-in')}
              >
                Login
              </button>
            </p>
          </form>
        </div>

      </section>
    </main>
  );
};

export default SignUpForm;