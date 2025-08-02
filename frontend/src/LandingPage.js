
import React from 'react';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">Young Cryonicists</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Events</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header className="hero-section text-center text-white">
        <div className="container">
          <h1 className="display-4">Welcome to the Young Cryonicists</h1>
          <p className="lead">A community for young people interested in cryonics and life extension.</p>
          <a href="#" className="btn btn-primary btn-lg">Learn More</a>
        </div>
      </header>

      <footer className="footer bg-dark text-white text-center py-3">
        <div className="container">
          <p>&copy; 2025 Young Cryonicists. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
