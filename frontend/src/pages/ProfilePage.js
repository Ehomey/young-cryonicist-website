import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import './ProfilePage.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // This assumes your apiService can fetch the current user's profile
        // You might need to implement getProfile in apiService.js
        const response = await apiService.getProfile(); 
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
      setIsLoading(false);
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return <div className="container py-5">Loading...</div>;
  }

  if (!profile) {
    return <div className="container py-5">Could not load profile. Are you logged in?</div>;
  }

  return (
    <div className="profile-page py-5 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-md-4 text-center">
            <img src={`https://i.pravatar.cc/150?u=${profile.username}`} alt="Profile" className="profile-avatar img-fluid rounded-circle mb-3" />
            <h2 className="h4">{profile.full_name || profile.username}</h2>
            <p className="text-muted">@{profile.username}</p>
            <button className="btn btn-primary btn-sm">Edit Profile</button>
          </div>
          <div className="col-md-8">
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">About Me</h3>
                    <p className="card-text">{profile.bio || 'No bio provided.'}</p>
                    <hr/>
                    <h4 className="h5">My Activity</h4>
                    <p>Forum posts and other activity will be displayed here.</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;