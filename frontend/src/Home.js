import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import EventForm from './EventForm';

function Home() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const fetchEvents = () => {
    fetch('http://127.0.0.1:5000/events')
      .then(response => response.json())
      .then(data => setEvents(data.events))
      .catch(error => console.error('Error fetching events:', error));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSaveEvent = (eventData) => {
    if (currentEvent) {
      // Update existing event
      fetch(`http://127.0.0.1:5000/events/${currentEvent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      })
        .then(response => response.json())
        .then(() => {
          fetchEvents();
          setShowForm(false);
          setCurrentEvent(null);
        })
        .catch(error => console.error('Error updating event:', error));
    } else {
      // Add new event
      fetch('http://127.0.0.1:5000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      })
        .then(response => response.json())
        .then(() => {
          fetchEvents();
          setShowForm(false);
        })
        .catch(error => console.error('Error adding event:', error));
    }
  };

  const handleEditClick = (event) => {
    setCurrentEvent(event);
    setShowForm(true);
  };

  const handleDeleteClick = (eventId) => {
    fetch(`http://127.0.0.1:5000/events/${eventId}`, {
      method: 'DELETE',
    })
      .then(() => {
        fetchEvents();
      })
      .catch(error => console.error('Error deleting event:', error));
  };

  return (
    <div className="home-page">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Young Cryonicists</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
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

      <section className="events-section py-5">
        <div className="container">
          <h2 className="text-center mb-4">Upcoming Events</h2>
          <button className="btn btn-success mb-3" onClick={() => { setShowForm(true); setCurrentEvent(null); }}>Add New Event</button>

          {showForm && (
            <div className="card p-4 mb-4">
              <h3>{currentEvent ? 'Edit Event' : 'Add Event'}</h3>
              <EventForm currentEvent={currentEvent} onSave={handleSaveEvent} />
              <button className="btn btn-secondary mt-3" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          )}

          <div className="row">
            {events.length > 0 ? (
              events.map(event => (
                <div key={event.id} className="col-md-4 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{event.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{event.date}</h6>
                      <p className="card-text">{event.description}</p>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditClick(event)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(event.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No events found.</p>
            )}
          </div>
        </div>
      </section>

      <footer className="footer bg-dark text-white text-center py-3">
        <div className="container">
          <p>&copy; 2025 Young Cryonicists. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;