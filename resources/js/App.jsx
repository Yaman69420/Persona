import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { getVideoUrl } from './videoUtils'
import P3Menu from './P3Menu'
import VideoPage from './VideoPage'
import ResumePage from './ResumePage'
import PageTransition from './PageTransition'
import Socials from './Socials'
import AboutMe from './AboutMe'
import './App.css'

// Track List - Add your YouTube IDs here!
const TRACKS = [
  { id: "j9Sn1nFGQQ8", label: "COLOR YOUR NIGHT" },
  { id: "hWhgrA2dhrk", label: "FULL MOON FULL LIFE" },
  { id: "2KuWjZD6PBA", label: "IT'S GOING DOWN NOW" },
];

function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
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
        videoId: TRACKS[currentTrack].id,
        playerVars: {
          autoplay: 0,
          loop: 1,
          playlist: TRACKS[currentTrack].id,
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
        },
        events: {
          onReady: (event) => {
            event.target.unMute();
            event.target.setVolume(40);
          }
        }
      });
    }
  }, []);

  useEffect(() => {
    if (playerRef.current && playerRef.current.loadVideoById) {
      playerRef.current.loadVideoById(TRACKS[currentTrack].id);
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    if (playerRef.current && playerRef.current.playVideo) {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying]);

  return (
    <div className="p3-audio-control" onMouseLeave={() => setIsOpen(false)}>
      <div id="youtube-player" style={{ display: 'none' }}></div>
      
      <div className={`p3-audio-wrapper ${isOpen ? 'is-open' : ''}`}>
        {isOpen && (
          <div className="p3-track-list">
            {TRACKS.map((track, index) => (
              <button
                key={track.id}
                className={`p3-track-item ${currentTrack === index ? 'is-active' : ''}`}
                onClick={() => {
                  setCurrentTrack(index);
                  setIsPlaying(true);
                  setIsOpen(false);
                }}
              >
                <span className="p3-track-num">{String(index + 1).padStart(2, '0')}</span>
                <span className="p3-track-name">{track.label}</span>
              </button>
            ))}
          </div>
        )}

        <div className="p3-audio-main">
          <button
            className={`p3-play-btn ${!isPlaying ? 'is-stopped' : ''}`}
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? "Stop BGM" : "Play BGM"}
          >
            <div className="p3-audio-icon">
              {isPlaying ? '⏹️' : '▶️'}
            </div>
          </button>
          
          <button 
            className="p3-select-btn"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="p3-current-label">{TRACKS[currentTrack].label}</span>
            <span className="p3-arrow-icon">{isOpen ? '▲' : '▼'}</span>
          </button>
        </div>
      </div>

      <style>{`
        .p3-audio-control {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 9999;
          font-family: 'Anton', sans-serif;
          font-style: italic;
        }

        .p3-audio-wrapper {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
          perspective: 1000px;
        }

        .p3-audio-main {
          display: flex;
          gap: 5px;
          filter: drop-shadow(4px 4px 0 #c4001a);
        }

        .p3-play-btn {
          background: #000;
          border: 2px solid #fff;
          color: #fff;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          clip-path: polygon(15% 0, 100% 0, 85% 100%, 0 100%);
          transition: all 0.2s ease;
        }

        .p3-select-btn {
          background: #000;
          border: 2px solid #fff;
          color: #fff;
          height: 45px;
          padding: 0 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          cursor: pointer;
          clip-path: polygon(5% 0, 100% 0, 95% 100%, 0 100%);
          min-width: 180px;
          justify-content: space-between;
          transition: all 0.2s ease;
        }

        .p3-play-btn:hover, .p3-select-btn:hover {
          background: #fff;
          color: #000;
          transform: translateY(-2px);
        }

        .p3-play-btn.is-stopped {
          opacity: 0.7;
        }

        .p3-current-label {
          font-size: 14px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .p3-track-list {
          background: rgba(0, 0, 0, 0.95);
          border: 2px solid #fff;
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          width: 230px;
          box-shadow: 6px 6px 0 #c4001a;
          animation: p3-dropdown-in 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          clip-path: polygon(0 0, 95% 0, 100% 100%, 5% 100%);
        }

        @keyframes p3-dropdown-in {
          from { opacity: 0; transform: translateY(-10px) rotateX(-20deg); }
          to { opacity: 1; transform: translateY(0) rotateX(0); }
        }

        .p3-track-item {
          background: transparent;
          border: none;
          color: #fff;
          padding: 8px 15px;
          display: flex;
          align-items: center;
          gap: 15px;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s ease;
          width: 100%;
          font-family: inherit;
          font-style: inherit;
        }

        .p3-track-item:hover {
          background: #c4001a;
          transform: skewX(-10deg);
        }

        .p3-track-item.is-active {
          color: #c4001a;
        }
        .p3-track-item.is-active:hover {
          color: #fff;
        }

        .p3-track-num {
          font-size: 12px;
          opacity: 0.6;
        }

        .p3-track-name {
          font-size: 15px;
          letter-spacing: 1px;
        }

        .p3-audio-icon {
          font-size: 18px;
        }
      `}</style>
    </div>
  );
}

function MenuScreen() {
  const navigate = useNavigate()
  return (
    <div id="menu-screen">
      <video src={getVideoUrl('main1.mp3')} autoPlay loop muted playsInline />
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
          <PageTransition><ResumePage src={getVideoUrl('main2.mp3')} /></PageTransition>
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
