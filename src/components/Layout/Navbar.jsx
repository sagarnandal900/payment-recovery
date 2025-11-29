import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Bell, 
  KeyRound, 
  LogOut, 
  Home, 
  PlayCircle, 
  Target, 
  Calendar, 
  FileCheck, 
  LayoutGrid, 
  Briefcase, 
  Monitor, 
  HeadphonesIcon, 
  FolderOpen, 
  Mail,
  Shield,
  Sparkles,
  Menu,
  X,
  ChevronRight,
  Wallet
} from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll for header effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Handle smooth scroll to section
  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  if (!isAuthenticated) return null;

  // Check if we're on the notices page
  const isOnNoticesPage = location.pathname === '/notices';

  const navLinks = [
    { id: 'home', label: 'Home', icon: Home, isSection: true },
    { id: 'videos', label: 'Video Center', icon: PlayCircle, isSection: true },
    { id: 'tactics', label: '12-Pro Tactics', icon: Target, isSection: true },
    { id: 'formula', label: '30-Day Plan', icon: Calendar, isSection: true },
    { id: 'cheque', label: 'Cheque System', icon: FileCheck, isSection: true },
    { id: 'tracking', label: 'Tracking Sheets', icon: LayoutGrid, isSection: true },
    { id: 'toolkit', label: 'Credit Toolkit', icon: Briefcase, isSection: true },
    { id: 'software', label: 'Software', icon: Monitor, isSection: true },
    { id: 'support', label: 'Support', icon: HeadphonesIcon, isSection: true },
    { id: 'resources', label: 'Resources', icon: FolderOpen, isSection: true },
    { id: 'contact', label: 'Contact', icon: Mail, isSection: true },
  ];

  return (
    <>
      {/* Fixed Notice Button - Desktop Only (Hidden on Notices page) */}
      {!isOnNoticesPage && (
        <Link to="/notices" className="notice-floating-btn desktop-only">
          <span className="notice-btn-glow"></span>
          <span className="notice-btn-content">
            <Bell className="notice-btn-icon" size={22} />
            <span className="notice-btn-text">
              <span className="notice-btn-label">Click Here</span>
              <span className="notice-btn-sublabel">Important Notice</span>
            </span>
            <Sparkles className="notice-btn-sparkle" size={16} />
          </span>
        </Link>
      )}

      {/* Fixed Action Buttons - Desktop Only */}
      <div className="top-action-btns desktop-only">
        <Link to="/change-password" className="action-btn action-btn-password">
          <KeyRound size={18} />
          <span>Change Password</span>
        </Link>
        <button onClick={handleLogout} className="action-btn action-btn-logout">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Navigation Header */}
      <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
        <nav className="navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-brand" onClick={() => scrollToSection('home')}>
            <div className="brand-icon">
              <Wallet size={28} />
            </div>
            <div className="brand-text">
              <span className="brand-title">Payment Recovery</span>
              <span className="brand-subtitle">Training Kit</span>
            </div>
          </Link>
          
          {/* Hamburger Menu Button */}
          <button 
            className={`navbar-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          {/* Navigation Menu */}
          <ul className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
            {/* Mobile Header */}
            <li className="mobile-menu-header mobile-only">
              <div className="mobile-brand">
                <Wallet size={24} />
                <span>Payment Recovery Kit</span>
              </div>
              <button 
                className="mobile-close-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={24} />
              </button>
            </li>

            {/* Navigation Links */}
            {navLinks.map((link) => (
              <li key={link.id} className="navbar-item">
                <a 
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.id);
                  }}
                  className="navbar-link"
                >
                  <link.icon size={20} className="navbar-link-icon" />
                  <span className="navbar-link-text">{link.label}</span>
                  <ChevronRight size={16} className="navbar-link-arrow mobile-only" />
                </a>
              </li>
            ))}

            {/* Admin Link */}
            {user?.isAdmin && (
              <li className="navbar-item">
                <Link to="/admin" className="navbar-link admin-link">
                  <Shield size={20} className="navbar-link-icon" />
                  <span className="navbar-link-text">Admin Panel</span>
                  <ChevronRight size={16} className="navbar-link-arrow mobile-only" />
                </Link>
              </li>
            )}
            
            {/* Mobile Actions Section */}
            <li className="mobile-divider mobile-only"></li>
            
            <li className="mobile-only mobile-action-item">
              <Link 
                to="/notices" 
                className="mobile-action-link mobile-notice" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <Bell size={20} />
                <span>View Important Notice</span>
                <ChevronRight size={18} />
              </Link>
            </li>
            
            <li className="mobile-only mobile-action-item">
              <Link 
                to="/change-password" 
                className="mobile-action-link mobile-password" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <KeyRound size={20} />
                <span>Change Password</span>
                <ChevronRight size={18} />
              </Link>
            </li>
            
            <li className="mobile-only mobile-logout-container">
              <button onClick={handleLogout} className="mobile-logout-btn">
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`navbar-overlay ${mobileMenuOpen ? 'show' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>
    </>
  );
};

export default Navbar;
