import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsResponse, eventsResponse, appsResponse] = await Promise.all([
          apiService.getNews(),
          apiService.getEvents(),
          apiService.getApplications(),
        ]);
        setNews(newsResponse.data);
        setEvents(eventsResponse.data);
        setApplications(appsResponse.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        // Handle error (e.g., redirect if not authorized)
      }
    };
    fetchData();
  }, []);

  const handleDeleteEvent = async (eventId) => {
      if(window.confirm('Are you sure you want to delete this event?')){
          try {
              await apiService.deleteEvent(eventId);
              setEvents(events.filter(e => e.id !== eventId));
          } catch (error) {
              console.error('Error deleting event', error);
          }
      }
  }

  return (
    <div className="admin-dashboard p-4">
      <h1 className="mb-4">Admin Dashboard</h1>
      <div className="row">
        
        {/* News Management */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">News Management</div>
            <div className="card-body">
              <button className="btn btn-success mb-3">Add News Post</button>
              <ul className="list-group">
                {news.map(item => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {item.title}
                    <div>
                      <button className="btn btn-sm btn-primary me-2">Edit</button>
                      <button className="btn btn-sm btn-danger">Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Event Management */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">Event Management</div>
            <div className="card-body">
              <button className="btn btn-success mb-3">Add Event</button>
              <ul className="list-group">
                {events.map(event => (
                  <li key={event.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {event.name} ({event.date})
                    <div>
                      <button className="btn btn-sm btn-primary me-2">Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Application Management */}
        <div className="col-12 mb-4">
          <div className="card">
            <div className="card-header">Application Management</div>
            <div className="card-body">
               <ul className="list-group">
                {applications.map(app => (
                  <li key={app.id} className="list-group-item">
                    <h5>{app.name} - {app.email}</h5>
                    <p>{app.message}</p>
                    <small>Submitted: {new Date(app.submitted_at).toLocaleString()}</small>
                    <div className="mt-2">
                        <button className="btn btn-sm btn-success me-2">Approve</button>
                        <button className="btn btn-sm btn-warning">Reject</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;