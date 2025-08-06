import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import HistoryPage from './pages/HistoryPage';
import SponsorsPage from './pages/SponsorsPage';
import ApplicationPage from './pages/ApplicationPage';
import ForumPage from './pages/ForumPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Import global styles
import './App.css';
import './components/Navigation.css';

// Import page-specific styles
import './pages/HomePage.css';
import './pages/AboutPage.css';
import './pages/HistoryPage.css';
import './pages/SponsorsPage.css';
import './pages/ApplicationPage.css';
import './pages/ForumPage.css';
import './pages/ProfilePage.css';
import './pages/AdminDashboard.css';
import './pages/LoginPage.css';
import './pages/RegisterPage.css';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/sponsors" element={<SponsorsPage />} />
        <Route path="/application" element={<ApplicationPage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;