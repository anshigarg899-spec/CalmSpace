import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Chatbot() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hello! I'm Yara. How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");
  const [lang, setLang] = useState("english");
  const [askMeditation, setAskMeditation] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    const userLang = detectLanguage(userMessage);
    setLang(userLang);

    setMessages((prev) => [...prev, { type: "user", text: userMessage }]);
    setInput("");

    setTimeout(() => {
      const botResponse = getResponse(userMessage.toLowerCase());
      setMessages((prev) => [...prev, { type: "bot", text: botResponse }]);
    }, 600);
  };

  const detectLanguage = (text) => {
    const hindiChars = /[अ-ह]/;
    return hindiChars.test(text) ? "hinglish" : "english";
  };

  const getResponse = (text) => {
    if (askMeditation) {
      setAskMeditation(false);
      if (["yes", "haan"].some((word) => text.includes(word))) {
        setTimeout(() => navigate("/meditation"), 1500);
        return lang === "english"
          ? "Great! Taking you to meditation 🧘‍♂️"
          : "Shandar! Chaliye meditation shuru karte hain 🧘‍♂️";
      } else {
        return lang === "english"
          ? "No problem. I'm here if you change your mind!"
          : "Koi baat nahi. Agar mann kare toh zarur batana!";
      }
    }

    if (suggestions.length > 0 && ["yes", "haan"].some((w) => text.includes(w))) {
      const nextIndex = currentSuggestionIndex + 1;
      if (nextIndex < suggestions.length) {
        setCurrentSuggestionIndex(nextIndex);
        return lang === "english"
          ? suggestions[nextIndex] + " Would you like another suggestion?"
          : suggestions[nextIndex] + " Kya aap ek aur sujhav chahenge?";
      } else {
        setSuggestions([]);
        return lang === "english"
          ? "Those were all my suggestions. Hope one helped 😊"
          : "Ye the mere sabhi sujhav. Asha karta hu kuch madad mili hogi 😊";
      }
    }

    if (text.includes("sad") || text.includes("dukh") || text.includes("feel low")) {
      const tips =
        lang === "english"
          ? [
              "Go for a short walk outside 🌳",
              "Talk to a close friend or family member 👪",
              "Try writing down your feelings in a journal ✍️",
              "Listen to your favorite calming music 🎶",
              "Practice deep breathing for 2 minutes 🧘",
              "Watch a light-hearted movie or show 🎬",
              "Take a warm shower 🚿",
              "Drink a glass of water 🥤",
              "Hug a pet or soft toy 🧸",
              "Would you like to try meditation?",
            ]
          : [
              "Bahar halka sa walk lijiye 🌳",
              "Apne kisi close dost ya parivaar se baat kijiye 👪",
              "Apne jazbaat likhne ki koshish kijiye ✍️",
              "Apna favorite music suniye 🎶",
              "2 minute deep breathing practice kijiye 🧘",
              "Koi halka-phulka show ya movie dekhiye 🎬",
              "Ek garam paani ka shower lijiye 🚿",
              "Ek glass paani pi lijiye 🥤",
              "Apne pet ya soft toy ko hug kijiye 🧸",
              "Kya aap meditation try karna chahenge?",
            ];

      setSuggestions(tips);
      setCurrentSuggestionIndex(0);
      return (
        tips[0] +
        (lang === "english"
          ? " Would you like another suggestion?"
          : " Kya aap ek aur sujhav chahenge?")
      );
    }

    if (
      text.includes("meditation") ||
      text.includes("relax") ||
      text.includes("try") ||
      text.includes("kaise shuru kare")
    ) {
      setAskMeditation(true);
      return lang === "english"
        ? "Would you like to try meditation?"
        : "Kya aap meditation try karna chahenge?";
    }

    return lang === "english"
      ? "I'm here to listen and support you. Can you tell me more?"
      : "Main yahan aapki madad ke liye hoon. Thoda aur batayein?";
  };

  return (
    <div className="chatbot-container">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Type something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
