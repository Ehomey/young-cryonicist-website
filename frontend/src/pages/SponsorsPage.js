import React from 'react';
import './SponsorsPage.css';

const sponsors = {
  platinum: [
    {
      name: 'CryoCorp',
      logoUrl: 'https://via.placeholder.com/250x150?text=CryoCorp',
      website: '#'
    }
  ],
  gold: [
    {
      name: 'FutureLife Foundation',
      logoUrl: 'https://via.placeholder.com/200x120?text=FutureLife',
      website: '#'
    },
    {
      name: 'Alcor',
      logoUrl: 'https://via.placeholder.com/200x120?text=Alcor',
      website: '#'
    }
  ],
  silver: [
    {
      name: 'Suspended Animation Inc.',
      logoUrl: 'https://via.placeholder.com/150x90?text=SAI',
      website: '#'
    },
    {
      name: 'Cryonics Institute',
      logoUrl: 'https://via.placeholder.com/150x90?text=CI',
      website: '#'
    },
    {
      name: 'Tomorrow\'s People',
      logoUrl: 'https://via.placeholder.com/150x90?text=Tomorrow\'s+People',
      website: '#'
    }
  ]
};

const SponsorsPage = () => {
  return (
    <div className="sponsors-page py-5">
      <div className="container">
        <h1 className="display-4 text-center mb-4">Our Valued Sponsors</h1>
        <p className="lead text-center mb-5">We are incredibly grateful for the support of our sponsors, who make this event possible.</p>

        <div className="sponsor-tier">
          <h2 className="tier-title platinum-title">Platinum</h2>
          <div className="row justify-content-center">
            {sponsors.platinum.map((sponsor, index) => (
              <div key={index} className="col-md-4 text-center">
                <a href={sponsor.website} target="_blank" rel="noopener noreferrer">
                  <img src={sponsor.logoUrl} alt={sponsor.name} className="img-fluid sponsor-logo"/>
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="sponsor-tier mt-5">
          <h2 className="tier-title gold-title">Gold</h2>
          <div className="row justify-content-center">
            {sponsors.gold.map((sponsor, index) => (
              <div key={index} className="col-md-3 text-center">
                 <a href={sponsor.website} target="_blank" rel="noopener noreferrer">
                  <img src={sponsor.logoUrl} alt={sponsor.name} className="img-fluid sponsor-logo"/>
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="sponsor-tier mt-5">
          <h2 className="tier-title silver-title">Silver</h2>
          <div className="row justify-content-center">
            {sponsors.silver.map((sponsor, index) => (
              <div key={index} className="col-md-2 text-center">
                 <a href={sponsor.website} target="_blank" rel="noopener noreferrer">
                  <img src={sponsor.logoUrl} alt={sponsor.name} className="img-fluid sponsor-logo-sm"/>
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-5 pt-4 border-top">
            <h3>Become a Sponsor</h3>
            <p>Interested in supporting our mission? Contact us to learn about sponsorship opportunities.</p>
            <a href="mailto:sponsorship@ycmeeting.com" className="btn btn-outline-primary">Get in Touch</a>
        </div>

      </div>
    </div>
  );
};

export default SponsorsPage;