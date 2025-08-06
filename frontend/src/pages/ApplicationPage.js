import React, { useState } from 'react';
import apiService from '../services/apiService';
import './ApplicationPage.css';

const ApplicationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await apiService.submitApplication(formData);
      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to submit application. Please try again later.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="container py-5 text-center">
        <div className="application-success">
            <i className="bi bi-check-circle-fill display-1 text-success"></i>
            <h2 className="mt-3">Application Submitted!</h2>
            <p className="lead">Thank you for your interest. We have received your application and will review it shortly. You will receive a confirmation email once a decision has been made.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="application-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg">
              <div className="card-body p-5">
                <h1 className="card-title text-center mb-4">Apply to Attend</h1>
                <p className="text-center text-muted mb-4">Complete the form below to apply for the upcoming Young Cryonicist Meeting. We welcome all who are passionate about the future of cryonics.</p>
                
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Why do you want to attend?</label>
                    <textarea className="form-control" id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
                    <div className="form-text">Please tell us a bit about your background, interests, and what you hope to gain from the event.</div>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">Submit Application</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;