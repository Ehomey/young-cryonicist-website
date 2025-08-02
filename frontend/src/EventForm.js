import React, { useState, useEffect } from 'react';

function EventForm({ currentEvent, onSave }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentEvent) {
      setName(currentEvent.name);
      setDate(currentEvent.date);
      setDescription(currentEvent.description);
    } else {
      setName('');
      setDate('');
      setDescription('');
    }
  }, [currentEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, date, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="eventName" className="form-label">Event Name</label>
        <input
          type="text"
          className="form-control"
          id="eventName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="eventDate" className="form-label">Event Date</label>
        <input
          type="date"
          className="form-control"
          id="eventDate"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="eventDescription" className="form-label">Description</label>
        <textarea
          className="form-control"
          id="eventDescription"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        {currentEvent ? 'Update Event' : 'Add Event'}
      </button>
    </form>
  );
}

export default EventForm;
