import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await apiService.login(formData);
      navigate('/profile'); // Redirect to profile page on successful login
    } catch (err) {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg o-hidden border-0 my-5">
              <div className="card-body p-0">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <form className="user" onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <input type="text" name="username" className="form-control form-control-user" placeholder="Enter Username..." onChange={handleChange} required />
                    </div>
                    <div className="form-group mb-3">
                      <input type="password" name="password" className="form-control form-control-user" placeholder="Password" onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-user btn-block w-100">
                      Login
                    </button>
                    <hr />
                    <a href="#" className="btn btn-google btn-user btn-block w-100 mb-2">
                      <i className="fab fa-google fa-fw"></i> Login with Google
                    </a>
                    <a href="#" className="btn btn-facebook btn-user btn-block w-100">
                      <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                    </a>
                  </form>
                  <hr />
                  <div className="text-center">
                    <a className="small" href="#">Forgot Password?</a>
                  </div>
                  <div className="text-center">
                    <Link className="small" to="/register">Create an Account!</Link>
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

export default LoginPage;