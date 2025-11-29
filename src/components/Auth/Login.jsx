import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { LogIn, User, Lock, Eye, EyeOff, Mail } from 'lucide-react';
import OTPVerification from './OTPVerification';
import './Login.css';

const Login = ({ isAdmin = false }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [maskedEmail, setMaskedEmail] = useState('');
  
  const { login, isAuthenticated, isAdmin: userIsAdmin, pendingOTP, cancelOTP } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin && userIsAdmin) {
        navigate('/admin');
      } else if (!isAdmin) {
        const from = location.state?.from?.pathname || '/';
        navigate(from);
      }
    }
  }, [isAuthenticated, isAdmin, userIsAdmin, navigate, location]);

  // Show OTP screen if there's a pending verification
  React.useEffect(() => {
    if (pendingOTP) {
      setShowOTP(true);
      setMaskedEmail(pendingOTP.maskedEmail);
    }
  }, [pendingOTP]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Please enter username and password');
      return;
    }

    setLoading(true);
    const result = await login(username, password, isAdmin);
    setLoading(false);

    if (result.success) {
      if (result.requiresOTP) {
        // Show OTP verification screen
        setShowOTP(true);
        setMaskedEmail(result.maskedEmail);
        toast.success('Verification code sent to your email!');
      } else {
        // Direct login success (admin or SMTP not configured)
        toast.success('Login successful!');
        
        // Show warning if SMTP is not configured
        if (result.warning) {
          setTimeout(() => {
            toast('⚠️ Email verification is disabled. Contact admin.', {
              icon: '⚠️',
              duration: 5000
            });
          }, 500);
        }
        
        if (isAdmin) {
          navigate('/admin');
        } else {
          const from = location.state?.from?.pathname || '/';
          navigate(from);
        }
      }
    } else {
      toast.error(result.error);
    }
  };

  const handleBackFromOTP = () => {
    setShowOTP(false);
    setUsername('');
    setPassword('');
    cancelOTP();
  };

  // Show OTP verification screen
  if (showOTP && !isAdmin) {
    return (
      <div className="login-page">
        <motion.div 
          className="login-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="login-card otp-card">
            <OTPVerification 
              onBack={handleBackFromOTP} 
              maskedEmail={maskedEmail}
            />
          </div>

          <div className="login-decoration">
            <div className="decoration-circle circle-1"></div>
            <div className="decoration-circle circle-2"></div>
            <div className="decoration-circle circle-3"></div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <motion.div 
        className="login-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">
              {isAdmin ? '🛡️' : '💼'}
            </div>
            <h1>{isAdmin ? 'Admin Portal' : 'Payment Recovery Kit'}</h1>
            <p>{isAdmin ? 'Admin access required' : 'Sign in to access your training materials'}</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label">Username</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary login-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-small"></span>
              ) : (
                <>
                  <LogIn size={20} />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {!isAdmin && (
            <div className="login-info-box">
              <Mail size={18} />
              <p>A verification code will be sent to your registered email for secure login.</p>
            </div>
          )}

          {!isAdmin && (
            <div className="login-footer">
              <p>Don't have access?</p>
              <Link to="/request-access" className="request-link">
                Request Access →
              </Link>
            </div>
          )}

          {isAdmin && (
            <div className="login-footer">
              <Link to="/login" className="back-link">
                ← Back to Client Login
              </Link>
            </div>
          )}
        </div>

        <div className="login-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
