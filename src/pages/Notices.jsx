import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FileText, 
  Scale, 
  Target, 
  Mail, 
  Building2, 
  ExternalLink,
  Clock,
  AlertTriangle,
  Shield,
  Gavel,
  HandCoins,
  FileCheck,
  Stamp,
  PenTool,
  UserCheck,
  Calendar,
  Zap,
  RefreshCw,
  FileEdit,
  Send,
  Globe,
  Receipt,
  FileWarning,
  BadgeAlert,
  ScrollText,
  Home as HomeIcon,
  Phone,
  MessageCircle,
  ChevronUp,
  Sparkles,
  TrendingUp,
  Users,
  Megaphone,
  Store,
  AlertOctagon,
  FileSignature,
  ArrowLeft
} from 'lucide-react';
import './Notices.css';

// Standard Notices Data
const standardNotices = [
  {
    id: 1,
    title: 'Standard Notice 1',
    stage: 'Payment Late by 15-30 Days',
    category: 'early',
    categoryLabel: 'Early Stage',
    icon: Clock,
    color: '#3b82f6',
    description: 'Gentle reminder notice for clients who are slightly overdue on payments. Establishes official communication and documentation.',
    sendVia: 'Email, WhatsApp, Registered Post',
    link: 'https://docs.google.com/document/d/1l3iGo8fPRjqmZaYcE_ms3vsfUvxtYOS_9HmwZo2NHi4/edit?tab=t.0'
  },
  {
    id: 2,
    title: 'Standard Notice 2',
    stage: 'Payment Late by 30-60 Days',
    category: 'warning',
    categoryLabel: 'Escalation',
    icon: AlertTriangle,
    color: '#f59e0b',
    description: 'Formal payment notice with increased urgency. References contract terms and consequences of non-payment.',
    sendVia: 'Email, WhatsApp, Registered Post',
    link: 'https://docs.google.com/document/d/1atRYwq0YoExSCu8Htgm-eV3vbFlKnH7JaKM2SQhmVz4/edit?tab=t.0'
  },
  {
    id: 3,
    title: 'Standard Notice 3',
    stage: 'Payment Late by 60-90 Days',
    category: 'warning',
    categoryLabel: 'Fear Creation Notice',
    icon: Shield,
    color: '#ef4444',
    description: 'Strong notice with legal references and asset seizure warnings. Creates psychological pressure for payment.',
    sendVia: 'Registered Post, Email, WhatsApp',
    link: 'https://docs.google.com/document/d/15bCLbzJgM4OjomYCyxbvygfqMcu9wzwafFAag6FuM5c/edit?tab=t.0'
  },
  {
    id: 4,
    title: 'Standard Notice 5',
    stage: 'Payment Late by 90+ Days',
    category: 'warning',
    categoryLabel: 'Hard Copy Notice',
    icon: FileText,
    color: '#dc2626',
    description: 'Final notice designed for hard copy distribution. Comprehensive reference to all previous attempts and legal consequences.',
    sendVia: 'Registered Post (Hard Copy)',
    link: 'https://docs.google.com/document/d/10Bw616gOE0KzbqZjJfFJxu-L3FCWYaLjxHboD93_kVc/edit?tab=t.0'
  }
];

// Legal Notices Data
const legalNotices = [
  {
    id: 5,
    title: 'Final Demand Notice',
    stage: 'Payment Recovery Cell',
    category: 'warning',
    categoryLabel: 'Final Action',
    icon: Gavel,
    color: '#dc2626',
    description: 'Final demand notice from Payment Recovery Cell with explicit payment ultimatum and legal action warning.',
    sendVia: 'Email, WhatsApp, Registered Post',
    link: 'https://docs.google.com/document/d/1o6eNnHU2QbY135_IFwwHM139odlwI03AySl0AvGZH3c/edit?tab=t.0'
  },
  {
    id: 6,
    title: 'Notice for Companies Act & Income Tax Act',
    stage: 'Compliance Notice by Raman Khatuwala',
    category: 'legal',
    categoryLabel: 'Tax & Compliance',
    icon: Scale,
    color: '#7c3aed',
    description: 'Legal notice referencing Companies Act and Income Tax Act violations. For corporate clients and tax compliance pressure.',
    sendVia: 'Registered Post',
    link: 'https://docs.google.com/document/d/1W3Z7An_gWCCCO2MXXuYWjlOfhjA7cDVbeH7HM7Pl7H4/edit?tab=t.0'
  },
  {
    id: 7,
    title: 'Immediate Action Required',
    stage: 'Final Recovery Notice',
    category: 'warning',
    categoryLabel: 'Urgent Action',
    icon: Zap,
    color: '#f59e0b',
    description: 'Urgent notice creating immediate sense of crisis and action. For clients approaching legal action threshold.',
    sendVia: 'Email, WhatsApp, Courier',
    link: 'https://docs.google.com/document/d/1M8O0So11AHk_-ju2SeyTCIbFh_ca4bp0BrhoGCZNlLA/edit?usp=sharing'
  },
  {
    id: 8,
    title: 'Legal Reminder Notice',
    stage: 'Formal Payment Notice',
    category: 'legal',
    categoryLabel: 'Legal Notice',
    icon: ScrollText,
    color: '#7c3aed',
    description: 'Formal legal reminder notice referencing outstanding dues and legal implications of non-payment.',
    sendVia: 'Registered Post, Email',
    link: 'https://docs.google.com/document/d/19DpzoOdjR1BxbzzgaZZ0GlxbMh1MuEcyHwGe6GqkhnQ/edit?tab=t.0'
  },
  {
    id: 9,
    title: 'Legal Notice - Cheque Bounce',
    stage: 'Section 138 NI Act Notice',
    category: 'legal',
    categoryLabel: 'Cheque Bounce',
    icon: FileWarning,
    color: '#dc2626',
    description: 'Specific notice for bounced cheques. References Section 138 and 420 of Negotiable Instruments Act for criminal action.',
    sendVia: 'Registered Post, Email',
    link: 'https://docs.google.com/document/d/1YS-5mbeP2pLPKp81GgG4MFuDq_zmKgustMYmIiIaIf4/edit?tab=t.0'
  },
  {
    id: 10,
    title: 'Asset Seizure Notification',
    stage: 'Legal Recovery & Seizure Notice',
    category: 'warning',
    categoryLabel: 'Asset Action',
    icon: BadgeAlert,
    color: '#ef4444',
    description: 'Legal notice threatening asset seizure and attachment. Includes details of potential items for seizure.',
    sendVia: 'Registered Post, Email',
    link: 'https://docs.google.com/document/d/17_Lfuu14I09YUmNiEDwZmtsvXvhZ3MTQ6OkaEwbCH2s/edit?tab=t.0'
  }
];

// Special Notices Data
const specialNotices = [
  {
    id: 11,
    title: 'Handwritten Notice - Hindi',
    stage: 'Personal Touch Notice',
    category: 'action',
    categoryLabel: 'Hindi Format',
    icon: PenTool,
    color: '#10b981',
    description: 'Handwritten notice in Hindi. Creates personal connection and local credibility for Hindi-speaking clients.',
    sendVia: 'Hard Copy by Hand/Post',
    link: 'https://docs.google.com/document/d/14MClYx2kFqhKXzKr_ab1w1350wkgtVGG1EErrcMPPhM/edit?tab=t.0'
  },
  {
    id: 12,
    title: 'Handwritten Notice - English',
    stage: 'Personal Touch Notice',
    category: 'action',
    categoryLabel: 'English Format',
    icon: FileEdit,
    color: '#10b981',
    description: 'Handwritten notice in English. Personal and formal approach for establishing human connection.',
    sendVia: 'Hard Copy by Hand/Post',
    link: 'https://docs.google.com/document/d/1Y1QbLegJceaE8gydFOqhVIWmeubf-vQJvAt68j-tFbQ/edit?tab=t.0'
  },
  {
    id: 13,
    title: 'Consent & Action Approval Letter',
    stage: 'Authorization Document',
    category: 'action',
    categoryLabel: 'Authority',
    icon: FileCheck,
    color: '#06b6d4',
    description: 'Letter obtaining client consent and approval for recovery actions. Essential for field operations.',
    sendVia: 'Female recovery teams, asset seizure authorization',
    link: 'https://docs.google.com/document/d/1mSWzdwL9LdySEOWZNELD_ixnnmrhOVn8RkCJNe40oLU/edit?tab=t.0'
  },
  {
    id: 14,
    title: 'Authority Letter for Female Staff',
    stage: 'Field Recovery Authorization',
    category: 'action',
    categoryLabel: 'Field Recovery',
    icon: UserCheck,
    color: '#8b5cf6',
    description: 'Authorization letter for female recovery staff to visit client premises. Creates official authority and credibility.',
    sendVia: 'Day 30 field operations',
    link: 'https://docs.google.com/document/d/11BOVGuf3hdxC5IhBq3eqsxkS6pHH9H0mcmdv5sRaDp4/edit?tab=t.0'
  },
  {
    id: 15,
    title: '6 Month Follow-up Notice',
    stage: 'Long-term Follow-up',
    category: 'early',
    categoryLabel: 'Extended Timeline',
    icon: Calendar,
    color: '#3b82f6',
    description: 'Notice for long-standing pending payments. Reinvigorates recovery efforts on old dues.',
    sendVia: 'Email, WhatsApp, Registered Post',
    link: 'https://docs.google.com/document/d/1_4Nvqti2wK6PO8mvMpd5wVVL4Fdo-Tow8WbEhrjJsfA/edit?tab=t.0'
  },
  {
    id: 16,
    title: 'Urgent Outstanding Payment Notice',
    stage: 'Emergency Notice',
    category: 'warning',
    categoryLabel: 'Emergency',
    icon: AlertOctagon,
    color: '#ef4444',
    description: 'Urgent notice for high-value outstanding payments. Emphasizes criticality and immediate action needed.',
    sendVia: 'Email, WhatsApp, Courier',
    link: 'https://docs.google.com/document/d/1dkdYsTXF8_NUceba1ZM_Dvpzhci6eO2AF5-mqKBPnR0/edit?tab=t.0'
  },
  {
    id: 17,
    title: 'Refreshing Pending Payments Notice',
    stage: 'PRM Notice',
    category: 'early',
    categoryLabel: 'Reminder',
    icon: RefreshCw,
    color: '#06b6d4',
    description: 'Notice to refresh and restart recovery process for pending payments in Payment Recovery Management system.',
    sendVia: 'Email, WhatsApp',
    link: 'https://docs.google.com/document/d/1ewE-y4EW1idw5VRuHE94qVAQYt3L1mSTsEmcgQ6_5mk/edit?usp=sharing'
  },
  {
    id: 18,
    title: 'New Updated Payment Terms Notice',
    stage: 'Terms Update Notice',
    category: 'action',
    categoryLabel: 'Policy Update',
    icon: FileSignature,
    color: '#10b981',
    description: 'Notice informing client of updated payment terms and conditions for future transactions.',
    sendVia: 'Email, WhatsApp',
    link: 'https://docs.google.com/document/d/14BAo7fTNHtRxZfi9vpMjYdoxttS0qBJl8MEk_EHe59E/edit?tab=t.0'
  }
];

// Email & GST Notices Data
const emailGstNotices = [
  {
    id: 19,
    title: 'Email Notice',
    stage: 'Digital Communication',
    category: 'early',
    categoryLabel: 'Digital Format',
    icon: Mail,
    color: '#3b82f6',
    description: 'Professional email notice template for digital payment recovery communication. Trackable and formal.',
    sendVia: 'Email with read receipt',
    link: 'https://docs.google.com/document/d/1To_4uM0csg3k3ehdHI1D0Cv8VIqBNORn482AugM75WM/edit?tab=t.0'
  },
  {
    id: 20,
    title: 'Export Notice',
    stage: 'Export Business Notice',
    category: 'legal',
    categoryLabel: 'Export Controls',
    icon: Globe,
    color: '#7c3aed',
    description: 'Notice for export-related outstanding payments. Includes compliance references and export control warnings.',
    sendVia: 'Email, Registered Post',
    link: 'https://docs.google.com/document/d/14I27bLtNxlAl5pVtB4GxVJehV2cFWdGbl_ORkwCCI74/edit?tab=t.0'
  },
  {
    id: 21,
    title: 'GST Cancellation Notice',
    stage: '2-Part GST Notice',
    category: 'legal',
    categoryLabel: 'GST Action',
    icon: Receipt,
    color: '#dc2626',
    description: 'Two-letter notice threatening GST cancellation and reporting to tax authorities for non-payment.',
    sendVia: 'Email, Registered Post',
    link: 'https://docs.google.com/document/d/1vfK6QD6AkdrzxB0MQIYZeHSv_c2mATkj2PZkxLqziJo/edit?tab=t.0'
  },
  {
    id: 22,
    title: 'GST Notice - Part 2',
    stage: 'GST Escalation Notice',
    category: 'warning',
    categoryLabel: 'GST Escalation',
    icon: FileWarning,
    color: '#f59e0b',
    description: 'Part 2 of GST notice with escalated threats of GST authority reporting and tax investigation.',
    sendVia: 'Email, Registered Post',
    link: 'https://docs.google.com/document/d/16KbbYO5GtAmrWNJxCdAjcFy1QokxEuzUfN4YAu68fR4/edit?tab=t.0'
  },
  {
    id: 23,
    title: 'Police Letter',
    stage: 'Police Action Notice',
    category: 'legal',
    categoryLabel: 'Police Referral',
    icon: Shield,
    color: '#7c3aed',
    description: 'Legal notice threatening police complaint for financial cheating and breach of trust under criminal law.',
    sendVia: 'Registered Post',
    link: 'https://docs.google.com/document/d/1FhWSIHbVipPcitN-QNqJABHrSrmbK2bpqdOJZ1vtbR4/edit?tab=t.0'
  },
  {
    id: 24,
    title: 'Written Commitment Sheet',
    stage: 'Recovery Process Agreement',
    category: 'action',
    categoryLabel: 'Agreement',
    icon: Stamp,
    color: '#10b981',
    description: 'Written commitment form for client acknowledgment of outstanding dues and recovery timeline agreement.',
    sendVia: 'Client signature during recovery meeting',
    link: 'https://docs.google.com/document/d/1Sw2snc8hGF2lWhq9kdIOd1e2NmpwwvqkEkOz32VDEMY/edit?tab=t.0'
  }
];

// Market Association Notices Data
const marketNotices = [
  {
    id: 25,
    title: 'Recovery by Landlord',
    stage: 'Property Owner Recovery',
    category: 'early',
    categoryLabel: 'Landlord Action',
    icon: Building2,
    color: '#3b82f6',
    description: 'Notice coordinating with property landlord/owner for rent withholding or property restrictions in recovery.',
    sendVia: 'Email, WhatsApp',
    link: 'https://docs.google.com/document/d/1bOwJrBzS7qzLPpqqA1aZgaL9CV4YXsuwFrw6dqX2Q9Y/edit?usp=sharing'
  },
  {
    id: 26,
    title: 'Recovery Through Market Association',
    stage: '3-Part Notice Series',
    category: 'early',
    categoryLabel: 'Market Pressure',
    icon: Store,
    color: '#06b6d4',
    description: 'Three-part notice series to market associations and traders for coordinated pressure recovery.',
    sendVia: 'Request Letters Available (1, 2, 3)',
    link: 'https://docs.google.com/document/d/1bOwJrBzS7qzLPpqqA1aZgaL9CV4YXsuwFrw6dqX2Q9Y/edit?usp=sharing'
  },
  {
    id: 27,
    title: 'Payment Defaulter Alert',
    stage: 'Association Alert Notice',
    category: 'warning',
    categoryLabel: 'Public Alert',
    icon: Megaphone,
    color: '#f59e0b',
    description: 'Alert to market association members and traders about payment defaulter status for business community pressure.',
    sendVia: 'Email to Association',
    link: 'https://docs.google.com/document/d/1Vn6z0aHCYbgTj51PkOLnoq4pROtbU2ZTNu8pTGl6RRI/edit?usp=sharing'
  },
  {
    id: 28,
    title: 'Reputation Exposure Method',
    stage: 'Public Exposure Letter',
    category: 'warning',
    categoryLabel: 'Reputation Risk',
    icon: Users,
    color: '#ef4444',
    description: 'Letter threatening reputation exposure in market circles and public disclosure of payment default.',
    sendVia: 'Email, WhatsApp',
    link: 'https://docs.google.com/document/d/1i1OhO3mXmpAZezsTZq9gNpfmu5n6AWRYsBSRFogZQqk/edit?tab=t.0'
  },
  {
    id: 29,
    title: 'Payment Terms Update - Existing Clients',
    stage: 'Updated Terms Notice',
    category: 'action',
    categoryLabel: 'Policy',
    icon: FileEdit,
    color: '#10b981',
    description: 'Notice to existing clients about updated payment terms due to outstanding payment issues.',
    sendVia: 'Email, WhatsApp',
    link: 'https://docs.google.com/document/d/1U2rHFCL8sjXbOTHwhdEFwF9DPqAGmIqfq3cEbIhmgBE/edit?tab=t.0'
  }
];

// Timeline Data
const timelineStages = [
  {
    stage: 'Stage 1: 15-30 Days Late',
    title: 'Gentle reminder notice to start recovery process',
    focus: 'Focus: Friendly reminder and early intervention',
    icon: Clock,
    color: '#3b82f6'
  },
  {
    stage: 'Stage 2: 30-60 Days Late',
    title: 'Formal payment notice with stronger tone',
    focus: 'Focus: Establishing urgency and documentation',
    icon: AlertTriangle,
    color: '#f59e0b'
  },
  {
    stage: 'Stage 3: 60-90 Days Late',
    title: 'Fear creation notice with legal references',
    focus: 'Focus: Creating urgency with consequences',
    icon: Shield,
    color: '#ef4444'
  },
  {
    stage: 'Stage 4: 90+ Days Late',
    title: 'Final demand notice and legal escalation',
    focus: 'Focus: Final warning before legal action',
    icon: Gavel,
    color: '#dc2626'
  }
];

// Notice Card Component
const NoticeCard = ({ notice, index }) => {
  const IconComponent = notice.icon;
  
  return (
    <motion.div
      className="notice-card-modern"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div className="notice-card-header" style={{ background: `linear-gradient(135deg, ${notice.color} 0%, ${notice.color}dd 100%)` }}>
        <div className="notice-card-icon-wrapper">
          <IconComponent size={28} className="notice-card-icon" />
        </div>
        <div className="notice-card-number">#{notice.id.toString().padStart(2, '0')}</div>
      </div>
      
      <div className="notice-card-content">
        <h3 className="notice-card-title">{notice.title}</h3>
        <span className={`notice-category-badge ${notice.category}`}>
          {notice.categoryLabel}
        </span>
        <p className="notice-card-stage">
          <TrendingUp size={14} />
          {notice.stage}
        </p>
        <p className="notice-card-description">{notice.description}</p>
        <div className="notice-card-send-via">
          <Send size={14} />
          <span><strong>Send Via:</strong> {notice.sendVia}</span>
        </div>
      </div>
      
      <div className="notice-card-footer">
        <a 
          href={notice.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="notice-access-btn"
          style={{ background: `linear-gradient(135deg, ${notice.color} 0%, ${notice.color}cc 100%)` }}
        >
          <FileText size={16} />
          <span>Access Template</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </motion.div>
  );
};

const Notices = () => {
  const { user } = useAuth();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="notices-page-modern">
      {/* Fixed Floating Button */}
      <Link to="/" className="floating-btn-course">
        <HomeIcon size={18} />
        <span>Go to Course</span>
      </Link>

      {/* Hero Section */}
      <section className="notices-hero-modern">
        <div className="hero-bg-pattern"></div>
        <div className="hero-content-wrapper">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles size={16} />
            <span>Complete Notice Library</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Payment Recovery Notices
          </motion.h1>
          
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Professional templates for every stage of payment recovery
          </motion.p>
          
          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="hero-stat">
              <span className="stat-number">29+</span>
              <span className="stat-label">Notice Templates</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">5</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">4</span>
              <span className="stat-label">Recovery Stages</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="notices-main-container">
        {/* How to Use Alert */}
        <motion.div 
          className="info-alert-modern"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="alert-icon-wrapper">
            <Sparkles size={24} />
          </div>
          <div className="alert-content">
            <strong>💡 How to Use These Notices:</strong>
            <p>These notices are designed to be sent progressively based on payment delay stages. Start with Standard Notice 1 and escalate based on response and payment status. All notices should be sent via registered post, email, and WhatsApp for maximum effectiveness.</p>
          </div>
        </motion.div>

        {/* Standard Notices Section */}
        <section className="notices-section-modern" id="standard">
          <motion.div 
            className="section-header-modern"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-icon-wrapper blue">
              <FileText size={28} />
            </div>
            <div className="section-title-wrapper">
              <h2>Standard Payment Recovery Notices</h2>
              <p>Progressive notice templates for systematic payment recovery</p>
            </div>
            <div className="section-count">{standardNotices.length} Templates</div>
          </motion.div>
          
          {/* Timeline Section */}
          <motion.div 
            className="timeline-section-modern"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="timeline-header">
              <TrendingUp size={20} />
              <h3>Escalation Timeline</h3>
            </div>
            <p className="timeline-intro">Use these notices in sequence as payment delays increase:</p>
            <div className="timeline-modern">
              {timelineStages.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div 
                    className="timeline-item-modern" 
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <div className="timeline-marker" style={{ background: item.color }}>
                      <IconComponent size={18} />
                    </div>
                    <div className="timeline-content-modern">
                      <h4>{item.stage}</h4>
                      <p>{item.title}</p>
                      <span className="timeline-focus-tag">{item.focus}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <div className="notices-grid-modern">
            {standardNotices.map((notice, index) => (
              <NoticeCard key={notice.id} notice={notice} index={index} />
            ))}
          </div>
        </section>

        {/* Legal & Final Notices */}
        <section className="notices-section-modern" id="legal">
          <motion.div 
            className="section-header-modern"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-icon-wrapper purple">
              <Scale size={28} />
            </div>
            <div className="section-title-wrapper">
              <h2>Legal & Final Notices</h2>
              <p>Formal legal notices for serious payment defaults</p>
            </div>
            <div className="section-count">{legalNotices.length} Templates</div>
          </motion.div>
          
          <motion.div 
            className="danger-alert-modern"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="alert-icon-wrapper danger">
              <AlertTriangle size={24} />
            </div>
            <div className="alert-content">
              <strong>⚠️ Important:</strong>
              <p>These legal notices should only be sent through qualified lawyers. Do not send without legal counsel for maximum legal validity.</p>
            </div>
          </motion.div>

          <div className="notices-grid-modern">
            {legalNotices.map((notice, index) => (
              <NoticeCard key={notice.id} notice={notice} index={index} />
            ))}
          </div>
        </section>

        {/* Special & Situational Notices */}
        <section className="notices-section-modern" id="special">
          <motion.div 
            className="section-header-modern"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-icon-wrapper green">
              <Target size={28} />
            </div>
            <div className="section-title-wrapper">
              <h2>Special & Situational Notices</h2>
              <p>Specialized templates for unique recovery situations</p>
            </div>
            <div className="section-count">{specialNotices.length} Templates</div>
          </motion.div>

          <div className="notices-grid-modern">
            {specialNotices.map((notice, index) => (
              <NoticeCard key={notice.id} notice={notice} index={index} />
            ))}
          </div>
        </section>

        {/* Email & GST Notices */}
        <section className="notices-section-modern">
          <motion.div 
            className="section-header-modern"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-icon-wrapper cyan">
              <Mail size={28} />
            </div>
            <div className="section-title-wrapper">
              <h2>Email, GST & Authority Notices</h2>
              <p>Digital and tax compliance related notices</p>
            </div>
            <div className="section-count">{emailGstNotices.length} Templates</div>
          </motion.div>

          <div className="notices-grid-modern">
            {emailGstNotices.map((notice, index) => (
              <NoticeCard key={notice.id} notice={notice} index={index} />
            ))}
          </div>
        </section>

        {/* Market Association & Reputation Notices */}
        <section className="notices-section-modern">
          <motion.div 
            className="section-header-modern"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-icon-wrapper orange">
              <Building2 size={28} />
            </div>
            <div className="section-title-wrapper">
              <h2>Market Association & Reputation Notices</h2>
              <p>Community and business network pressure notices</p>
            </div>
            <div className="section-count">{marketNotices.length} Templates</div>
          </motion.div>

          <div className="notices-grid-modern">
            {marketNotices.map((notice, index) => (
              <NoticeCard key={notice.id} notice={notice} index={index} />
            ))}
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
            <h3>Need Help with Notices?</h3>
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

        {/* Back to Main Course */}
        <motion.div 
          className="back-home-wrapper"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link to="/" className="back-home-btn">
            <ArrowLeft size={18} />
            <span>Back to Main Course</span>
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="notices-footer-modern">
        <p>© 2025 Payment Recovery Superstar Training Kit. All Rights Reserved.</p>
      </footer>

      {/* Scroll to Top Button */}
      <motion.button 
        className={`scroll-top-btn ${showScrollTop ? 'show' : ''}`}
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronUp size={24} />
      </motion.button>
    </div>
  );
};

export default Notices;
