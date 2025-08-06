import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/apiService';
import './ForumPage.css';

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null); // Assuming user state is managed here or via context

  useEffect(() => {
    const checkUserStatus = async () => {
        try {
            const res = await apiService.checkStatus();
            if (res.data.isLoggedIn) {
                setUser(res.data.user);
            }
        } catch (error) {
            console.error('Error checking user status:', error);
        }
    };

    const fetchPosts = async () => {
      try {
        const response = await apiService.getForumPosts();
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching forum posts:', error);
      }
    };

    checkUserStatus();
    fetchPosts();
  }, []);

  return (
    <div className="forum-page py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="display-5">Community Forum</h1>
          {user && (
            <Link to="/forum/new" className="btn btn-primary">New Post</Link>
          )}
        </div>

        <div className="card shadow-sm">
          <ul className="list-group list-group-flush">
            {posts.map(post => (
              <li key={post.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <Link to={`/forum/${post.id}`} className="h5 text-decoration-none">{post.title}</Link>
                  <p className="mb-0 text-muted">Posted by {post.author} on {new Date(post.timestamp).toLocaleDateString()}</p>
                </div>
                <span className="badge bg-light text-dark">X Replies</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ForumPage;