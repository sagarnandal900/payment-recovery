import React, { useState, useEffect, useCallback } from 'react';
import api from '../../config/api';
import { 
  BarChart3, Calendar, Download, RefreshCw, Clock
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
import { Bar, Line } from 'react-chartjs-2';
import './Sessions.css';

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

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (dateFrom) params.from = dateFrom;
      if (dateTo) params.to = dateTo;

      const [sessionsRes, statsRes] = await Promise.all([
        api.get('/sessions', { params }),
        api.get('/sessions/stats'),
      ]);

      setSessions(sessionsRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error('Failed to fetch sessions:', err);
    } finally {
      setLoading(false);
    }
  }, [dateFrom, dateTo]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleExport = async () => {
    try {
      const params = {};
      if (dateFrom) params.from = dateFrom;
      if (dateTo) params.to = dateTo;

      const response = await api.get('/sessions/export', {
        params,
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'sessions.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  const formatDuration = (start, end) => {
    if (!start) return '-';
    const s = new Date(start).getTime();
    const e = end ? new Date(end).getTime() : Date.now();
    const diff = Math.max(0, e - s);
    const min = Math.floor(diff / 60000);
    const hrs = Math.floor(min / 60);
    const mins = min % 60;
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  };

  // Chart data
  const dailyLabels = stats?.daily?.map(d => d.date)?.reverse()?.slice(-14) || [];
  const sessionsChartData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Sessions',
        data: stats?.daily?.map(d => d.session_count)?.reverse()?.slice(-14) || [],
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderRadius: 6,
      },
    ],
  };

  const durationChartData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Avg Duration (mins)',
        data: stats?.daily?.map(d => Math.round(d.avg_duration_minutes || 0))?.reverse()?.slice(-14) || [],
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true },
    },
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading sessions...</p>
      </div>
    );
  }

  return (
    <div className="sessions-page">
      <div className="page-header">
        <div>
          <h1><BarChart3 size={28} /> Session Analytics</h1>
          <p>Monitor user login sessions and platform usage</p>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="date-filters">
          <div className="date-input">
            <Calendar size={18} />
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>
          <span>to</span>
          <div className="date-input">
            <Calendar size={18} />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary btn-sm" onClick={fetchData}>
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
        </div>
        <button className="btn btn-primary btn-sm" onClick={handleExport}>
          <Download size={16} />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="card chart-card">
          <h3>Sessions per Day</h3>
          <div className="chart-container">
            <Bar data={sessionsChartData} options={chartOptions} />
          </div>
        </div>
        <div className="card chart-card">
          <h3>Average Duration (mins)</h3>
          <div className="chart-container">
            <Line data={durationChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Sessions Table */}
      <div className="card">
        <h3>Recent Sessions</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Duration</th>
                <th>Last Activity</th>
                <th>IP</th>
              </tr>
            </thead>
            <tbody>
              {sessions.slice(0, 50).map(session => (
                <tr key={session.id}>
                  <td>{session.id}</td>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar">
                        {(session.username || 'U').charAt(0).toUpperCase()}
                      </div>
                      <span>{session.username || 'Unknown'}</span>
                    </div>
                  </td>
                  <td>{session.start_time ? new Date(session.start_time).toLocaleString() : '-'}</td>
                  <td>
                    {session.end_time ? (
                      new Date(session.end_time).toLocaleString()
                    ) : (
                      <span className="badge badge-success">Active</span>
                    )}
                  </td>
                  <td>
                    <span className="duration">
                      <Clock size={14} />
                      {formatDuration(session.start_time, session.end_time)}
                    </span>
                  </td>
                  <td>{session.last_activity ? new Date(session.last_activity).toLocaleString() : '-'}</td>
                  <td><code>{session.ip || '-'}</code></td>
                </tr>
              ))}
              {sessions.length === 0 && (
                <tr>
                  <td colSpan="7" className="no-data">No sessions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sessions;
