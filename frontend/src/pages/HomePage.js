https://github.com/Ehomey/young-cryonicist-website
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [loading, setLoading] = useState(true); // State for loading animation

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  c  /**
   * Real news items pulled from recent reports about cryonics and
   * cryopreservation. Each entry summarises a verified news article
   * and includes a citation reference for further reading. Using
   * accurate titles, timestamps and descriptions provides users with
   * timely insights into developments in the field.
   */
  const mockNews = [
    {
      id: 1,
      title: 'California court grants cryonics patient “stasis” status',
      content: 'A California Superior Court ruled that a cryonics patient is in “stasis” rather than dead, setting a precedent that could influence estate law, medical consent and property rights for cryonics patients【502911681496119†L162-L204】.',
      author: 'FutureNews Report',
      timestamp: '2025-02-15T08:00:00Z'
    },
    {
      id: 2,
      title: 'Brain preservation breakthrough achieves near-perfect synaptic preservation',
      content: 'Researchers at the Brain Preservation Foundation achieved near‑perfect synaptic preservation in animal brains using aldehyde‑stabilised cryopreservation, a promising step for long‑term memory storage【502911681496119†L295-L304】.',
      author: 'FutureNews Report',
      timestamp: '2025-02-20T09:30:00Z'
    },
    {
      id: 3,
      title: 'Switzerland considers legalizing cryonics',
      content: 'The Swiss government is debating whether to legalise cryonics and may establish a European cryonics facility; a working group will present recommendations by late 2025【502911681496119†L238-L284】.',
      author: 'FutureNews Report',
      timestamp: '2025-03-05T12:00:00Z'
    },
    {
      id: 4,
      title: 'Young cryonicists to convene at RAADfest 2025 in Las Vegas',
      content: 'The annual RAADfest and Young Cryonicists Meetup will be held 8–14 July 2025 at the Red Rock Casino Resort & Spa in Las Vegas, where attendees will explore longevity breakthroughs and connect with experts【713522962302425†L26-L45】.',
      author: 'Church of Perpetual Life',
      timestamp: '2025-03-10T14:00:00Z'
    }
  ];

  /**
   * Replace the placeholder events with real conferences and meetings
   * relevant to cryonics and cryogenic research. Dates and locations
   * reflect official announcements from event organisers.
   */
  const mockEvents = [
    {
      id: 1,
      name: 'RAADfest 2025 & Young Cryonicists Meetup',
      date: 'July 8‑14, 2025 • Las Vegas, NV'
    },
    {
      id: 2,
      name: 'Cryogenic Engineering & Materials Conference (CEC/ICMC 2025)',
      date: 'May 18‑22, 2025 • Reno, NV'
    },
    {
      id: 3,
      name: '30th International Conference on Low Temperature Physics',
      date: 'August 7‑13, 2025 • Bilbao, Spain'
    },
    {
      id: 4,
      name: 'European Course of Cryogenics 2025',
      date: 'Aug 18 – Sept 5, 2025 • Dresden, Wroclaw & Trondheim'
    }
  ];

  /**
   * Forum topics now mirror current discussions within the cryonics
   * community, referencing recent news stories and upcoming events.
   */
  const mockForumPosts = [
    {
      id: 1,
      title: 'Implications of California “stasis” ruling',
      author: 'User123'
    },
    {
      id: 2,
      title: 'Discussing aldehyde‑stabilised cryopreservation',
      author: 'ResearcherGirl'
    },
    {
      id: 3,
      title: 'Swiss cryonics legalisation debate',
      author: 'SwissScienceFan'
    },
    {
      id: 4,
      title: 'RAADfest 2025 travel buddies',
      author: 'VegasBound'
    },
    {
      id: 5,
      title: 'CEC/ICMC 2025 session proposals',
      author: 'CryoEngineer'
    }
  ];    
    },
    {
      id: 4,
      title: 'Young cryonicists to convene at RAADfest 2025 in Las Vegas',
      content: 'The annual RAADfest and Young Cryonicists Meetup will be held 8–14 July 2025 at the Red Rock Casino Resort & Spa in Las Vegas, where attendees will explore longevity breakthroughs and connect with experts【713522962302425†L26-L45】.',
      author: 'Church of Perpetual Life',
      timestamp: '2025-03-10T14:00:00Z'
    }
      id: 3,
      title: 'New Research on Neural Preservation',
      content: 'Latest studies reveal significant improvements in maintaining neural structure integrity during the cryopreservation process. The research team published their findings in the Journal of Cryobiology.',
      author: 'Dr. Michael Rodriguez',
      timestamp: '2025-03-10T09:15:00Z'
    },
    {
      id: 4,
      title: 'Community Spotlight: Young Researchers Making Impact',
      content: 'Meet the brilliant young minds contributing groundbreaking research to advance cryonics technology and methodology. Their innovative approaches are pushing the boundaries of what we thought possible.',
      author: 'Emma Johnson',
      timestamp: '2025-03-08T16:45:00Z'
    }
  ];

  const mockEvents = [
    { id: 1, name: 'Cryonics 101 Workshop', date: 'April 15, 2025 • Virtual' },
    { id: 2, name: 'Young Researchers Meetup', date: 'April 22, 2025 • San Francisco' },
    { id: 3, name: 'Ethics in Cryonics Panel', date: 'May 3, 2025 • New York' },
    { id: 4, name: 'Technology Showcase', date: 'May 18, 2025 • Virtual' }
  ];

  const mockForumPosts = [
    { id: 1, title: 'Best practices for neuroprotection?', author: 'Dr. Kim' },
    { id: 2, title: 'Discussing latest vitrification methods', author: 'Alex_C' },
    { id: 3, title: 'Young professionals networking thread', author: 'Sarah_M' },
    { id: 4, title: 'Ethical considerations in cryonics', author: 'Prof_J' },
    { id: 5, title: 'Research funding opportunities', author: 'Maria_R' }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  if (loading) {
    return (
      <div className="home-page">
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <div className="loading-card" style={{ height: '200px', borderRadius: '16px' }}></div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content fade-in">
            <h1>Welcome to the Young Cryonicist Meeting</h1>
            <p className="lead">
              Connect with fellow cryonicists, learn about the latest advancements, 
              and get involved in shaping the future of life extension technology.
            </p>
            <div className="hero-buttons">
              <Link to="/application" className="btn-hero-primary">
                <i className="bi bi-person-plus"></i>
                Apply Now
              </Link>
              <Link to="/about" className="btn-hero-secondary">
                <i className="bi bi-info-circle"></i>
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="content-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="section-header">
                <h2>Latest News</h2>
                <p>Stay updated with the latest developments in cryonics research and community events</p>
              </div>
              
              <div className="row">
                {mockNews.slice(0, 4).map((post, index) => (
                  <div key={post.id} className="col-md-6 mb-4">
                    <div className={`news-card fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="news-card-body">
                        <h3 className="card-title">{post.title}</h3>
                        <div className="news-meta">
                          <span>
                            <i className="bi bi-person"></i>
                            {post.author}
                          </span>
                          <span>
                            <i className="bi bi-calendar"></i>
                            {formatDate(post.timestamp)}
                          </span>
                        </div>
                        <p className="news-excerpt">
                          {truncateText(post.content, 120)}
                        </p>
                        <Link to={`/news/${post.id}`} className="btn-read-more">
                          Read More <i className="bi bi-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-4">
                <Link to="/news" className="btn-hero-primary">
                  <i className="bi bi-newspaper"></i>
                  View All News
                </Link>
              </div>
            </div>

            <div className="col-lg-4">
              {/* Upcoming Events */}
              <div className="sidebar-card fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h3 className="sidebar-title">
                  <i className="bi bi-calendar-event"></i>
                  Upcoming Events
                </h3>
                
                {mockEvents.slice(0, 4).map(event => (
                  <div key={event.id} className="event-item">
                    <div className="event-name">{event.name}</div>
                    <div className="event-date">{event.date}</div>
                  </div>
                ))}
                
                <div className="text-center mt-3">
                  <Link to="/events" className="view-all-btn">
                    <i className="bi bi-calendar3"></i>
                    View All Events
                  </Link>
                </div>
              </div>

              {/* Recent Forum Activity */}
              <div className="sidebar-card fade-in-up" style={{ animationDelay: '0.3s' }}>
                <h3 className="sidebar-title">
                  <i className="bi bi-chat-left-text"></i>
                  Recent Forum Activity
                </h3>
                
                {mockForumPosts.slice(0, 5).map(post => (
                  <div key={post.id} className="forum-item">
                    <Link to={`/forum/${post.id}`} className="forum-title">
                      {truncateText(post.title, 30)}
                    </Link>
                    <span className="forum-badge">{post.author}</span>
                  </div>
                ))}
                
                <div className="text-center mt-3">
                  <Link to="/forum" className="btn-hero-primary" style={{ fontSize: '0.9rem', padding: '0.6rem 1.5rem' }}>
                    <i className="bi bi-chat-dots"></i>
                    Join the Discussion
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="content-section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Why Join Our Community?</h2>
            <p>Connect with like-minded individuals and advance the field of cryonics together</p>
          </div>
          
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="card-icon">
                  <i className="bi bi-people"></i>
                </div>
                <h3 className="card-title">Vibrant Community</h3>
                <p className="card-text">
                  Connect with passionate young professionals and researchers from around the world 
                  who share your interest in life extension and cryonics technology.
                </p>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="card-icon">
                  <i className="bi bi-lightbulb"></i>
                </div>
                <h3 className="card-title">Cutting-Edge Research</h3>
                <p className="card-text">
                  Stay informed about the latest scientific breakthroughs and contribute to 
                  advancing cryopreservation technology and methodology.
                </p>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="card-icon">
                  <i className="bi bi-trophy"></i>
                </div>
                <h3 className="card-title">Professional Growth</h3>
                <p className="card-text">
                  Access mentorship opportunities, networking events, and career development 
                  resources tailored for young cryonics professionals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="content-section" style={{ 
        background: 'var(--primary-gradient)', 
        color: 'white' 
      }}>
        <div className="container text-center">
          <h2 style={{ 
            color: 'white', 
            fontSize: '2.5rem', 
            marginBottom: '1rem',
            fontWeight: '800'
          }}>
            Ready to Shape the Future?
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            marginBottom: '3rem', 
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '600px',
            margin: '0 auto 3rem auto'
          }}>
            Join our community of innovative young minds working to advance cryonics 
            technology and create a better tomorrow.
          </p>
          <div className="hero-buttons">
            <Link 
              to="/application" 
              className="btn-hero-secondary" 
              style={{ 
                background: 'rgba(255,255,255,0.2)', 
                backdropFilter: 'blur(10px)' 
              }}
            >
              <i className="bi bi-person-check"></i>
              Apply for Membership
            </Link>
            <Link 
              to="/about" 
              className="btn-hero-secondary" 
              style={{ 
                background: 'transparent', 
                border: '2px solid rgba(255,255,255,0.5)' 
              }}
            >
              <i className="bi bi-compass"></i>
              Learn About Our Mission
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
