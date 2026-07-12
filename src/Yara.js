import { useState } from 'react';
import './Yara.css';
import servicesBg from "./assets/services-bg.jpg";
import EmojiPicker from 'emoji-picker-react';

const Yara = ({ goToMeditation }) => {
  const [userInput, setUserInput] = useState('');
  const [chat, setChat] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [chatHistory, setChatHistory] = useState(() => {
    const saved = localStorage.getItem('yara_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [lang, setLang] = useState('en');

  const emotionTriggers = ['sad', 'stressed', 'angry', 'aggressive', 'dukhi', 'tensed', 'gussa', 'gusse'];
  const suggestionList = {
    en: [
      'Go for a short walk outside.',
      'Try a few deep breathing exercises.',
      'Drink a glass of water.',
      'Talk to a close friend.',
      'Write your thoughts in a journal.',
    ],
    hi: [
      'Thoda bahar walk kar lo.',
      'Gehri saans lo aur chhodo.',
      'Ek glass paani piyen.',
      'Kisi dost se baat karo.',
      'Apne vichar likho.',
    ],
  };

  const detectLanguage = (text) => {
    const hinglishWords = ['hai', 'nahi', 'kyu', 'kar', 'raha', 'ho', 'kya', 'kaise', 'theek'];
    return hinglishWords.some((word) => text.toLowerCase().includes(word)) ? 'hi' : 'en';
  };

  const handleSend = () => {
    if (!userInput.trim()) return;

    const updatedChat = [...chat, { role: 'user', text: userInput }];
    setChat(updatedChat);

    const detectedLang = detectLanguage(userInput);
    setLang(detectedLang);

    const lowered = userInput.toLowerCase();
    const isEmotional = emotionTriggers.some((word) => lowered.includes(word));

    if (isEmotional) {
      setChat((prev) => [
        ...prev,
        {
          role: 'yara',
          text:
            detectedLang === 'en'
              ? 'I sense you might be feeling low. Would you like to try a short meditation? (yes/no)'
              : 'Mujhe lagta hai aap thoda low feel kar rahe ho. Kya aap meditation try karna chahenge? (haan/na)',
        },
      ]);
    }else if (isSuggesting && (lowered === 'yes' || lowered === 'haan')) {
  const nextIndex = suggestionIndex + 1;
  if (nextIndex < suggestions.length) {
    setSuggestionIndex(nextIndex);
    setChat((prev) => [
      ...prev,
      {
        role: 'yara',
        text: suggestions[nextIndex],
      },
      {
        role: 'yara',
        text: lang === 'en' ? 'Would you like another suggestion?' : 'Kya aap ek aur sujhav chahenge?',
      },
    ]);
  } else {
    setIsSuggesting(false);
    setChat((prev) => [
      ...prev,
      {
        role: 'yara',
        text: lang === 'en'
          ? "That's all for now. I'm here if you need more!"
          : "Bas itna hi. Main yahi hoon agar zarurat ho!",
      },
    ]);
  }
}
else if (lowered === 'yes' || lowered === 'haan') {
  goToMeditation(); // ✅ Go to meditation ONLY if not suggesting
}
else if (lowered === 'no' || lowered === 'na') {

      setIsSuggesting(true);
      setSuggestionIndex(0);
      const selectedList = detectedLang === 'en' ? suggestionList.en : suggestionList.hi;
      setSuggestions(selectedList);
      setChat((prev) => [
        ...prev,
        {
          role: 'yara',
          text: selectedList[0],
        },
        {
          role: 'yara',
          text: detectedLang === 'en' ? 'Would you like another suggestion?' : 'Kya aap ek aur sujhav chahenge?',
        },
      ]);
    } else if (isSuggesting && (lowered === 'yes' || lowered === 'haan')) {
      const nextIndex = suggestionIndex + 1;
      if (nextIndex < suggestions.length) {
        setSuggestionIndex(nextIndex);
        setChat((prev) => [
          ...prev,
          {
            role: 'yara',
            text: suggestions[nextIndex],
          },
          {
            role: 'yara',
            text: lang === 'en' ? 'Would you like another suggestion?' : 'Kya aap ek aur sujhav chahenge?',
          },
        ]);
      } else {
        setIsSuggesting(false);
        setChat((prev) => [
          ...prev,
          {
            role: 'yara',
            text: lang === 'en'
              ? "That's all for now. I'm here if you need more!"
              : "Bas itna hi. Main yahi hoon agar zarurat ho!",
          },
        ]);
      }
    } else {
      setChat((prev) => [
        ...prev,
        {
          role: 'yara',
          text:
            lang === 'en'
              ? "I'm here to listen. Please tell me how you're feeling."
              : 'Main sun rahi hoon. Aap apna mann halka kar sakte ho.',
        },
      ]);
    }

    setUserInput('');
  };

  const handleNewChat = () => {
    if (chat.length > 0) {
      const timestamp = new Date().toLocaleString();
      const newHistory = [...chatHistory, { timestamp, chat }];
      setChatHistory(newHistory);
      localStorage.setItem('yara_history', JSON.stringify(newHistory));
    }
    setChat([]);
    setSuggestions([]);
    setSuggestionIndex(0);
    setIsSuggesting(false);
  };

  const handleEmojiClick = (emoji) => {
    setUserInput((prev) => prev + emoji.emoji);
  };

  return (
    <div className="yara-container" style={{ backgroundImage: `url(${servicesBg})` }}>
      <div className="yara-main">
        <div className="chat-box">
          <div className="chat-messages">
            {chat.map((msg, index) => (
              <div key={index} className={`chat-bubble ${msg.role}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="input-row">
           <input
  type="text"
  value={userInput}
  onChange={(e) => setUserInput(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();  // Prevent newline or default action
      handleSend();        // Send the message
    }
  }}
  placeholder="Type your message..."
/>

            <button onClick={() => setShowEmojiPicker((prev) => !prev)}>😊</button>
            <button onClick={handleSend}>Send</button>
          </div>

          {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
        </div>

        <div className="yara-sidebar">
          <button onClick={handleNewChat}>New Chat</button>
        </div>
      </div>
    </div>
  );
};

export default Yara;
