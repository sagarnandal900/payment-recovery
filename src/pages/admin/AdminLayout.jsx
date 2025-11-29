import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Users, BarChart3, Mail, Settings, 
  LogOut, Menu, X, ChevronRight
} from 'lucide-react';
import './AdminLayout.css';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { path: '/admin/users', label: 'Users', icon: Users },
    { path: '/admin/sessions', label: 'Sessions', icon: BarChart3 },
    { path: '/admin/requests', label: 'Access Requests', icon: Mail },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (path, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <Link to="/admin" className="sidebar-brand">
            <span className="brand-icon">🛡️</span>
            {sidebarOpen && <span className="brand-text">Admin Panel</span>}
          </Link>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path, item.exact) ? 'active' : ''}`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
              {sidebarOpen && isActive(item.path, item.exact) && (
                <ChevronRight size={16} className="nav-arrow" />
              )}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          {sidebarOpen && (
            <div className="admin-info">
              <div className="admin-avatar">A</div>
              <div className="admin-details">
                <span className="admin-name">{user?.username}</span>
                <span className="admin-role">Administrator</span>
              </div>
            </div>
          )}
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="admin-content"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default AdminLayout;
