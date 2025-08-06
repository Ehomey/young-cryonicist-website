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

  const mockNews = [
    {
      id: 1,
      title: 'Breakthrough in Cryopreservation Techniques',
      content: 'Researchers at the Cryonics Institute have announced a significant advancement in cryopreservation, improving cell viability by 15%. This new technique promises to enhance the long-term preservation of biological samples and could have profound implications for human cryopreservation.',
      author: 'Dr. Jane Doe',
      timestamp: '2025-03-15T10:00:00Z'
    },
    {
      id: 2,
      title: 'Young Cryonicists Summit 2025 Announced',
      content: 'Join us for the largest gathering of young cryonicists worldwide. Network, learn, and contribute to the future of the movement. Registration opens next month with early bird pricing available.',
      author: 'Alex Thompson',
      timestamp: '2025-03-12T14:30:00Z'
    },
    {
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