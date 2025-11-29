import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { UserPlus, Mail, Phone, FileText, ArrowLeft, User } from 'lucide-react';
import './RequestAccess.css';

const RequestAccess = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const { requestAccess } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error('Name and email are required');
      return;
    }

    setLoading(true);
    const result = await requestAccess(formData.name, formData.email, formData.phone, formData.reason);
    setLoading(false);

    if (result.success) {
      toast.success('Request submitted successfully!');
      setSubmitted(true);
    } else {
      toast.error(result.error);
    }
  };

  if (submitted) {
    return (
      <div className="login-page" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' }}>
        <motion.div 
          className="login-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="login-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✅</div>
            <h1 style={{ marginBottom: '16px' }}>Request Submitted!</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Thank you for your interest. We will review your request and contact you shortly.
            </p>
            <Link to="/login" className="btn btn-primary" style={{ display: 'inline-flex' }}>
              <ArrowLeft size={20} />
              <span>Back to Login</span>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="login-page" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' }}>
      <motion.div 
        className="login-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">📝</div>
            <h1>Request Access</h1>
            <p>Fill out the form to request access to the training kit</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <div className="input-wrapper">
                <User size={20} className="input-icon" />
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{ paddingLeft: '46px' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <div className="input-wrapper">
                <Mail size={20} className="input-icon" />
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ paddingLeft: '46px' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <div className="input-wrapper">
                <Phone size={20} className="input-icon" />
                <input
                  type="tel"
                  name="phone"
                  className="form-input"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{ paddingLeft: '46px' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Reason for Access</label>
              <div className="input-wrapper">
                <FileText size={20} className="input-icon" style={{ top: '14px' }} />
                <textarea
                  name="reason"
                  className="form-input"
                  placeholder="Why do you need access to this training kit?"
                  value={formData.reason}
                  onChange={handleChange}
                  rows={3}
                  style={{ paddingLeft: '46px', resize: 'vertical' }}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary login-btn"
              disabled={loading}
              style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' }}
            >
              {loading ? (
                <span className="spinner-small"></span>
              ) : (
                <>
                  <UserPlus size={20} />
                  <span>Submit Request</span>
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <Link to="/login" className="back-link">
              <ArrowLeft size={16} style={{ marginRight: '4px' }} />
              Back to Login
            </Link>
          </div>
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

export default RequestAccess;
