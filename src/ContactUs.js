import React from "react";
import bgImage from "./assets/services-bg.jpg";

function ContactUs() {
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
          maxWidth: "600px",
          background: "#ffffffcc",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you! Whether you have feedback, questions, or just need someone to talk to — reach out to us.
        </p>
        <ul>
          <li>Email: support@calmspace.app</li>
          <li>Instagram: @calmspace</li>
          <li>Twitter: @calmspace_app</li>
        </ul>
      </div>
    </div>
  );
}

export default ContactUs;
