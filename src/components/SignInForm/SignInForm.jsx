import { useState, useContext } from 'react';

import { useNavigate } from 'react-router';

import { Eye, EyeOff } from 'lucide-react';

import { signIn } from '../../services/authService';

import { UserContext } from '../../contexts/UserContext';

import '../../Auth.css';

const SignInForm = () => {
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    email:
      localStorage.getItem('rememberedEmail') || '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem('rememberMe') === 'true'
  );

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

  const handleRememberMe = (evt) => {
    const checked = evt.target.checked;

    setRememberMe(checked);

    if (checked) {
      localStorage.setItem('rememberMe', 'true');

      if (formData.email) {
        localStorage.setItem(
          'rememberedEmail',
          formData.email
        );
      }
    } else {
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('rememberedEmail');
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const signedInUser = await signIn(
        formData,
        rememberMe
      );

      if (rememberMe) {
        localStorage.setItem(
          'rememberMe',
          'true'
        );

        localStorage.setItem(
          'rememberedEmail',
          formData.email
        );
      } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('rememberedEmail');
      }

      setUser(signedInUser);

      if (signedInUser.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
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

            <h1>
              Welcome Back
            </h1>

            <p>
              Sign in to continue your skill exchange journey.
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

              <div className="form-group">

                <label htmlFor="email">
                  Email
                </label>

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
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="off"
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

              <div className="auth-options">

                <label className="remember-me">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={handleRememberMe}
                  />

                  <span>
                    Remember me
                  </span>

                </label>

                <button
                  type="button"
                  className="forgot-password"
                  onClick={() =>
                    navigate('/forgot-password')
                  }
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
                  onClick={() =>
                    navigate('/sign-up')
                  }
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