import React from 'react';
import './Services.css';
import bgImage from './assets/services-bg.jpg'; // Adjust path if in subfolder

function Services({ setPage }) {
  return (
    <div className="services-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="services-overlay">
        <h2>Our Services</h2>
        <div className="service-buttons">
          <button onClick={() => setPage('meditation')}>🧘‍♀️ Meditation</button>
          <button onClick={() => setPage('moodtracker')}>📊 Mood Tracker</button>
        </div>
      </div>
    </div>
  );
}

export default Services;
