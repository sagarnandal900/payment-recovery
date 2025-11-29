import React, { useState, useEffect } from 'react';
import { UserPlus, Check, X, Clock, User, Mail, Briefcase, Calendar, Filter, Search, RefreshCw } from 'lucide-react';
import api from '../../config/api';
import toast from 'react-hot-toast';
import './Requests.css';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [processing, setProcessing] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await api.get('/requests');
      setRequests(response.data);
    } catch (error) {
      toast.error('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    if (!window.confirm('Approve this access request? An account will be created for this user.')) return;
    
    setProcessing(id);
    try {
      await api.post(`/requests/${id}/approve`);
      toast.success('Request approved! Account created.');
      fetchRequests();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to approve request');
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm('Reject this access request?')) return;
    
    setProcessing(id);
    try {
      await api.post(`/requests/${id}/reject`);
      toast.success('Request rejected');
      fetchRequests();
    } catch (error) {
      toast.error('Failed to reject request');
    } finally {
      setProcessing(null);
    }
  };

  const filteredRequests = requests.filter(req => {
    const matchesFilter = filter === 'all' || req.status === filter;
    const matchesSearch = req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          req.department?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const badges = {
      pending: { class: 'badge-warning', icon: Clock, text: 'Pending' },
      approved: { class: 'badge-success', icon: Check, text: 'Approved' },
      rejected: { class: 'badge-danger', icon: X, text: 'Rejected' }
    };
    const badge = badges[status] || badges.pending;
    const Icon = badge.icon;
    return (
      <span className={`badge ${badge.class}`}>
        <Icon size={14} />
        {badge.text}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="loading-state">
        <RefreshCw className="spin" size={32} />
        <p>Loading requests...</p>
      </div>
    );
  }

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  return (
    <div className="requests-page">
      <div className="page-header">
        <h1>
          <UserPlus size={28} />
          Access Requests
          {pendingCount > 0 && <span className="pending-badge">{pendingCount} pending</span>}
        </h1>
        <p>Review and manage user access requests</p>
      </div>

      <div className="card">
        <div className="filters-bar">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search by name, email, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-tabs">
            <button 
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({requests.length})
            </button>
            <button 
              className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending ({requests.filter(r => r.status === 'pending').length})
            </button>
            <button 
              className={`filter-tab ${filter === 'approved' ? 'active' : ''}`}
              onClick={() => setFilter('approved')}
            >
              Approved ({requests.filter(r => r.status === 'approved').length})
            </button>
            <button 
              className={`filter-tab ${filter === 'rejected' ? 'active' : ''}`}
              onClick={() => setFilter('rejected')}
            >
              Rejected ({requests.filter(r => r.status === 'rejected').length})
            </button>
          </div>
        </div>

        {filteredRequests.length > 0 ? (
          <div className="requests-grid">
            {filteredRequests.map(request => (
              <div key={request.id} className={`request-card ${request.status}`}>
                <div className="request-header">
                  <div className="request-avatar">
                    {request.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </div>
                  <div className="request-info">
                    <h3>{request.name}</h3>
                    {getStatusBadge(request.status)}
                  </div>
                </div>

                <div className="request-details">
                  <div className="detail-row">
                    <Mail size={16} />
                    <span>{request.email}</span>
                  </div>
                  {request.department && (
                    <div className="detail-row">
                      <Briefcase size={16} />
                      <span>{request.department}</span>
                    </div>
                  )}
                  <div className="detail-row">
                    <Calendar size={16} />
                    <span>{formatDate(request.createdAt)}</span>
                  </div>
                </div>

                {request.reason && (
                  <div className="request-reason">
                    <strong>Reason:</strong>
                    <p>{request.reason}</p>
                  </div>
                )}

                {request.status === 'pending' && (
                  <div className="request-actions">
                    <button
                      className="btn btn-success"
                      onClick={() => handleApprove(request.id)}
                      disabled={processing === request.id}
                    >
                      <Check size={16} />
                      Approve
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleReject(request.id)}
                      disabled={processing === request.id}
                    >
                      <X size={16} />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <UserPlus size={48} />
            <h3>No requests found</h3>
            <p>
              {searchTerm || filter !== 'all' 
                ? 'Try adjusting your filters or search term'
                : 'No access requests have been submitted yet'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;
