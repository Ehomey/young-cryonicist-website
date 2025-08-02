import React, { useState, useEffect } from 'react';

function About() {
  const [content, setContent] = useState('Loading...');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/content/about')
      .then(response => response.json())
      .then(data => {
        if (data.content) {
          setContent(data.content);
        } else {
          setContent('No content available for this page. Please add content via the admin dashboard.');
        }
      })
      .catch(error => {
        console.error('Error fetching about content:', error);
        setContent('Error loading content.');
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2>About Us</h2>
      <p>{content}</p>
    </div>
  );
}

export default About;