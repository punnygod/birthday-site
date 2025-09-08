import React, { useEffect, useState } from "react";
import "./App.css";

const messages = [
  "I love you ❤️",
  "You're my everything 💕",
  "Forever us ✨",
  "You make my world brighter 🌎",
  "Lucky to have you 🍀",
  "My queen 👑",
  "Always yours 💖"
];

const secretMemories = [
  "💌 The late-night talks that only we understand 🌙",
  "🍦 That ice-cream date where we laughed till it melted 😂",
  "🌧️ Dancing together in the rain – our little movie moment",
  "🛶 Our secret adventure only we know 😉",
  "💞 The promise we made under the stars ✨"
];

const App = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [showTimeline, setShowTimeline] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [giftUnlocked, setGiftUnlocked] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);
  const [inputPasscode, setInputPasscode] = useState("");
  const [error, setError] = useState("");

  const correctPasscode = "0909"; // <--- SET YOUR SECRET CODE HERE

  useEffect(() => {
    const targetDate = new Date("September 10, 2025 00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(timer);
        setShowTimeline(true);

        if (!audioPlayed) {
          const audio = new Audio(process.env.PUBLIC_URL + "/happy-birthday.mp3");
          audio.play().catch(() =>
            console.log("Autoplay blocked, will need user interaction")
          );
          setAudioPlayed(true);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [audioPlayed]);

  // Handle heart click
  const handleHeartClick = () => {
    const randomMessage =
      messages[Math.floor(Math.random() * messages.length)];
    setPopupMessage(randomMessage);
    setShowPopup(true);

    setTimeout(() => setShowPopup(false), 2000);
  };

  // Handle passcode submit
  const handleUnlock = () => {
    if (inputPasscode === correctPasscode) {
      setGiftUnlocked(true);
      setShowPasscode(false);
      setError("");
    } else {
      setError("❌ Wrong passcode, try again!");
    }
  };

  return (
    <div className="app">
      {/* Floating hearts */}
      <div className="hearts">
        {Array.from({ length: 3 }).map((_, i) => (
          <span key={i} className="heart" onClick={handleHeartClick}>
            ❤️
          </span>
        ))}
      </div>

      {/* Floating hearts background */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={`float-${i}`}
          className="floating-heart"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`
          }}
        >
          ❤️
        </div>
      ))}

      <h1 className="title">🎉 Countdown to Shamu's Birthday 🎉</h1>

      {!showTimeline ? (
        <>
          <div className="countdown">
            <div className="time-box">
              <span className="time">{timeLeft.days}</span>
              <span className="label">Day</span>
            </div>
            <div className="time-box">
              <span className="time">{timeLeft.hours}</span>
              <span className="label">Hours</span>
            </div>
            <div className="time-box">
              <span className="time">{timeLeft.minutes}</span>
              <span className="label">Min</span>
            </div>
            <div className="time-box">
              <span className="time">{timeLeft.seconds}</span>
              <span className="label">Sec</span>
            </div>
          </div>
          <div className="gift-teaser">
            🎁 A special gift will be unlocked on your birthday! 🎁
          </div>
        </>

      ) : (
        <div className="timeline-container">
          <h2 className="bday-text fade-in">🎂 Happy Birthday My Love ❤️</h2>
          <div className="timeline">
            <div className="timeline-item fade-in delay-1">
              <div>💖 The day we first met – [Add Date]</div>
            </div>
            <div className="timeline-item fade-in delay-2">
              <div>✨ Our first trip together – [Add Memory]</div>
            </div>
            <div className="timeline-item fade-in delay-3">
              <div>🥰 A special moment – [Add Detail]</div>
            </div>
            <div className="timeline-item fade-in delay-4">
              <div>🎂 Today – Happy Birthday, My Love ❤️</div>
            </div>
          </div>

          {!giftUnlocked ? (
            <button className="unlock-btn" onClick={() => setShowPasscode(true)}>
              🎁 Unlock Secret Gift
            </button>
          ) : (
            <div className="secret-memories fade-in">
              <h3>💌 Secret Memories Only for Us 💌</h3>
              {secretMemories.map((m, i) => (
                <div key={i} className="timeline-item secret">
                  {m}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Popup message */}
      {showPopup && <div className="popup">{popupMessage}</div>}

      {/* Passcode Modal */}
      {showPasscode && (
        <div className="passcode-modal">
          <div className="modal-box">
            <h3>🔒 Enter Passcode</h3>
            <input
              type="password"
              value={inputPasscode}
              onChange={(e) => setInputPasscode(e.target.value)}
              placeholder="Enter secret code"
            />
            <button onClick={handleUnlock}>Unlock</button>
            {error && <p className="error">{error}</p>}
            <button className="close-btn" onClick={() => setShowPasscode(false)}>
              ✖ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
