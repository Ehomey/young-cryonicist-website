import React, { useState, useEffect } from 'react';

function Contact() {
  const [content, setContent] = useState('Loading...');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/content/contact')
      .then(response => response.json())
      .then(data => {
        if (data.content) {
          setContent(data.content);
        } else {
          setContent('No content available for this page. Please add content via the admin dashboard.');
        }
      })
      .catch(error => {
        console.error('Error fetching contact content:', error);
        setContent('Error loading content.');
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2>Contact Us</h2>
      <p>{content}</p>
    </div>
  );
}

export default Contact;