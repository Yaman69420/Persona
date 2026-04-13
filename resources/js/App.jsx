import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import menuVideo from './assets/Mainn.mp4'
import main1 from './assets/main1.mp4'
import main2 from './assets/main2.mp4'
import main3 from './assets/main3.mp4'
import P3Menu from './P3Menu'
import VideoPage from './VideoPage'
import ResumePage from './ResumePage'
import PageTransition from './PageTransition'
import Socials from './Socials'
import AboutMe from './AboutMe'
import './App.css'

// Change this ID to any YouTube Video ID you want!
const YT_VIDEO_ID = "hWhgrA2dhrk"; 

function BackgroundMusic() {
  const [muted, setMuted] = useState(true);
  const playerRef = useRef(null);

  useEffect(() => {
    // Load YouTube API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      initPlayer();
    }

    function initPlayer() {
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: YT_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: YT_VIDEO_ID,
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
        },
        events: {
          onReady: (event) => {
            event.target.mute();
            event.target.playVideo();
          }
        }
      });
    }
  }, []);

  useEffect(() => {
    if (playerRef.current && playerRef.current.mute) {
      if (muted) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
        playerRef.current.setVolume(40);
        playerRef.current.playVideo();
      }
    }
  }, [muted]);

  return (
    <div className="p3-audio-control">
      <div id="youtube-player" style={{ display: 'none' }}></div>
      <button
        className={`p3-mute-btn ${muted ? 'is-muted' : ''}`}
        onClick={() => setMuted(!muted)}
        title={muted ? "Unmute BGM" : "Mute BGM"}
      >
        <div className="p3-mute-icon">
          {muted ? '🔇' : '🔊'}
        </div>
        <span className="p3-mute-label">BGM</span>
      </button>
      <style>{`
        .p3-audio-control {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 9999;
        }
        .p3-mute-btn {
          background: #000;
          border: 2px solid #fff;
          color: #fff;
          padding: 8px 12px;
          font-family: 'Anton', sans-serif;
          font-style: italic;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
          transition: all 0.2s ease;
          box-shadow: 4px 4px 0 #c4001a;
        }
        .p3-mute-btn:hover {
          transform: scale(1.05);
          background: #fff;
          color: #000;
        }
        .p3-mute-btn.is-muted {
          box-shadow: 4px 4px 0 #333;
          opacity: 0.7;
        }
        .p3-mute-icon {
          font-size: 18px;
        }
        .p3-mute-label {
          font-size: 14px;
          letter-spacing: 1px;
        }
      `}</style>
    </div>
  );
}

function MenuScreen() {
  const navigate = useNavigate()
  return (
    <div id="menu-screen">
      <video src={menuVideo} autoPlay loop muted playsInline />
      <P3Menu onNavigate={(page) => {
        if (page === "github") {
          window.open("https://github.com/Yaman69420", "_blank");
        } else {
          navigate(`/${page}`);
        }
      }} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition><MenuScreen /></PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition variant="about"><AboutMe /></PageTransition>
        } />
        <Route path="/resume" element={
          <PageTransition><ResumePage src={main2} /></PageTransition>
        } />
        <Route path="/socials" element={
          <PageTransition variant="socials"><Socials /></PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <>
      <BackgroundMusic />
      <AnimatedRoutes />
    </>
  )
}
