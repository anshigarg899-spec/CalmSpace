import React, { useState, useEffect } from "react";
import "./Meditation.css"; // 🔄 Import the CSS for animation

function Meditation() {
  const [showTips, setShowTips] = useState(true);
  const [duration, setDuration] = useState(5);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isMeditating, setIsMeditating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audio] = useState(new Audio("/meditation-sound.mp3"));

  const startMeditation = () => {
    setTimeLeft(duration * 60);
    setIsMeditating(true);
    setIsPaused(false);
    audio.loop = true;
    audio.play();
  };

  const togglePause = () => {
    if (isPaused) {
      setIsPaused(false);
      audio.play();
    } else {
      setIsPaused(true);
      audio.pause();
    }
  };

  useEffect(() => {
    let timer;
    if (isMeditating && !isPaused && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && isMeditating) {
      audio.pause();
      setIsMeditating(false);
      alert("Meditation complete. Hope you feel better 🌿");
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isMeditating, isPaused, audio]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      className={`meditation-container ${
        isMeditating && !isPaused ? "animated-bg" : ""
      }`}
    >
      <h2>🧘 Meditation</h2>

      {showTips ? (
        <>
          <p><b>Tips before meditation:</b></p>
          <ul style={{ textAlign: "left" }}>
            <li>Find a quiet and calm space</li>
            <li>Close your eyes gently</li>
            <li>Take deep breaths in and out</li>
            <li>Let your thoughts pass without judgment</li>
            <li>Focus on your breath or calming sounds</li>
          </ul>
          <button onClick={() => setShowTips(false)}>Continue</button>
        </>
      ) : isMeditating ? (
        <>
          <h3>⏳ {isPaused ? "Paused" : "Meditation in progress..."}</h3>
          <h1 style={{ fontSize: "48px" }}>{formatTime(timeLeft)}</h1>
          <button onClick={togglePause}>
            {isPaused ? "Resume" : "Pause"}
          </button>
        </>
      ) : (
        <>
          <label>
            Select Duration (Min):
            <select
              value={duration}
              onChange={(e) => setDuration(Math.max(5, parseInt(e.target.value)))}
              style={{ marginLeft: "10px", padding: "5px" }}
            >
              <option value={5}>5 min</option>
              <option value={10}>10 min</option>
              <option value={15}>15 min</option>
              <option value={20}>20 min</option>
              <option value={30}>30 min</option>
            </select>
          </label>
          <br />
          <button onClick={startMeditation} style={{ marginTop: "10px" }}>
            Start Meditation
          </button>
        </>
      )}
    </div>
  );
}

export default Meditation;
