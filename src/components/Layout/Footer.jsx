import React from 'react';
import { Heart, Shield } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-brand">
            <Shield className="footer-icon" />
            <span>Payment Recovery Superstar</span>
          </div>
          <p className="footer-tagline">Professional Training Kit for Payment Recovery Excellence</p>
        </div>
        
        <div className="footer-divider"></div>
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} Payment Recovery Superstar Training Kit. All Rights Reserved.
          </p>
          <p className="made-with">
            Made with <Heart className="heart-icon" /> for Recovery Professionals
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
