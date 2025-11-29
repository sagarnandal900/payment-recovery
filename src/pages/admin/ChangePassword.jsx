import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Save, RefreshCw, Shield } from 'lucide-react';
import api from '../../config/api';
import toast from 'react-hot-toast';
import './ChangePassword.css';

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setLoading(true);
    try {
      await api.post('/auth/change-password', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      
      toast.success('Password changed successfully!');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-password-page">
      <div className="page-header">
        <h1>
          <Lock size={28} />
          Change Password
        </h1>
        <p>Update your account password</p>
      </div>

      <div className="password-container">
        <div className="card password-card">
          <div className="card-icon">
            <Shield size={40} />
          </div>
          <h2>Security Update</h2>
          <p className="card-description">
            Choose a strong password with a mix of letters, numbers, and symbols.
            Your password should be at least 6 characters long.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                <Lock size={16} />
                Current Password
              </label>
              <div className="password-input">
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Enter your current password"
                  className={errors.currentPassword ? 'error' : ''}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => togglePasswordVisibility('current')}
                >
                  {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.currentPassword && <span className="error-message">{errors.currentPassword}</span>}
            </div>

            <div className="form-group">
              <label>
                <Lock size={16} />
                New Password
              </label>
              <div className="password-input">
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter your new password"
                  className={errors.newPassword ? 'error' : ''}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => togglePasswordVisibility('new')}
                >
                  {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
            </div>

            <div className="form-group">
              <label>
                <Lock size={16} />
                Confirm New Password
              </label>
              <div className="password-input">
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your new password"
                  className={errors.confirmPassword ? 'error' : ''}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => togglePasswordVisibility('confirm')}
                >
                  {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? <RefreshCw className="spin" size={18} /> : <Save size={18} />}
              {loading ? 'Updating Password...' : 'Update Password'}
            </button>
          </form>
        </div>

        <div className="password-tips">
          <h3>Password Tips</h3>
          <ul>
            <li>Use at least 8 characters</li>
            <li>Include uppercase and lowercase letters</li>
            <li>Add numbers and special characters</li>
            <li>Avoid using personal information</li>
            <li>Don't reuse passwords from other accounts</li>
            <li>Consider using a password manager</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
