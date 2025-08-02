import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [aboutContent, setAboutContent] = useState('');
  const [contactContent, setContactContent] = useState('');
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState([]);

  const fetchPageContent = () => {
    // Fetch existing content for About page
    fetch('http://127.0.0.1:5000/content/about')
      .then(response => response.json())
      .then(data => {
        if (data.content) {
          setAboutContent(data.content);
        }
      })
      .catch(error => console.error('Error fetching about content:', error));

    // Fetch existing content for Contact page
    fetch('http://127.0.0.1:5000/content/contact')
      .then(response => response.json())
      .then(data => {
        if (data.content) {
          setContactContent(data.content);
        }
      })
      .catch(error => console.error('Error fetching contact content:', error));
  };

  const fetchImages = () => {
    fetch('http://127.0.0.1:5000/images')
      .then(response => response.json())
      .then(data => setImages(data.images))
      .catch(error => console.error('Error fetching images:', error));
  };

  useEffect(() => {
    fetchPageContent();
    fetchImages();
  }, []);

  const handleSaveContent = (pageName, content) => {
    fetch('http://127.0.0.1:5000/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ page_name: pageName, content: content }),
    })
      .then(response => response.json())
      .then(data => {
        setMessage(data.message);
        setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
      })
      .catch(error => {
        console.error(`Error saving ${pageName} content:`, error);
        setMessage(`Error saving ${pageName} content.`);
      });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    fetch('http://127.0.0.1:5000/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        setMessage(data.message);
        fetchImages(); // Refresh image list
        setSelectedFile(null); // Clear selected file
        setTimeout(() => setMessage(''), 3000);
      })
      .catch(error => {
        console.error('Error uploading image:', error);
        setMessage('Error uploading image.');
      });
  };

  const handleDeleteImage = (imageId) => {
    fetch(`http://127.0.0.1:5000/images/${imageId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        setMessage(data.message);
        fetchImages(); // Refresh image list
        setTimeout(() => setMessage(''), 3000);
      })
      .catch(error => {
        console.error('Error deleting image:', error);
        setMessage('Error deleting image.');
      });
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <div className="card p-4 mb-4">
        <h3>Edit About Page Content</h3>
        <div className="mb-3">
          <label htmlFor="aboutContent" className="form-label">About Content</label>
          <textarea
            className="form-control"
            id="aboutContent"
            rows="10"
            value={aboutContent}
            onChange={(e) => setAboutContent(e.target.value)}
          ></textarea>
        </div>
        <button className="btn btn-primary" onClick={() => handleSaveContent('about', aboutContent)}>Save About Content</button>
      </div>

      <div className="card p-4 mb-4">
        <h3>Edit Contact Page Content</h3>
        <div className="mb-3">
          <label htmlFor="contactContent" className="form-label">Contact Content</label>
          <textarea
            className="form-control"
            id="contactContent"
            rows="10"
            value={contactContent}
            onChange={(e) => setContactContent(e.target.value)}
          ></textarea>
        </div>
        <button className="btn btn-primary" onClick={() => handleSaveContent('contact', contactContent)}>Save Contact Content</button>
      </div>

      <div className="card p-4 mb-4">
        <h3>Image Management</h3>
        <div className="mb-3">
          <label htmlFor="imageUpload" className="form-label">Upload New Image</label>
          <input type="file" className="form-control" id="imageUpload" onChange={handleFileChange} />
        </div>
        <button className="btn btn-primary mb-4" onClick={handleUpload}>Upload Image</button>

        <h4>Uploaded Images</h4>
        <div className="row">
          {images.length > 0 ? (
            images.map(image => (
              <div key={image.id} className="col-md-3 mb-4">
                <div className="card">
                  <img src={`http://127.0.0.1:5000${image.url}`} className="card-img-top" alt={image.filename} />
                  <div className="card-body">
                    <p className="card-text text-truncate">{image.filename}</p>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteImage(image.id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No images uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;