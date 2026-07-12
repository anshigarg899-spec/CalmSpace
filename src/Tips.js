// Tips.js
import React from 'react';

const moodTips = {
  happy: [
    "Keep spreading positivity!",
    "Write in your gratitude journal.",
    "Celebrate small wins."
  ],
  sad: [
    "Take a deep breath and rest.",
    "Talk to someone you trust.",
    "Write your feelings down."
  ],
  anxious: [
    "Try deep breathing exercises.",
    "Take a walk in nature.",
    "Listen to calming music."
  ],
  angry: [
    "Step away for a moment.",
    "Try journaling or physical activity.",
    "Practice counting slowly to 10."
  ],
  default: [
    "Practice mindfulness.",
    "Drink water and eat well.",
    "Make time for something you enjoy."
  ]
};

function Tips({ mood }) {
  const lowerMood = mood?.toLowerCase();
  const tips = moodTips[lowerMood] || moodTips.default;

  return (
    <div>
      <h2>Tips for You</h2>
      <ul>
        {tips.map((tip, idx) => (
          <li key={idx}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}

export default Tips;
