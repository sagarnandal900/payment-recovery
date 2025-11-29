import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../config/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  // OTP verification state
  const [pendingOTP, setPendingOTP] = useState(null);

  // Set auth header when token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const response = await api.get('/auth/me');
          if (response.data.user) {
            setUser(response.data.user);
            setToken(storedToken);
          } else {
            localStorage.removeItem('token');
            setToken(null);
          }
        } catch (error) {
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  // Step 1: Login - sends OTP to email (or direct login if SMTP not configured)
  const login = async (username, password, isAdmin = false) => {
    try {
      const endpoint = isAdmin ? '/auth/admin/login' : '/auth/login';
      const response = await api.post(endpoint, { username, password });
      
      // Admin login doesn't require OTP
      if (isAdmin) {
        setToken(response.data.token);
        setUser(response.data.user);
        return { success: true };
      }
      
      // Client login requires OTP verification
      if (response.data.requiresOTP) {
        setPendingOTP({
          userId: response.data.userId,
          maskedEmail: response.data.maskedEmail
        });
        return { 
          success: true, 
          requiresOTP: true, 
          message: response.data.message,
          maskedEmail: response.data.maskedEmail
        };
      }
      
      // Direct login (SMTP not configured - no OTP required)
      if (response.data.token) {
        setToken(response.data.token);
        setUser(response.data.user);
        return { 
          success: true,
          warning: response.data.warning // Pass warning to show user
        };
      }
      
      return { success: false, error: 'Unexpected response from server' };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed' 
      };
    }
  };

  // Step 2: Verify OTP
  const verifyOTP = async (otp) => {
    try {
      if (!pendingOTP) {
        return { success: false, error: 'No pending verification. Please login again.' };
      }

      const response = await api.post('/auth/verify-otp', { 
        userId: pendingOTP.userId, 
        otp 
      });
      
      setToken(response.data.token);
      setUser(response.data.user);
      setPendingOTP(null);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Verification failed' 
      };
    }
  };

  // Resend OTP
  const resendOTP = async () => {
    try {
      if (!pendingOTP) {
        return { success: false, error: 'No pending verification. Please login again.' };
      }

      const response = await api.post('/auth/resend-otp', { 
        userId: pendingOTP.userId 
      });
      
      return { 
        success: true, 
        message: response.data.message,
        maskedEmail: response.data.maskedEmail
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to resend code' 
      };
    }
  };

  // Cancel OTP verification
  const cancelOTP = () => {
    setPendingOTP(null);
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Continue with logout even if API call fails
    }
    setToken(null);
    setUser(null);
    setPendingOTP(null);
    localStorage.removeItem('token');
  };

  const changePassword = async (oldPassword, newPassword) => {
    try {
      await api.post('/auth/change-password', { oldPassword, newPassword });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Password change failed' 
      };
    }
  };

  const requestAccess = async (name, email, phone, reason) => {
    try {
      const response = await api.post('/auth/request-access', { name, email, phone, reason });
      return { success: true, message: response.data.message };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Request failed' 
      };
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
    pendingOTP,
    login,
    verifyOTP,
    resendOTP,
    cancelOTP,
    logout,
    changePassword,
    requestAccess
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
