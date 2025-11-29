import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import { 
  Users, Activity, Clock, TrendingUp, 
  UserCheck, AlertCircle
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [sessionsRes, usersRes, requestsRes] = await Promise.all([
        api.get('/sessions/stats'),
        api.get('/users'),
        api.get('/requests'),
      ]);

      setStats({
        sessions: sessionsRes.data,
        users: usersRes.data,
        requests: requestsRes.data,
      });
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const pendingRequests = stats?.requests?.filter(r => r.status === 'pending').length || 0;
  const totalSessions = stats?.sessions?.total?.total_sessions || 0;
  const avgDuration = stats?.sessions?.total?.avg_duration_minutes || 0;
  const activeSessions = stats?.sessions?.total?.active_sessions || 0;

  // Chart data
  const chartLabels = stats?.sessions?.daily?.map(d => d.date)?.reverse() || [];
  const chartData = {
    labels: chartLabels.slice(-14), // Last 14 days
    datasets: [
      {
        label: 'Sessions',
        data: stats?.sessions?.daily?.map(d => d.session_count)?.reverse()?.slice(-14) || [],
        backgroundColor: 'rgba(79, 70, 229, 0.7)',
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Overview of your payment recovery platform</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card stat-users">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats?.users?.length || 0}</span>
            <span className="stat-label">Total Users</span>
          </div>
        </div>

        <div className="stat-card stat-sessions">
          <div className="stat-icon">
            <Activity size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{totalSessions}</span>
            <span className="stat-label">Total Sessions (30d)</span>
          </div>
        </div>

        <div className="stat-card stat-duration">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{Math.round(avgDuration)} min</span>
            <span className="stat-label">Avg Session Duration</span>
          </div>
        </div>

        <div className="stat-card stat-active">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{activeSessions}</span>
            <span className="stat-label">Active Sessions</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Sessions Chart */}
        <div className="dashboard-card chart-card">
          <div className="card-header">
            <h3>Sessions Over Time</h3>
            <span className="badge badge-info">Last 14 days</span>
          </div>
          <div className="chart-container">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Quick Overview</h3>
          </div>
          <div className="quick-stats">
            <div className="quick-stat">
              <UserCheck size={20} />
              <span className="quick-label">Active Users</span>
              <span className="quick-value">{stats?.sessions?.total?.unique_users || 0}</span>
            </div>
            <div className="quick-stat">
              <AlertCircle size={20} />
              <span className="quick-label">Pending Requests</span>
              <span className="quick-value warning">{pendingRequests}</span>
            </div>
          </div>

          {/* Top Users */}
          <div className="top-users">
            <h4>Top Users by Sessions</h4>
            {stats?.sessions?.byUser?.slice(0, 5).map((user, idx) => (
              <div key={idx} className="user-row">
                <span className="user-rank">#{idx + 1}</span>
                <span className="user-name">{user.username || 'Unknown'}</span>
                <span className="user-sessions">{user.session_count} sessions</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
