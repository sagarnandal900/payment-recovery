import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Mail, Server, Save, TestTube, RefreshCw, CheckCircle, KeyRound, Info } from 'lucide-react';
import api from '../../config/api';
import toast from 'react-hot-toast';
import './Settings.css';

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [settings, setSettings] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUser: '',
    smtpPass: '',
    smtpSecure: false
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await api.get('/settings');
      if (response.data) {
        setSettings(prev => ({ ...prev, ...response.data }));
      }
    } catch (error) {
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/settings', settings);
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleTestEmail = async () => {
    if (!testEmail) {
      toast.error('Please enter a test email address');
      return;
    }
    
    setTesting(true);
    try {
      await api.post('/settings/test-email', { email: testEmail });
      toast.success('Test email sent successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send test email');
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-state">
        <RefreshCw className="spin" size={32} />
        <p>Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>
          <SettingsIcon size={28} />
          Settings
        </h1>
        <p>Configure email and system settings</p>
      </div>

      <form onSubmit={handleSave}>
        <div className="settings-grid">
          {/* SMTP Settings */}
          <div className="card settings-card">
            <div className="card-header">
              <Mail size={20} />
              <h3>Gmail SMTP Configuration</h3>
            </div>
            <p className="card-description">
              Configure Gmail to send OTP verification emails, welcome emails, and notifications to users.
            </p>

            <div className="gmail-setup-info">
              <div className="info-header">
                <Info size={18} />
                <span>How to set up Gmail SMTP</span>
              </div>
              <ol className="setup-steps">
                <li>Go to your <a href="https://myaccount.google.com/security" target="_blank" rel="noopener noreferrer">Google Account Security</a></li>
                <li>Enable <strong>2-Step Verification</strong> if not already enabled</li>
                <li>Go to <strong>App passwords</strong> (search "App passwords" in Google Account)</li>
                <li>Select app: <strong>Mail</strong>, Select device: <strong>Other</strong> (enter "Payment Recovery Kit")</li>
                <li>Click <strong>Generate</strong> and copy the 16-character password</li>
                <li>Paste that password below in the "App Password" field</li>
              </ol>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>
                  <Server size={16} />
                  SMTP Host
                </label>
                <input
                  type="text"
                  name="smtpHost"
                  value={settings.smtpHost}
                  onChange={handleChange}
                  placeholder="smtp.gmail.com"
                  className="readonly-hint"
                />
                <span className="field-hint">Keep default for Gmail</span>
              </div>

              <div className="form-group">
                <label>
                  <Server size={16} />
                  SMTP Port
                </label>
                <input
                  type="text"
                  name="smtpPort"
                  value={settings.smtpPort}
                  onChange={handleChange}
                  placeholder="587"
                />
                <span className="field-hint">587 for TLS (recommended)</span>
              </div>

              <div className="form-group full-width">
                <label>
                  <Mail size={16} />
                  Your Gmail Address
                </label>
                <input
                  type="email"
                  name="smtpUser"
                  value={settings.smtpUser}
                  onChange={handleChange}
                  placeholder="your-email@gmail.com"
                />
                <span className="field-hint">This Gmail will be used to send all emails</span>
              </div>

              <div className="form-group full-width">
                <label>
                  <KeyRound size={16} />
                  Gmail App Password
                </label>
                <input
                  type="password"
                  name="smtpPass"
                  value={settings.smtpPass}
                  onChange={handleChange}
                  placeholder="xxxx xxxx xxxx xxxx"
                />
                <span className="field-hint">16-character app password from Google (NOT your regular Gmail password)</span>
              </div>

              <div className="form-group checkbox-group full-width">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="smtpSecure"
                    checked={settings.smtpSecure}
                    onChange={handleChange}
                  />
                  <span className="checkbox-custom"></span>
                  Use SSL (port 465) instead of TLS (port 587)
                </label>
              </div>
            </div>
          </div>

          {/* Test Email */}
          <div className="card settings-card">
            <div className="card-header">
              <TestTube size={20} />
              <h3>Test Email Configuration</h3>
            </div>
            <p className="card-description">
              Send a test email to verify your Gmail settings are working correctly
            </p>

            <div className="test-email-section">
              <div className="form-group">
                <label>
                  <Mail size={16} />
                  Send Test Email To
                </label>
                <input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="Enter email to receive test"
                />
              </div>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleTestEmail}
                disabled={testing}
              >
                {testing ? <RefreshCw className="spin" size={16} /> : <TestTube size={16} />}
                {testing ? 'Sending...' : 'Send Test Email'}
              </button>
            </div>

            <div className="smtp-tips success-tips">
              <h4><CheckCircle size={16} /> Once configured:</h4>
              <ul>
                <li>OTP verification codes will be sent when users login</li>
                <li>Welcome emails sent when you create new users</li>
                <li>All emails will come from your Gmail address</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary btn-lg" disabled={saving}>
            {saving ? <RefreshCw className="spin" size={18} /> : <Save size={18} />}
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
