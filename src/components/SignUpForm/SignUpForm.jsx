import { useState, useContext } from 'react';

import { useNavigate } from 'react-router';

import { Eye, EyeOff } from 'lucide-react';

import { signUp } from '../../services/authService';

import { UserContext } from '../../contexts/UserContext';

import '../../Auth.css';

const SignUpForm = () => {
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConf: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const {
    firstName,
    lastName,
    email,
    password,
    passwordConf,
  } = formData;

  const handleChange = (evt) => {
    setMessage('');

    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (password !== passwordConf) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const name = `${firstName.trim()} ${lastName.trim()}`;

      const signupData = {
        name,
        email,
        password,
      };

      const newUser = await signUp(signupData);

      setUser(newUser);

      navigate('/');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const isFormInvalid = () => {
    return !(
      firstName &&
      lastName &&
      email &&
      password &&
      passwordConf &&
      password === passwordConf
    );
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
            <h1>Join Skill Swap</h1>

            <p>
              Create an account and start learning,
              teaching, and growing together.
            </p>
          </div>

          <img
            src="/bgC.png"
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
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">
                    First Name
                  </label>

                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">
                    Last Name
                  </label>

                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  Password
                </label>

                <div className="password-input-wrapper">
                  <input
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                  />

                  <button
                    type="button"
                    className="password-eye"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    aria-label={
                      showPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="passwordConf">
                  Confirm Password
                </label>

                <div className="password-input-wrapper">
                  <input
                    type={
                      showConfirmPassword
                        ? 'text'
                        : 'password'
                    }
                    id="passwordConf"
                    name="passwordConf"
                    value={passwordConf}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                  />

                  <button
                    type="button"
                    className="password-eye"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    aria-label={
                      showConfirmPassword
                        ? 'Hide confirm password'
                        : 'Show confirm password'
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
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
                  onClick={() =>
                    navigate('/sign-in')
                  }
                >
                  Sign In
                </button>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignUpForm;