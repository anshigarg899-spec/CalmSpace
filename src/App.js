import React, { useState } from 'react';
import Home from './Home';
import AboutUs from './AboutUs';
import Services from './Services';
import ContactUs from './ContactUs';
import Yara from './Yara';
import MoodTracker from './MoodTracker';
import Meditation from './Meditation';

function App() {
  const [page, setPage] = useState('home');

  const renderPage = () => {
    switch (page) {
      case 'about':
        return <AboutUs />;
      case 'services':
        return <Services setPage={setPage} />;
      case 'contact':
        return <ContactUs />;
      case 'yara':
        return (
          <Yara
            goToMeditation={() => setPage('meditation')}
            goToHome={() => setPage('home')}
          />
        );
      case 'meditation':
        return <Meditation />;
      case 'moodtracker':
        return <MoodTracker />;
      default:
        return <Home setPage={setPage} />;
    }
  };

  return (
    <div>
      {/* Back button only if not on Home */}
      {page !== 'home' && (
        <button
          onClick={() => setPage('home')}
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            zIndex: 1000,
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)'
          }}
        >
          ← Back
        </button>
      )}

      {renderPage()}
    </div>
  );
}

export default App;
