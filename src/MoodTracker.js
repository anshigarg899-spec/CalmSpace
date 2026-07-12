import React, { useState } from "react";
import Tips from "./Tips";
import "./MoodTracker.css";
import bgImage from "./assets/services-bg.jpg"; // ✅ Make sure this exists

function MoodTracker() {
  const [mood, setMood] = useState("");
  const [history, setHistory] = useState([]);
  const [lastMood, setLastMood] = useState("");

  const handleMoodSubmit = () => {
    if (mood.trim() === "") return;

    const newEntry = {
      mood,
      timestamp: new Date().toLocaleString(),
    };

    setHistory([newEntry, ...history]);
    setLastMood(mood);
    setMood("");
  };

  return (
    <div
      className="mood-tracker-container"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "30px",
        color: "#000", // Black text
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          margin: "auto",
          background: "#f7f4f3cc",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2>📘 Mood Tracker</h2>
        <p>How are you feeling now?</p>

        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
        >
          <option value="">Select Mood</option>
          <option value="happy">😊 Happy</option>
          <option value="sad">😔 Sad</option>
          <option value="angry">😠 Angry</option>
          <option value="anxious">😨 Anxious</option>
          <option value="relaxed">😌 Relaxed</option>
          <option value="stressed">😖 Stressed</option>
          <option value="lazy">😴 Lazy</option>
        </select>

        <button onClick={handleMoodSubmit} style={{ padding: "8px", width: "100%" }}>
          Save Mood
        </button>

        {lastMood && (
          <div style={{ marginTop: "30px", textAlign: "left", color: "#000" }}>
            <Tips mood={lastMood} />
          </div>
        )}

        <h3 style={{ marginTop: "30px" }}>🕒 Mood History</h3>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {history.map((entry, index) => (
            <li key={index} style={{ marginBottom: "8px" }}>
              <b>{entry.mood}</b> — <small>{entry.timestamp}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MoodTracker;
