import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Video, FileText, BarChart3, Scale, Link2, Target, 
  Play, BookOpen, Rocket, Calendar, Building2, CheckCircle,
  Clock, Landmark, Diamond, Timer, ClipboardList,
  CheckSquare, TrendingUp, FileSpreadsheet, Star, MessageSquare,
  RefreshCw, CalendarDays, Flag, Zap, CalendarClock, XCircle,
  FolderOpen, Users, Phone, Globe, Mail, Search,
  CreditCard, Shield, Wrench, GraduationCap, AlertTriangle,
  Ban, Upload, DollarSign, Edit, ArrowUp, ExternalLink,
  PlayCircle, MonitorPlay, UserCheck, Headphones, Bell,
  MessageCircle, Sparkles
} from 'lucide-react';
import './Home.css';

// Training Kit Includes data
const trainingKitIncludes = [
  { Icon: Video, title: 'Video Training', desc: 'Complete video tutorials covering payment recovery strategies, legal procedures, and proven techniques from industry experts.' },
  { Icon: FileText, title: 'Ready-to-Use Templates', desc: 'Professional templates for recovery letters, legal notices, WhatsApp scripts, email templates, and communication formats.' },
  { Icon: BarChart3, title: 'Tracking Sheets', desc: 'Comprehensive sheets for payment tracking, dashboard management, customer performance analysis, and recovery logging.' },
  { Icon: Scale, title: 'Legal Frameworks', desc: 'Business agreements, legal notice procedures, and compliance guidelines under Indian laws and regulations.' },
  { Icon: Link2, title: 'Expert Network', desc: 'Access to verified lawyers, debt recovery agencies, MSME consultants, and detective services.' },
  { Icon: Target, title: '30-Day Action Plan', desc: 'Step-by-step recovery formula with daily action steps to recover any money from anybody.' },
];

// Training Video Center data
const trainingVideos = [
  { Icon: Play, title: '2 Hours – Rapid Payment Recovery Blueprint :Deep Dive', desc: 'Comprehensive deep dive into the rapid payment recovery blueprint strategy.', url: 'https://youtu.be/Ktyccp1Acuk' },
  { Icon: Calendar, title: '7-Day Advance Payment Collection', desc: 'Pre-recorded video course for your team on collecting advance payments', url: 'https://www.youtube.com/playlist?list=PLU4M4cIzTFAa6wc9F9YwB7KAfP2IhD92h' },
  { Icon: Users, title: 'Delegating Payment Recovery to Your Team', desc: 'Training videos on how to delegate recovery process effectively', urls: ['https://youtu.be/1dcaZ0WgIqw', 'https://youtu.be/yJRXutndAEw'] },
  { Icon: Shield, title: 'How to Build Your Credit Control System (Video Course)', desc: 'Complete guide to establishing an effective credit control system', url: 'https://youtu.be/hkcRDwBzRiU' },
];

// 12 Pro Recovery Tactics
const recoveryTactics = [
  { num: 1, title: 'Basic Steps To Recover Your Money', url: 'https://youtu.be/cyPVlGz_5gY' },
  { num: 2, title: 'Recovery Uncle Strategy', url: 'https://youtu.be/yUI4yk_miXA' },
  { num: 3, title: 'MSME Notice', url: 'https://youtu.be/cusbkJmS34E' },
  { num: 4, title: 'Before Moving Forward', url: 'https://youtu.be/EUq3-eGVRxc' },
  { num: 5, title: 'IVR Call Strategy', url: 'https://youtu.be/qusvgPFAlq4' },
  { num: 6, title: 'CNC Strategy', url: 'https://youtu.be/6Ob8R3tnNII' },
  { num: 7, title: 'King Kong Strategy', url: 'https://youtu.be/V_jtNjyjvvk' },
  { num: 8, title: 'Money Recovery Agency', url: 'https://youtu.be/V2U99OhuzH0' },
  { num: 9, title: 'Dept. Expert / MSME Consultant', url: 'https://youtu.be/xvj9Ch2U8_w' },
  { num: 10, title: 'Cheque Bounce Recovery Strategy', url: 'https://youtu.be/_GDV3jYl7QY' },
  { num: '11-12', title: 'Legal Recovery Suit Formula', url: 'https://youtu.be/ag5WGd2RSOQ' },
];

// 30 Days Formula
const recoveryFormula = [
  { day: 'Day 1', action: 'Send Letter 3', desc: 'Send recovery letter to home, office, and factory via registered post' },
  { day: 'Day 3', action: 'Lawyer Notice', desc: 'Hire professional lawyer and send legal notice under company letterhead' },
  { day: 'Day 7', action: 'Asset Seizure Notice', desc: 'Send notice warning possible asset seizure, referencing contract/invoice clause' },
  { day: 'Day 10', action: '11-Point Notice', desc: 'Send detailed notice to home, office, and factory with consequences' },
  { day: 'Day 14', action: 'Buddha Uncle Strategy', desc: 'Arrange public visit with awareness placard for social pressure' },
  { day: 'Day 17-18', action: 'Police Complaint', desc: 'File non-cognizable complaint citing Financial Cheating & Breach of Trust' },
  { day: 'Day 21', action: 'Final Demand Notice', desc: 'Send strongest demand letter with 48-hour payment ultimatum' },
  { day: 'Day 24', action: 'GST/Tax Authority Notice', desc: 'Send formal intimation to client\'s GST department regarding non-payment' },
  { day: 'Day 27', action: 'Labour Union Pressure', desc: 'Involve Labour Union representative to raise local level awareness' },
  { day: 'Day 30', action: 'Field Recovery Operation', desc: 'Send verified females with identity card, invoice & authorized letter at 7:00 AM' },
];

// Cheque Process Templates
const chequeTemplates = [
  { Icon: CheckCircle, title: 'Cheque Receipt Confirmation', url: 'https://docs.google.com/document/d/1eDB7uG_uIKfNFPg94G3JZgQwMt7bWrC0WhgyoSg0M9E/edit?tab=t.0' },
  { Icon: CalendarDays, title: '12-Day Clearance Notification', url: 'https://docs.google.com/document/d/192fXItkrcjKHSbtjA4XrYTgTznntHypPbDL3fFsFvro/edit?tab=t.0' },
  { Icon: Landmark, title: 'Cheque Deposit Procedure', url: 'https://docs.google.com/document/d/1wD3UyOY4dFEHW1RZghgsYQWV0IB-S2hnQaph5h1HW24/edit?tab=t.0' },
  { Icon: Diamond, title: '"D" Customer - Cheque Process', url: 'https://docs.google.com/document/d/1tw9wNJYNj7QyGZCWbWfl6SJZAGOU-GO8Hd8gBUy3tDI/edit?tab=t.0' },
  { Icon: Timer, title: 'Two Days Prior Notification', url: 'https://docs.google.com/document/d/1tw9wNJYNj7QyGZCWbWfl6SJZAGOU-GO8Hd8gBUy3tDI/edit?tab=t.0' },
  { Icon: ClipboardList, title: 'Cheque Deposit Day Protocol', url: 'https://docs.google.com/document/d/1jUT_Z8ZHahK7rWDal31MTZz12HGyLfmhKhIYX8L7hso/edit?tab=t.0' },
];

// Payment Tracking Sheets
const trackingSheets = [
  { Icon: CheckSquare, title: 'Payment Recovery Meeting - Checklist', url: 'https://docs.google.com/spreadsheets/d/14eCIlV2bHRv67r3q_wbJzHbkp3MnW4AnMPHhHZ4cKYo/edit?gid=218706073#gid=218706073' },
  { Icon: TrendingUp, title: 'Outstanding Payment Dashboard', url: 'https://docs.google.com/spreadsheets/d/1bRDGxs8Qw66TD5f16qrTwGpDYI3-HDZMJpUpWRwI4VM/edit?usp=sharing' },
  { Icon: FileSpreadsheet, title: 'Written Off Debts Till Date', url: 'https://docs.google.com/spreadsheets/d/17gBhmzrDrJ1sutXyVKm_a9brkwwiIU5b2aFXvcHWmHE/edit?gid=0#gid=0' },
  { Icon: Star, title: 'Customer Performance Tracker Sheet', url: 'https://docs.google.com/spreadsheets/d/1D_jvi5lF9S3I0M5JO2hkKFAYPJtdAZWgEYvS-hj5C-Q/edit' },
  { Icon: MessageSquare, title: 'Client Communication Log', url: 'https://docs.google.com/spreadsheets/d/1ruWG9YOhOnR6uRyGElV2Fqnra65UQH-Owmwb9tyEaYM/edit?gid=0#gid=0' },
  { Icon: RefreshCw, title: 'Recovery Tracking Sheet', url: 'https://docs.google.com/spreadsheets/d/1K8XQgrY1UgFFQCrX2yS7__EVXkxbPnkc728lOrWYHIc/edit?gid=0#gid=0' },
  { Icon: CalendarClock, title: 'Payment History Tracker of a Customer', url: 'https://docs.google.com/spreadsheets/d/19uCZh_oj-R0VUU2Y07zvOVQ3EF8DBFdpF3IfV5eAVro/edit?ouid=117016031852050350861&usp=sheets_home&ths=true' },
  { Icon: Flag, title: 'Red Flag Checklist', url: 'https://docs.google.com/spreadsheets/d/1BR2VwBTtiZKPJV-AyStpUN6Jn4cLT-VHFSiLcMzxZF4/edit?gid=0#gid=0' },
  { Icon: Zap, title: 'Priority Payment Sheet', url: 'https://docs.google.com/spreadsheets/d/1_Z06p4hPNhkfUA9hez63FdzA5g-3EQSHqWkdxRau44s/edit' },
  { Icon: Calendar, title: 'Scheduler of PRE', url: 'https://docs.google.com/spreadsheets/d/18U-cewkRgAO_3_BvgslR9W5g917kXZ_e50zd1MVYyM4/edit?ouid=117016031852050350861&usp=sheets_home&ths=true3' },
  { Icon: XCircle, title: 'Commitment Failed Sheet', url: 'https://docs.google.com/spreadsheets/d/1K9SuyPxzHtjxGaEV25HAFJZEi0S4apY7L5udxEJQePI/edit?gid=0#gid=0' },
  { Icon: FolderOpen, title: 'Payment Recovery Log Sheet', url: 'https://docs.google.com/spreadsheets/d/1rD7Lv3Gb853xV-FFL8WR0NsHnt-tW3-lnuJmQV561pE/edit?gid=0#gid=0' },
  { Icon: Users, title: 'Client Payment Segmentation & Recovery Tracker', url: 'https://docs.google.com/spreadsheets/d/1D88Ydq_qH1eEobKRS0ZTgUZ5CXo27OolFuELLaRIQ2s/edit?gid=0#gid=0' },
];

// Credit Policy Toolkit
const creditToolkit = [
  { Icon: Edit, title: 'Business Deal Agreement', desc: 'Formal Business Deal Agreement template (Google Doc).', url: 'https://docs.google.com/document/d/125kgh9lxRSKDiIVp_NcuMylGm_DMWOkBpU4crHXksQM/edit?tab=t.0#heading=h.irgpte6ydsmu' },
  { Icon: FileText, title: 'Credit Policy Document', desc: 'Access the Credit Policy form for your organization.', url: 'https://docs.google.com/forms/d/13timmlhpEE3egulXC6PG31gqFgnlQA5qbcTgC2oR2iI/edit' },
];

// Support Hub
const supportFeatures = [
  { Icon: Headphones, title: 'Expert Consultation', desc: 'Get direct access to payment recovery experts for 1 year to solve your specific case challenges.' },
  { Icon: Users, title: 'Community Access', desc: 'Join our exclusive community of business owners to share experiences and strategies.' },
  { Icon: Bell, title: 'Regular Updates', desc: 'Receive updates on new laws, strategies, and templates for the next 12 months.' },
];

// Resources
const legalServices = [
  { name: 'Sachdeva Chambers of Advocacy & Law (SCAL)', contact: 'Adv. Kuljeet Singh Sachdeva: 98111 3347', type: 'Debt Recovery Advocates' },
  { name: 'DA MSME', contact: 'Lawyer Satvinder Singh Bakshi: 98113 38373', type: 'MSME Debt Recovery Consultants' },
  { name: 'Advice Consultant', contact: 'Digvijay Singh: +91 88261 81919, advdigvijaydelhi@gmail.com', type: '' },
  { name: 'Building Nirman Mazdoor Union', contact: 'R.K. Mishra: 9213697526', type: 'Labour Union' },
];

const recoveryAgencies = [
  { name: 'Taurus Collections - Verified B2B Payment Recovery Agency', phone: '+91 91369 56881', phone2: 'Shainiyel: +91 89769 80487', email: 'info@tauruscollection.com', website: 'https://tauruscollection.com/' },
];

const detectiveServices = [
  { name: 'Secret Watch Detectives Pvt Ltd', desc: 'To trace absconding customers', contact: 'Mr. Rahul Rai Gupta: 9810519234' },
];

const cibilServices = [
  { name: 'MIRA INFORM', website: 'https://mirainform.com/', contact: 'Ms Laxmi Dubey: 82913 71464' },
  { name: 'Souvik Saha Rubix', contact: '+91 70035 20735', type: 'Credit Reports & Insurance' },
  { name: 'Insurance Experts', website: 'insurance-experts.in', contact: 'Mr Gaurav Jain: 98145 09952' },
];

const staffingSolutions = [
  { name: 'AM2PM', contact: 'Mr Mayank Jain: 93151 84587', type: 'Virtual PRE (Work From Home)' },
  { name: 'Office-Based PRE Staff', contact: 'Ms Surpriya: 99102 99688, Ms Neelu Sharma' },
];

const automationServices = [
  { name: 'Cubic Business - Automation Expert', desc: 'Advanced Invoicing Solutions', contact: 'Mr Harneet: 97172 61317' },
];

const Home = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Be a Payment Recovery Superstar for Your Business</h1>
          <p>Master the Complete Payment Recovery Formula with Video Training, Templates, and Expert Resources</p>
        </div>
      </section>

      {/* Training Kit Includes */}
      <section className="kit-includes" id="kit">
        <div className="container">
          <h2><GraduationCap className="section-icon" /> The Training Kit Includes</h2>
          <div className="kit-grid">
            {trainingKitIncludes.map((item, idx) => (
              <div key={idx} className="kit-card">
                <div className="kit-icon-wrapper">
                  <item.Icon />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Video Center */}
      <section className="kit-includes" id="videos">
        <div className="container">
          <h2><MonitorPlay className="section-icon" /> Training Video Center</h2>
          <div className="kit-grid">
            {trainingVideos.map((video, idx) => (
              <div key={idx} className="kit-card">
                <div className="kit-icon-wrapper">
                  <video.Icon />
                </div>
                <h3>{video.title}</h3>
                <p>{video.desc}</p>
                {video.urls ? (
                  <div className="video-buttons">
                    {video.urls.map((url, i) => (
                      <a key={i} href={url} className="video-link" target="_blank" rel="noopener noreferrer">
                        <PlayCircle size={18} /> Video {i + 1}
                      </a>
                    ))}
                  </div>
                ) : (
                  <a href={video.url} className="video-link" target="_blank" rel="noopener noreferrer">
                    <PlayCircle size={18} /> {video.url.includes('playlist') ? 'Access Course' : 'Watch Video'}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12 Powerful Techniques */}
      <section className="techniques-section" id="tactics">
        <div className="container">
          <h2><Rocket className="section-icon" /> 12 Pro Recovery Tactics</h2>
          <div className="techniques-grid">
            {recoveryTactics.map((tactic, idx) => (
              <div key={idx} className="technique-card">
                <div className="tactic-number">{tactic.num}</div>
                <h3>{tactic.title}</h3>
                <a href={tactic.url} className="video-link" target="_blank" rel="noopener noreferrer">
                  <PlayCircle size={16} /> Watch
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 30 Days Formula */}
      <section className="formula-section" id="formula">
        <div className="container">
          <h2><Calendar className="section-icon" /> 30 Days Payment Recovery Formula</h2>
          <div className="formula-video-link">
            <a href="https://youtu.be/4RG3mm9kVqI?si=jCB5pgbNsgjrYA6J" className="video-link" target="_blank" rel="noopener noreferrer">
              <PlayCircle size={18} /> Watch Full Video Guide
            </a>
          </div>
          <div className="formula-timeline">
            {recoveryFormula.map((item, idx) => (
              <div key={idx} className="formula-card">
                <span className="formula-step">{idx + 1}</span>
                <div className="formula-day">{item.day}</div>
                <h3 className="formula-action">{item.action}</h3>
                <p className="formula-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cheque Secure System */}
      <section className="cheque-section" id="cheque">
        <div className="container">
          <h2><Building2 className="section-icon" /> Cheque Secure System</h2>
          <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <a href="https://youtu.be/ZvvpjSN9WCA" className="video-link" target="_blank" rel="noopener noreferrer">
              <PlayCircle size={18} /> Watch Video
            </a>
          </p>
          
          <h3 style={{ color: '#1e40af', marginTop: '2rem', fontSize: '1.375rem' }}>Why Cheques Are Given?</h3>
          <div className="cheque-steps">
            <ol>
              <li><strong>To Buy Time</strong> - Delays immediate payment</li>
              <li><strong>To Build Trust</strong> - Shows commitment to future payment</li>
              <li><strong>To Keep Your Mouth Closed</strong> - Creates false sense of security</li>
            </ol>
          </div>

          <h3 style={{ color: '#1e40af', marginTop: '2rem', fontSize: '1.375rem' }}>Cheque Secure System - 5 Steps</h3>
          <div className="cheque-steps">
            <ol>
              <li>As soon as you receive the cheque, send the details via text, email, or WhatsApp</li>
              <li>Inform the client 2 days before cheque deposit date</li>
              <li>Inform the client on the same day of cheque deposit</li>
              <li>Monitor cheque status closely</li>
              <li>As soon as cheque bounces, send immediate notice</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Cheque Process Templates */}
      <section className="templates-section" id="cheque-templates">
        <div className="container">
          <h2><FileText className="section-icon" /> Cheque Process Templates</h2>
          <p className="section-subtitle">Ready-to-use templates for cheque handling and deposit procedures</p>
          <div className="templates-grid">
            {chequeTemplates.map((template, idx) => (
              <div key={idx} className="template-card">
                <div className="template-number">{String(idx + 1).padStart(2, '0')}</div>
                <div className="template-icon-wrapper">
                  <template.Icon />
                </div>
                <div className="template-content">
                  <h4>{template.title}</h4>
                </div>
                <a href={template.url} className="template-btn" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={18} />
                  <span>Open Template</span>
                </a>
                <div className="template-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Tracking Sheets */}
      <section className="sheets-section" id="tracking">
        <div className="container">
          <h2><BarChart3 className="section-icon" /> Payment Tracking Sheets & Formats</h2>
          <p className="section-subtitle">All sheets are available for easy collaboration and real-time updates</p>
          <div className="sheets-grid">
            {trackingSheets.map((sheet, idx) => (
              <div key={idx} className="sheet-card">
                <div className="sheet-ribbon">Sheet {idx + 1}</div>
                <div className="sheet-icon-wrapper">
                  <sheet.Icon />
                </div>
                <h4>{sheet.title}</h4>
                <a href={sheet.url} className="sheet-btn" target="_blank" rel="noopener noreferrer">
                  <span>Open Sheet</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credit Policy Toolkit */}
      <section className="toolkit-section" id="toolkit">
        <div className="container">
          <h2><FileText className="section-icon" /> Credit Policy Toolkit</h2>
          <p className="section-subtitle">Essential documents and agreements for credit management</p>
          <div className="toolkit-grid">
            {creditToolkit.map((doc, idx) => (
              <div key={idx} className="toolkit-card">
                <div className="toolkit-number">{String(idx + 1).padStart(2, '0')}</div>
                <div className="toolkit-icon-wrapper">
                  <doc.Icon />
                </div>
                <div className="toolkit-content">
                  <h3>{doc.title}</h3>
                  <p>{doc.desc}</p>
                </div>
                <a href={doc.url} className="toolkit-btn" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={18} />
                  <span>Open Document</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Software & Resources */}
      <section className="software-section" id="software">
        <div className="container">
          <h2><Wrench className="section-icon" /> Payment Recovery Software</h2>
          <p className="section-subtitle">Professional software for managing customer recovery</p>
          <div className="software-card">
            <div className="software-header">
              <div className="software-icon">
                <Globe />
              </div>
              <div className="software-title">
                <h3>Wizone - Customer Support Software</h3>
                <span className="software-badge">Recommended</span>
              </div>
            </div>
            <div className="software-body">
              <div className="software-link-box">
                <span className="link-label">Registration Link:</span>
                <a href="https://recov.wizoneit.com/register-tenant" target="_blank" rel="noopener noreferrer" className="software-register-link">
                  <ExternalLink size={16} />
                  https://recov.wizoneit.com/register-tenant
                </a>
              </div>
              <div className="software-contacts">
                <h4>Contact Team:</h4>
                <div className="contact-grid">
                  <div className="contact-card">
                    <Phone size={20} />
                    <div className="contact-info-box">
                      <span className="contact-name">Mr. Ravinder Giri</span>
                      <span className="contact-phone-number">+91 7500 22 33 55</span>
                    </div>
                  </div>
                  <div className="contact-card">
                    <Phone size={20} />
                    <div className="contact-info-box">
                      <span className="contact-name">Mr. Sachin Kumar</span>
                      <span className="contact-phone-number">+91 9258 299 527</span>
                    </div>
                  </div>
                  <div className="contact-card">
                    <Phone size={20} />
                    <div className="contact-info-box">
                      <span className="contact-name">Ms Anjali Dhiman</span>
                      <span className="contact-phone-number">+91 9258 299 518</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1-Year Support Hub */}
      <section className="kit-includes" id="support">
        <div className="container">
          <h2><UserCheck className="section-icon" /> 1-Year Support Hub</h2>
          <div className="kit-grid">
            {supportFeatures.map((feature, idx) => (
              <div key={idx} className="kit-card">
                <div className="kit-icon-wrapper">
                  <feature.Icon />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Resources */}
      <section className="resources-section" id="resources">
        <div className="container">
          <h2><BookOpen className="section-icon" /> Other Resources</h2>

          <div className="resource-category">
            <h3><Scale className="category-icon" /> Legal & Recovery Services</h3>
            <div className="resource-items-wrapper">
              {legalServices.map((service, idx) => (
                <div key={idx} className="resource-item">
                  <strong>{service.type ? `${service.type} - ` : ''}{service.name}</strong><br />
                  <span className="resource-contact"><Phone size={14} /> {service.contact}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="resource-category">
            <h3><Building2 className="category-icon" /> Recovery Agencies</h3>
            <div className="resource-items-wrapper">
              {recoveryAgencies.map((agency, idx) => (
                <div key={idx} className="resource-item">
                  <strong>{agency.name}</strong><br />
                  <span className="resource-contact"><Phone size={14} /> {agency.phone}</span><br />
                  <span className="resource-contact"><Phone size={14} /> {agency.phone2}</span><br />
                  <span className="resource-contact"><Mail size={14} /> {agency.email}</span><br />
                  <span className="resource-link"><Globe size={14} /> <a href={agency.website} target="_blank" rel="noopener noreferrer">{agency.website}</a></span>
                </div>
              ))}
            </div>
          </div>

          <div className="resource-category">
            <h3><Search className="category-icon" /> Detective & Background Check Services</h3>
            <div className="resource-items-wrapper">
              {detectiveServices.map((service, idx) => (
                <div key={idx} className="resource-item">
                  <strong>{service.name}</strong><br />
                  <span className="resource-desc">{service.desc}</span><br />
                  <span className="resource-contact"><Phone size={14} /> {service.contact}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="resource-category">
            <h3><CreditCard className="category-icon" /> CIBIL Reports & Credit Checks</h3>
            <div className="resource-items-wrapper">
              {cibilServices.map((service, idx) => (
                <div key={idx} className="resource-item">
                  <strong>{service.name}</strong><br />
                  {service.website && <span className="resource-link"><Globe size={14} /> <a href={service.website.startsWith('http') ? service.website : `https://${service.website}`} target="_blank" rel="noopener noreferrer">{service.website}</a><br /></span>}
                  <span className="resource-contact"><Phone size={14} /> {service.contact}</span>
                  {service.type && <><br /><span className="resource-desc">{service.type}</span></>}
                </div>
              ))}
            </div>
          </div>

          <div className="resource-category">
            <h3><Users className="category-icon" /> Staffing Solutions</h3>
            <div className="resource-items-wrapper">
              {staffingSolutions.map((service, idx) => (
                <div key={idx} className="resource-item">
                  <strong>{service.type ? `${service.type} - ` : ''}{service.name}</strong><br />
                  <span className="resource-contact"><Phone size={14} /> {service.contact}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="resource-category">
            <h3><Wrench className="category-icon" /> Automation & Invoicing</h3>
            <div className="resource-items-wrapper">
              {automationServices.map((service, idx) => (
                <div key={idx} className="resource-item">
                  <strong>{service.name}</strong><br />
                  <span className="resource-desc">{service.desc}</span><br />
                  <span className="resource-contact"><Phone size={14} /> {service.contact}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Copyright & Intellectual Property Disclaimer */}
      <section className="disclaimer-section" id="disclaimer">
        <div className="container">
          <div className="disclaimer-card">
            <div className="disclaimer-header">
              <div className="disclaimer-icon-wrapper">
                <AlertTriangle />
              </div>
              <div className="disclaimer-title">
                <h2>Copyright & Intellectual Property Disclaimer</h2>
                <span className="disclaimer-badge">Important Notice</span>
              </div>
            </div>
            
            <div className="disclaimer-content">
              <div className="disclaimer-intro">
                <div className="intro-icon">
                  <Shield />
                </div>
                <div className="intro-text">
                  <p>All course materials—including notes, templates, draft notices, letters, strategies, frameworks, checklists, formats, and communication samples—have been <strong>originally created, compiled, and developed by the instructor</strong>.</p>
                </div>
              </div>
              
              <div className="copyright-box">
                <div className="copyright-icon">
                  <Scale />
                </div>
                <div className="copyright-text">
                  <h4>Under the Indian Copyright Act, 1957</h4>
                  <p>All original content is automatically protected, even if not formally registered. Participants are granted access to this material solely for <strong>personal learning</strong> and <strong>internal business use</strong>.</p>
                </div>
              </div>
              
              <div className="prohibited-section">
                <h4 className="prohibited-title">
                  <Ban className="title-icon" />
                  Strictly Prohibited Without Prior Written Permission
                </h4>
                
                <div className="prohibited-grid">
                  <div className="prohibited-card">
                    <div className="prohibited-icon-box">
                      <Edit />
                    </div>
                    <span>Copying or reproducing content</span>
                  </div>
                  <div className="prohibited-card">
                    <div className="prohibited-icon-box">
                      <Users />
                    </div>
                    <span>Sharing outside enrolled group</span>
                  </div>
                  <div className="prohibited-card">
                    <div className="prohibited-icon-box">
                      <Upload />
                    </div>
                    <span>Uploading on social media/web</span>
                  </div>
                  <div className="prohibited-card">
                    <div className="prohibited-icon-box">
                      <DollarSign />
                    </div>
                    <span>Selling or reselling materials</span>
                  </div>
                  <div className="prohibited-card">
                    <div className="prohibited-icon-box">
                      <XCircle />
                    </div>
                    <span>Claiming ownership or modifying</span>
                  </div>
                </div>
              </div>
              
              <div className="legal-warning">
                <div className="warning-icon">
                  <AlertTriangle />
                </div>
                <div className="warning-content">
                  <h4>LEGAL WARNING</h4>
                  <p>Any unauthorized use constitutes a violation of copyright law and may invite <strong>civil and/or criminal action</strong>.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
    <motion.section 
          className="contact-section-modern" 
          id="contact"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="contact-bg-pattern"></div>
          <div className="contact-content-wrapper">
            <div className="contact-icon-wrapper">
              <Phone size={32} />
            </div>
            <h3>Need Help ?</h3>
            <p className="contact-subtitle">Contact our team for guidance on which notice to send and recovery strategy</p>
            
            <div className="contact-card-modern">
              <div className="contact-left">
                <div className="contact-avatar">
                  <span>RK</span>
                </div>
                <div className="contact-person-info">
                  <h4>Mrs. Ramanpreet Kaur</h4>
                  <span>Recovery Support Specialist</span>
                </div>
              </div>
              
              <div className="contact-right">
                <a href="tel:8920633120" className="contact-item-card">
                  <div className="contact-item-icon">
                    <Phone size={22} />
                  </div>
                  <div className="contact-item-text">
                    <span className="contact-item-label">Phone</span>
                    <span className="contact-item-value">8920633120</span>
                  </div>
                </a>
                
                <div className="contact-item-card">
                  <div className="contact-item-icon">
                    <Clock size={22} />
                  </div>
                  <div className="contact-item-text">
                    <span className="contact-item-label">Available</span>
                    <span className="contact-item-value">10 AM - 7 PM</span>
                  </div>
                </div>
                
                <a href="https://wa.me/918920633120" target="_blank" rel="noopener noreferrer" className="contact-item-card whatsapp">
                  <div className="contact-item-icon whatsapp">
                    <MessageCircle size={22} />
                  </div>
                  <div className="contact-item-text">
                    <span className="contact-item-label">WhatsApp</span>
                    <span className="contact-item-value">Call Only</span>
                  </div>
                </a>
              </div>
            </div>
            
            <p className="contact-note">
              <Sparkles size={16} />
              Get expert advice on the right notice for your specific recovery situation
            </p>
          </div>
        </motion.section>

      {/* Scroll to Top Button */}
      <div 
        className={`scroll-top ${showScrollTop ? 'show' : ''}`}
        onClick={scrollToTop}
      >
        <ArrowUp size={24} />
      </div>
    </div>
  );
};

export default Home;
