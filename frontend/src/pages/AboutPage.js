import React from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <h1 className="display-4 text-center mb-4">About the Young Cryonicist Meeting</h1>
            <p className="lead text-center mb-5">Fostering the next generation of cryonicists through education, collaboration, and community.</p>

            <div className="card mb-4">
              <div className="card-body">
                <h2 className="h4">Our Mission</h2>
                <p>Our mission is to bring together young people from around the world who are passionate about cryonics. We aim to provide a platform for learning, networking, and discussing the future of life extension. We believe that by fostering a strong community, we can accelerate progress and ensure the long-term viability of cryonics.</p>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h2 className="h4">What to Expect</h2>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><i className="bi bi-mic-fill me-2"></i>Expert talks and presentations from leading researchers.</li>
                  <li className="list-group-item"><i className="bi bi-people-fill me-2"></i>Networking opportunities with peers and established figures.</li>
                  <li className="list-group-item"><i className="bi bi-lightbulb-fill me-2"></i>Workshops and panels on the latest technologies and ethical considerations.</li>
                  <li className="list-group-item"><i className="bi bi-chat-dots-fill me-2"></i>An open and inclusive environment for sharing ideas and asking questions.</li>
                </ul>
              </div>
            </div>

             <div className="text-center mt-5">
                <p>Ready to join the conversation?</p>
                <Link to="/application" className="btn btn-primary btn-lg">Apply to Attend</Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;