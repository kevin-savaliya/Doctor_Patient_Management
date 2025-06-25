import React, { useState } from 'react';
import './loginpage.scss';
import doctor from '../../Assets/Images/doctor.jpg';
import { useNavigate } from 'react-router-dom';
import mediclogogreen from '../../Assets/Logo/medic_teal_text.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

      const response = await fetch('https://hospital-management-epar.onrender.com/api/auth/doctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const result = await response.json();

      if (response.ok && result.success) {
        localStorage.setItem('token', result.data.token);

        toast.success('Login successful!', {
          position: 'top-right',
          autoClose: 3000,
        });

        setEmail('');
        setPassword('');
        setError('');

        setTimeout(() => {
          navigate('/homepage', { replace: true }); // Replace login with homepage in history
        }, 1000);
      } else {
        setError(result.message || 'Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.name === 'AbortError') {
        setError('Request timed out. Please try again.');
      } else {
        setError('Failed to connect to server. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="image-section">
          <img src={doctor} alt="doctor" />
        </div>
        <div className="form-section">
          <div className="logo">
            <img src={mediclogogreen} alt="medic-logo" />
          </div>
          <h3>Login</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className={`eye-icon ${showPassword ? 'visible' : ''}`}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEye color="#08ab99" /> : <FaEyeSlash color="gray" />}
              </span>
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
