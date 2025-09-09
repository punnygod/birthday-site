import React, { useEffect, useState } from "react";
import "./App.css";
import date1 from "./assets/date_1.jpeg";
import date2 from "./assets/date_2.jpeg";
import date3 from "./assets/date_3.jpeg";
import date4 from "./assets/date_4.jpeg";
import date5 from "./assets/date_5.jpeg";
import date6 from "./assets/date_6.jpeg";
import date7 from "./assets/date_7.jpeg";
import date8 from "./assets/date_8.jpeg"; 
import date9 from "./assets/date_9.jpeg";
import end from "./assets/end.jpg";
import hbd from "./assets/hbd.mp3";

const messages = [
  "I love you ❤️",
  "You're my everything 💕",
  "Forever us ✨",
  "You make my world brighter 🌎",
  "Lucky to have you 🍀",
  "My queen 👑",
  "Always yours 💖"
];

const timelineEvents = [
  {
    date: "March 2022",
    title: "The Beginning",
    description: "When our paths crossed and a beautiful journey started",
    image: date4
  },
  {
    date: "April 2022",
    title: "Our First Meeting",
    description: "The day our eyes met and everything changed forever",
    image: date1
  },
  {
    date: "October 2022",
    title: "First Diwali",
    description: "Celebrating lights and love together for the first time",
    image: date2
  },
  {
    date: "March 2023",
    title: "First Holi",
    description: "Playing with colors and laughter in the sun",
    image: date3
  },
  {
    date: "October 2023",
    title: "First Navratri",
    description: "Dancing through the nights, lost in each other's eyes",
    image: date5
  },
  {
    date:"i dont remember",
    title: "Trip to Ahem Ahem",
    description: "Statue Statue",
    image: date6
  },
  {
    date:"September 2023",
    title: "The Gym Date",
    description: "Sweating it out together, stronger every day",
    image: date7
  },
  { date :"September 2022",
    title: "Ikea Adventure",
    description: "Building memories and furniture together",
    image: date8
  },
  { date :'2024',
    title: "First Bike Ride",
    description: "Wind in our hair, freedom in our hearts",
    image: date9
  },
  {
  date: "Forever Ahead 💞",
  title: "Our Endless Journey",
  description:
    "There are countless birthdays, festivals, and little moments which i missed and many more are still waiting for us. This timeline is just the beginning of our story one that I hope we keep writing together, forever. ❤️",
  image: end
 }
];

const App = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [showTimeline, setShowTimeline] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

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
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setShowTimeline(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Play birthday song
  const handlePlayAudio = () => {
    if (!audioPlayed) {
      const audio = new Audio(hbd);
      audio.play().catch(() =>
        console.log("Autoplay blocked, will need user interaction")
      );
      setAudioPlayed(true);
    }
  };

  // Handle heart click (popup + possible audio)
  const handleHeartClick = () => {
    if (!audioPlayed) {
      handlePlayAudio();
    }
    const randomMessage =
      messages[Math.floor(Math.random() * messages.length)];
    setPopupMessage(randomMessage);
    setShowPopup(true);

    setTimeout(() => setShowPopup(false), 2000);
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

      {/* Floating music heart */}
      {showTimeline && <div className="music-heart" onClick={handlePlayAudio}>
        ❤️
      </div>
      }

      {!showTimeline ? (
        <>
          <h1 className="title">🎉Shamu's Birthday 🎉</h1>
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
          <h3 className="bday-text fade-in title">🎂 Happy Birthday My Love ❤️</h3>

          {/* Show 00 timer when birthday is reached */}
          <div className="countdown">
            <div className="time-box">
              <span className="time">00</span>
              <span className="label">Day</span>
            </div>
            <div className="time-box">
              <span className="time">00</span>
              <span className="label">Hours</span>
            </div>
            <div className="time-box">
              <span className="time">00</span>
              <span className="label">Min</span>
            </div>
            <div className="time-box">
              <span className="time">00</span>
              <span className="label">Sec</span>
            </div>
          </div>

          <div className="timeline">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className={`timeline-item fade-in delay-${index + 1}`}
              >
                <div className="timeline-content">
                  <div className="timeline-date">{event.date}</div>
                  <h3 className="timeline-title">{event.title}</h3>
                  <p className="timeline-description">{event.description}</p>
                  <img
                    className="timeline-image"
                    src={event.image}
                    alt={event.title}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Popup message */}
      {showPopup && <div className="popup">{popupMessage}</div>}
    </div>
  );
};

export default App;
