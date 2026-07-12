import React from 'react';
import './Home.css';
import homeIllustration from './assets/home-illustration.png'; // ✅

function Home({ setPage }) {
  return (
    <div className="home-container" style={{ backgroundImage: `url(${homeIllustration})` }}>
      <h1>🌿 CalmSpace</h1>
      <h2>Track. Heal. Glow.</h2>
      <p>Your companion for mental wellness, mindfulness, and emotional support.</p>

      <button onClick={() => setPage('yara')}>Talk to Us</button>
      <button onClick={() => setPage('about')}>About Us</button>
      <button onClick={() => setPage('services')}>Services</button>
      <button onClick={() => setPage('contact')}>Contact Us</button>

    </div>
  );
}

export default Home;
