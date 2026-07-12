import React from "react";
import bgImage from "./assets/services-bg.jpg";

function AboutUs() {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "30px",
        color: "#000", // black text
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          background: "#ffffffcc",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <h1>About Us</h1>
        <p>
          CalmSpace is a mental wellness platform designed to help you track your emotions, meditate, and talk to our AI-powered assistant Yara. Our mission is to make mental health support accessible, compassionate, and personalized for everyone.
        </p>
        <p>
          Whether you’re feeling overwhelmed or simply want to take a moment to breathe, CalmSpace is here to guide you with tools, tips, and a calm space just for you.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
