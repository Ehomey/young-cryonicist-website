import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import './RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match.');
    }

    try {
      await apiService.register({ username: formData.username, password: formData.password });
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg o-hidden border-0 my-5">
              <div className="card-body p-0">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                  {success && <div className="alert alert-success">{success}</div>}
                  <form className="user" onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <input type="text" name="username" className="form-control form-control-user" placeholder="Username" onChange={handleChange} required />
                    </div>
                    <div className="form-group row mb-3">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input type="password" name="password" className="form-control form-control-user" placeholder="Password" onChange={handleChange} required />
                      </div>
                      <div className="col-sm-6">
                        <input type="password" name="confirmPassword" className="form-control form-control-user" placeholder="Repeat Password" onChange={handleChange} required />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-user btn-block w-100">
                      Register Account
                    </button>
                    <hr />
                     <a href="#" className="btn btn-google btn-user btn-block w-100 mb-2">
                      <i className="fab fa-google fa-fw"></i> Register with Google
                    </a>
                    <a href="#" className="btn btn-facebook btn-user btn-block w-100">
                      <i className="fab fa-facebook-f fa-fw"></i> Register with Facebook
                    </a>
                  </form>
                  <hr />
                  <div className="text-center">
                    <Link className="small" to="/login">Already have an account? Login!</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;