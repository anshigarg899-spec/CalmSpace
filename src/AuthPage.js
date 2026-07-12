import React, { useState } from 'react';
import './AuthPage.css';

function AuthPage({ setUser }) {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      agree: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now just simulate login
    if (!formData.email || !formData.password || (isRegister && (!formData.firstName || !formData.lastName || !formData.agree))) {
      alert('Please fill in all required fields.');
      return;
    }

    // Simulate login success
    const user = {
      name: isRegister ? `${formData.firstName} ${formData.lastName}` : 'User',
      email: formData.email,
    };

    setUser(user);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isRegister ? 'Create Account' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          {isRegister && (
            <div className="checkbox-container">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
              />
              <label>I agree to the Terms & Conditions</label>
            </div>
          )}
          <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
        </form>

        <div className="divider">or</div>

        <div className="social-buttons">
          <button className="google-btn">Sign in with Google</button>
          <button className="apple-btn">Sign in with Apple</button>
        </div>

        <p>
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span onClick={toggleForm}>
            {isRegister ? 'Login' : 'Register'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
