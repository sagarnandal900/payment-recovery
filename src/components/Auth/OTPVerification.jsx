import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { Shield, Mail, RefreshCw, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import './Login.css';

const OTPVerification = ({ onBack, maskedEmail }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef([]);
  const { verifyOTP, resendOTP } = useAuth();

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits entered
    if (value && index === 5) {
      const fullOtp = newOtp.join('');
      if (fullOtp.length === 6) {
        handleVerify(fullOtp);
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    // Handle paste
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then(text => {
        const digits = text.replace(/\D/g, '').slice(0, 6).split('');
        if (digits.length > 0) {
          const newOtp = [...otp];
          digits.forEach((digit, i) => {
            if (i < 6) newOtp[i] = digit;
          });
          setOtp(newOtp);
          // Focus appropriate input
          const nextIndex = Math.min(digits.length, 5);
          inputRefs.current[nextIndex]?.focus();
          // Auto-submit if 6 digits
          if (digits.length === 6) {
            handleVerify(newOtp.join(''));
          }
        }
      });
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    const digits = text.replace(/\D/g, '').slice(0, 6).split('');
    if (digits.length > 0) {
      const newOtp = ['', '', '', '', '', ''];
      digits.forEach((digit, i) => {
        if (i < 6) newOtp[i] = digit;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(digits.length, 5);
      inputRefs.current[nextIndex]?.focus();
      if (digits.length === 6) {
        handleVerify(newOtp.join(''));
      }
    }
  };

  const handleVerify = async (otpCode) => {
    const code = otpCode || otp.join('');
    if (code.length !== 6) {
      toast.error('Please enter the complete 6-digit code');
      return;
    }

    setLoading(true);
    const result = await verifyOTP(code);
    setLoading(false);

    if (result.success) {
      toast.success('Login successful!');
    } else {
      toast.error(result.error);
      // Clear OTP on error
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    
    setResending(true);
    const result = await resendOTP();
    setResending(false);

    if (result.success) {
      toast.success(result.message || 'New code sent!');
      setCountdown(60); // 60 second cooldown
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <motion.div 
      className="otp-container"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button className="back-btn" onClick={onBack} disabled={loading}>
        <ArrowLeft size={20} />
        <span>Back to Login</span>
      </button>

      <div className="otp-header">
        <div className="otp-icon">
          <Shield size={32} />
        </div>
        <h2>Verify Your Identity</h2>
        <p className="otp-subtitle">
          We've sent a 6-digit verification code to
        </p>
        <div className="email-badge">
          <Mail size={16} />
          <span>{maskedEmail}</span>
        </div>
      </div>

      <div className="otp-input-group">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={`otp-input ${digit ? 'filled' : ''}`}
            disabled={loading}
          />
        ))}
      </div>

      <button 
        className="btn btn-primary verify-btn"
        onClick={() => handleVerify()}
        disabled={loading || otp.join('').length !== 6}
      >
        {loading ? (
          <>
            <Loader2 size={20} className="spinning" />
            <span>Verifying...</span>
          </>
        ) : (
          <>
            <CheckCircle size={20} />
            <span>Verify & Login</span>
          </>
        )}
      </button>

      <div className="resend-section">
        <p>Didn't receive the code?</p>
        <button 
          className="resend-btn"
          onClick={handleResend}
          disabled={resending || countdown > 0}
        >
          {resending ? (
            <>
              <Loader2 size={16} className="spinning" />
              <span>Sending...</span>
            </>
          ) : countdown > 0 ? (
            <span>Resend in {countdown}s</span>
          ) : (
            <>
              <RefreshCw size={16} />
              <span>Resend Code</span>
            </>
          )}
        </button>
      </div>

      <div className="otp-info">
        <p>💡 Check your spam folder if you don't see the email</p>
        <p>🔒 The code expires in 10 minutes</p>
      </div>
    </motion.div>
  );
};

export default OTPVerification;
