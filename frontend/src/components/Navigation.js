import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar navbar-expand-lg ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={closeMobileMenu}>
          <i className="bi bi-snow2"></i>
          <span>Young Cryonicists</span>
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={handleMobileMenuToggle}
          aria-controls="navbarNav" 
          aria-expanded={isMobileMenuOpen} 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink 
                className="nav-link" 
                to="/"
                onClick={closeMobileMenu}
                style={({ isActive }) => isActive ? { color: 'var(--accent-purple)' } : undefined}
              >
                <i className="bi bi-house"></i>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link" 
                to="/about"
                onClick={closeMobileMenu}
                style={({ isActive }) => isActive ? { color: 'var(--accent-purple)' } : undefined}
              >
                <i className="bi bi-info-circle"></i>
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link" 
                to="/history"
                onClick={closeMobileMenu}
                style={({ isActive }) => isActive ? { color: 'var(--accent-purple)' } : undefined}
              >
                <i className="bi bi-clock-history"></i>
                History
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link" 
                to="/sponsors"
                onClick={closeMobileMenu}
                style={({ isActive }) => isActive ? { color: 'var(--accent-purple)' } : undefined}
              >
                <i className="bi bi-building"></i>
                Sponsors
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link" 
                to="/forum"
                onClick={closeMobileMenu}
                style={({ isActive }) => isActive ? { color: 'var(--accent-purple)' } : undefined}
              >
                <i className="bi bi-chat-left-text"></i>
                Forum
              </NavLink>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link btn btn-primary" 
                to="/application"
                onClick={closeMobileMenu}
              >
                <i className="bi bi-person-plus"></i>
                Apply Now
              </Link>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link" 
                to="/login"
                onClick={closeMobileMenu}
                style={({ isActive }) => isActive ? { color: 'var(--accent-purple)' } : undefined}
              >
                <i className="bi bi-box-arrow-in-right"></i>
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;