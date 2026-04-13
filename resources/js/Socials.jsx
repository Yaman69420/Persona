import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Icons & Base Assets
import char1 from "./assets/char1.png";
import char2 from "./assets/char2.png";
import char3 from "./assets/char3.png";
import newsign from "./assets/newsign.png";
import icon1 from "./assets/icon1.png";
import icon2 from "./assets/icon2.png";
import icon3 from "./assets/icon3.png";
import { getVideoUrl } from "./videoUtils";

const bgVideo = getVideoUrl("main3.mp4");

// Movie Posters
import movie1 from "./assets/movie1.jpg";
import movie2 from "./assets/movie2.jpg";
import movie3 from "./assets/movie3.jpg";
import movie4 from "./assets/movie4.jpg";

// Game Covers
import game1 from "./assets/game1.jpg";
import game2 from "./assets/game2.jpg";
import game3 from "./assets/game3.jpg";
import game4 from "./assets/game4.jpg";
import game5 from "./assets/game5.jpg";

// Anime Posters
import anime1 from "./assets/anime1.jpg";
import anime2 from "./assets/anime2.jpg";
import anime3 from "./assets/anime3.jpg";
import anime4 from "./assets/anime4.jpg";
import anime5 from "./assets/anime5.jpg";

// Manga Posters
import manga1 from "./assets/manga1.jpg";
import manga2 from "./assets/manga2.jpg";
import manga3 from "./assets/manga3.jpg";

const CHARS = [char1, char2, char3, char1, char2];

const ROLES = [
  { text: "LEADER", color: "#e8c100", bg: "rgba(232,193,0,0.12)", border: "rgba(232,193,0,0.5)" },
  { text: "PARTY",  color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
  { text: "PARTY",  color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
  { text: "PARTY",  color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
  { text: "PARTY",  color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
];

const ITEMS = [
  {
    id: "instagram", label: "INSTAGRAM", handle: "@yaman.terkawi", href: "https://instagram.com/yaman.terkawi", icon: "📷", barIcon: icon1, bars: 0,
    type: "simple", stats: []
  },
  {
    id: "spotify", label: "SPOTIFY", handle: "Yaman", href: "https://open.spotify.com/user/31gizpqn4qk25nn7rqfqv4xltoxy?si=LY8xRHWHR4CrFZUvEYwaDQ", icon: "🎵", barIcon: icon2, bars: 3,
    type: "spotify", playlists: ["4apFx8yLAFF01wttZhXGek", "6O86pIZt3zV5yBn1HLdVK2", "1JtKo7eJyTMpk4yEJ7PFGK"],
    stats: [{ tag: "PLST", value: "3", color: "#1db954" }, { tag: "LKS", value: "342", color: "#1ed760" }]
  },
  {
    id: "anilist", label: "ANILIST", handle: "Yabum21", href: "https://anilist.co/user/Yabum21", icon: "🏮", barIcon: icon3, bars: 1,
    type: "anilist", 
    topAnime: [
      { title: "Re:Zero", img: anime1 },
      { title: "Kaguya-sama", img: anime2 },
      { title: "Attack on Titan", img: anime3 },
      { title: "Neon Genesis", img: anime4 },
      { title: "Death Parade", img: anime5 },
    ],
    topManga: [
      { title: "Berserk", img: manga1 },
      { title: "Vagabond", img: manga2 },
      { title: "Steel Ball Run", img: manga3 },
    ],
    stats: [{ tag: "COMP", value: "60+", color: "#3db4f2" }, { tag: "MEAN", value: "80%", color: "#f0b64d" }]
  },
  {
    id: "letterboxd", label: "LETTERBOXD", handle: "Yabum21", href: "https://letterboxd.com/Yabum21", icon: "🎬", barIcon: icon1, bars: 1,
    type: "letterboxd", 
    favorites: [
      { title: "Scott Pilgrim vs. The World", img: movie1 },
      { title: "LOTR: The Return of the King", img: movie2 },
      { title: "Blade Runner 2049", img: movie3 },
      { title: "12 Angry Men", img: movie4 },
    ],
    stats: [{ tag: "FILM", value: "770+", color: "#ff8000" }, { tag: "FAV", value: "4", color: "#00e054" }]
  },
  {
    id: "backloggd", label: "BACKLOGGD", handle: "Yabum21", href: "https://backloggd.com/u/Yabum21", icon: "🎮", barIcon: icon2, bars: 1,
    type: "backloggd",
    favorites: [
      { title: "Bloodborne", img: game1 },
      { title: "NieR: Automata", img: game2 },
      { title: "Silent Hill 2", img: game3 },
      { title: "Elden Ring", img: game4 },
      { title: "Clair Obscur: Exp 33", img: game5 },
    ],
    stats: [{ tag: "PLAY", value: "400+", color: "#b611ee" }, { tag: "TOP", value: "5", color: "#ffffff" }]
  },
];

function ImageWithFade({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`img-fade-wrap ${loaded ? 'loaded' : ''}`}>
      <img 
        src={src} 
        alt={alt} 
        className={className} 
        onLoad={() => setLoaded(true)} 
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
      />
      {!loaded && <div className="img-placeholder" />}
    </div>
  );
}

export default function Socials() {
  const [active, setActive]               = useState(0);
  const [mounted, setMounted]             = useState(false);
  const [activeInfoBar, setActiveInfoBar] = useState(0);
  const [focus, setFocus]                 = useState("left");
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (focus === "left") {
        if (e.key === "ArrowUp")    setActive(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown")  setActive(i => Math.min(ITEMS.length - 1, i + 1));
        if (e.key === "ArrowRight") { 
          if (ITEMS[active].type !== "simple") {
            setFocus("right"); 
            setActiveInfoBar(0); 
          }
        }
        if (e.key === "Enter")      window.open(ITEMS[active].href, "_blank");
      } else {
        const barCount = ITEMS[active].type === "spotify" ? 3 : 1;
        if (e.key === "ArrowUp")   setActiveInfoBar(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown") setActiveInfoBar(i => Math.min(barCount - 1, i + 1));
        if (e.key === "ArrowLeft") setFocus("left");
        if (e.key === "Enter") {
          if (ITEMS[active].type === "spotify") {
            window.open(`https://open.spotify.com/playlist/${ITEMS[active].playlists[activeInfoBar]}`, "_blank");
          } else {
            window.open(ITEMS[active].href, "_blank");
          }
        }
      }
      if ((e.key === "ArrowLeft" && focus === "left") || e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate, focus, activeInfoBar]);

  const renderRightPanel = () => {
    const item = ITEMS[active];
    if (!mounted) return null;

    if (item.type === "spotify") {
      return (
        <div className="sc-spotify-container">
          {item.playlists.map((pid, i) => (
            <div 
              key={pid} 
              className={`sc-spotify-wrapper ${activeInfoBar === i ? 'selected' : ''}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <iframe 
                src={`https://open.spotify.com/embed/playlist/${pid}?utm_source=generator&theme=0`} 
                width="100%" height="152" frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              />
            </div>
          ))}
        </div>
      );
    }

    if (item.type === "anilist") {
      return (
        <div className="sc-anilist-panel">
          <div className="sc-ani-lists">
            <div className="sc-ani-list-col">
              <span className="sc-ani-label">TOP 5 ANIME</span>
              <div className="sc-ani-grid">
                {item.topAnime.map((ani, i) => (
                  <div key={i} className="sc-ani-card" style={{ animationDelay: `${i * 50}ms` }}>
                    <ImageWithFade src={ani.img} alt={ani.title} />
                    <div className="sc-ani-title-overlay">{ani.title}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="sc-ani-list-col">
              <span className="sc-ani-label">TOP 3 MANGA</span>
              <div className="sc-ani-grid">
                {item.topManga.map((mng, i) => (
                  <div key={i} className="sc-ani-card" style={{ animationDelay: `${i * 50}ms` }}>
                    <ImageWithFade src={mng.img} alt={mng.title} />
                    <div className="sc-ani-title-overlay">{mng.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sc-ani-stats">
            <div className="sc-ani-stat-box">
              <span className="sc-ani-stat-val">60+</span>
              <span className="sc-ani-stat-lbl">COMPLETED</span>
            </div>
            <div className="sc-ani-stat-box red">
              <span className="sc-ani-stat-val">80%+</span>
              <span className="sc-ani-stat-lbl">MEAN SCORE</span>
            </div>
          </div>
        </div>
      );
    }

    if ((item.type === "letterboxd" || item.type === "backloggd") && item.favorites) {
      return (
        <div className="sc-fav-panel">
          <span className="sc-fav-label">{item.type === "letterboxd" ? "FAVORITE FILMS" : "TOP GAMES"}</span>
          <div className="sc-fav-grid">
            {item.favorites.map((fav, i) => (
              <div key={i} className="sc-fav-card" style={{ animationDelay: `${i * 80}ms` }}>
                <ImageWithFade src={fav.img} alt={fav.title} />
                <div className="sc-fav-title">{fav.title}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,400;0,700;1,700&display=swap');

        .sc-root {
          position: absolute; inset: 0; z-index: 10;
          pointer-events: none; display: flex; flex-direction: column;
          align-items: flex-start; justify-content: center; gap: 6px; padding-left: 0;
        }

        .sc-bar {
          position: relative; width: 45vw; height: 64px; transition: height 0.3s cubic-bezier(0.22,1,0.36,1);
          background: #111; cursor: pointer; pointer-events: all;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: 0 6px 24px rgba(0,0,0,0.65); z-index: 1;
        }

        .sc-bar-outer {
          position: relative; flex-shrink: 0; transform: translateX(-100%);
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-bar-outer.active .sc-bar { height: 90px; }
        .sc-bar-outer.mounted { transform: translateX(0); }

        .sc-bar-red {
          position: absolute; top: 0; left: 0; width: 45vw; height: 64px;
          background: #c4001a; transform: translateY(-7px); opacity: 0;
          transition: opacity 0.2s ease; z-index: 0; pointer-events: none;
        }
        .sc-bar-outer.active .sc-bar-red { opacity: 1; height: 90px; }

        .sc-bar-fill {
          position: absolute; inset: 0; width: 100%; background: #ffffff;
          clip-path: polygon(100% 0, 100% 0, calc(100% - 32px) 100%, calc(100% - 32px) 100%);
          transition: clip-path 0.35s cubic-bezier(0.22, 1, 0.36, 1); z-index: 0;
        }
        .sc-bar-outer.active .sc-bar-fill {
          clip-path: polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 138px) 100%);
        }

        .sc-bar-content {
          position: relative; z-index: 2; height: 100%;
          display: flex; align-items: center; justify-content: space-between; padding: 0 20px;
        }

        .sc-role {
          font-family: 'Anton', sans-serif; font-size: 50px; letter-spacing: -2px;
          color: #ffffff; transform: rotate(-30deg); user-select: none; line-height: 1; padding: 0 16px 0 8px;
        }

        .sc-main { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; }
        .sc-label { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 4px; line-height: 1; color: rgba(255,255,255,0.85); transition: color 0.2s ease; user-select: none; }
        .sc-bar-outer.active .sc-label { color: #111111; }

        .sc-stats { display: flex; align-items: center; gap: 10px; padding-right: 24px; flex-shrink: 0; }
        .sc-stat { display: flex; flex-direction: column; align-items: flex-start; }
        .sc-stat-tag { font-family: 'Bebas Neue', sans-serif; font-size: 9px; letter-spacing: 1.5px; padding: 1px 4px; border: 1px solid; line-height: 1.4; user-select: none; }
        .sc-stat-num { font-family: 'Bebas Neue', sans-serif; font-size: 26px; font-style: italic; line-height: 1; color: #ffffff; letter-spacing: 1px; user-select: none; }
        .sc-bar-outer.active .sc-stat-num { color: #111111; }

        .sc-char {
          position: absolute; top: 0; left: 110px; height: 100%; width: auto; max-width: 160px;
          object-fit: cover; object-position: top; pointer-events: none; z-index: 3;
          clip-path: polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%);
        }

        .sc-right-nav {
          position: fixed; top: 40px; right: 40px; z-index: 50;
          animation: sc-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both;
        }
        .sc-nav-label { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 3px; color: #111; background: #fff; padding: 2px 12px; }

        .sc-spotify-container { position: fixed; top: 140px; right: 20px; width: 32vw; display: flex; flex-direction: column; gap: 15px; z-index: 50; }
        .sc-spotify-wrapper { border: 2px solid #111; border-radius: 12px; overflow: hidden; background: #000; animation: sc-infobar-in 0.4s forwards; }
        .sc-spotify-wrapper.selected { border-color: #c4001a; box-shadow: 0 0 15px rgba(196, 0, 26, 0.4); transform: translateX(-10px) scale(1.02); }

        .sc-anilist-panel {
          position: fixed; top: 120px; right: 20px; width: 38vw; background: rgba(0,0,0,0.94);
          border-left: 4px solid #3db4f2; padding: 20px; display: flex; flex-direction: column; gap: 15px; z-index: 50;
          animation: sc-infobar-in 0.4s forwards;
        }
        .sc-ani-label { display: block; font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 2px; color: #3db4f2; margin-bottom: 10px; text-align: center; background: rgba(61, 180, 242, 0.1); padding: 4px; }
        .sc-ani-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(70px, 1fr)); gap: 8px; margin-bottom: 10px; }
        .sc-ani-card { position: relative; aspect-ratio: 2/3; background: #111; border: 1px solid #333; overflow: hidden; }
        .sc-ani-title-overlay { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.8); color: #fff; font-family: 'Bebas Neue', sans-serif; font-size: 8px; padding: 2px; text-align: center; opacity: 0; transition: opacity 0.2s; }
        .sc-ani-card:hover .sc-ani-title-overlay { opacity: 1; }

        .sc-ani-stats { display: flex; gap: 10px; margin-top: 5px; }
        .sc-ani-stat-box { flex: 1; background: #3db4f2; padding: 10px; display: flex; flex-direction: column; align-items: center; clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%); }
        .sc-ani-stat-box.red { background: #c4001a; }
        .sc-ani-stat-val { font-family: 'Anton', sans-serif; font-size: 28px; color: #000; line-height: 1; }
        .sc-ani-stat-lbl { font-family: 'Bebas Neue', sans-serif; font-size: 11px; color: rgba(0,0,0,0.7); }

        .sc-fav-panel {
          position: fixed; top: 140px; right: 20px; width: 35vw; background: rgba(0,0,0,0.92);
          border-top: 4px solid #c4001a; padding: 20px; z-index: 50; animation: sc-infobar-in 0.4s forwards;
        }
        .sc-fav-label { display: block; font-family: 'Bebas Neue', sans-serif; font-size: 24px; letter-spacing: 3px; color: #fff; margin-bottom: 15px; text-align: center; background: #c4001a; padding: 4px; }
        .sc-fav-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 12px; }
        .sc-fav-card { position: relative; aspect-ratio: 2/3; background: #111; border: 1px solid #333; overflow: hidden; transition: transform 0.2s; }
        .sc-fav-card:hover .sc-fav-title { opacity: 1; }
        .sc-fav-title { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.85); color: #fff; font-family: 'Bebas Neue', sans-serif; font-size: 10px; padding: 4px; text-align: center; opacity: 0; transition: opacity 0.2s; }

        .img-fade-wrap { position: relative; width: 100%; height: 100%; background: #111; }
        .img-placeholder { position: absolute; inset: 0; background: linear-gradient(45deg, #111 25%, #1a1a1a 50%, #111 75%); background-size: 200% 200%; animation: shimmer 1.5s infinite linear; }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        
        .sc-fav-card img, .sc-ani-card img { width: 100%; height: 100%; object-fit: cover; position: relative; z-index: 1; }

        .sc-footer { position: fixed; bottom: 20px; right: 28px; display: flex; flex-direction: column; align-items: flex-end; gap: 5px; font-family: 'Bebas Neue', sans-serif; z-index: 50; opacity: 0; transition: opacity 0.4s ease 0.6s; }
        .sc-footer.mounted { opacity: 1; }
        .sc-footer-row { display: flex; align-items: center; gap: 8px; font-size: 13px; letter-spacing: 2px; color: rgba(255,255,255,0.28); }
        .sc-footer-key { border: 1px solid rgba(255,255,255,0.2); border-radius: 3px; padding: 1px 6px; font-size: 11px; }

        @keyframes sc-infobar-in { 0% { opacity: 0; transform: translateX(40px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes sc-right-nav-pop { 0% { opacity: 0; transform: scale(0.55) translateY(-10px); } 65% { opacity: 1; transform: scale(1.1) translateY(2px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
      `}</style>

      <div className="sc-root" role="navigation">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`sc-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
            onClick={() => {
              if (active === i) window.open(item.href, "_blank");
              else { setActive(i); setFocus("left"); }
            }}
            onMouseEnter={() => { setActive(i); setFocus("left"); }}
          >
            <div className="sc-bar-red" />
            <div className="sc-bar">
              <img className="sc-char" src={CHARS[i]} alt="" />
              <div className="sc-bar-fill" />
              <div className="sc-bar-shade" />
              <div className="sc-bar-content">
                <div className="sc-role">{ROLES[i].text}</div>
                <div className="sc-main">
                  <div className="sc-main-top">
                    <div className="sc-icon">{item.icon}</div>
                    <div className="sc-label">{item.label}</div>
                  </div>
                </div>
                <div className="sc-stats">
                  {item.stats.map(s => (
                    <div className="sc-stat" key={s.tag}>
                      <div className="sc-stat-top">
                        <span className="sc-stat-tag" style={{ color: s.color, borderColor: s.color }}>{s.tag}</span>
                        <span className="sc-stat-num">{s.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {mounted && (
        <div className="sc-right-nav" key={active}>
          <span className="sc-nav-label">{ITEMS[active].label}</span>
        </div>
      )}

      {renderRightPanel()}

      <div className={`sc-footer${mounted ? " mounted" : ""}`}>
        <div className="sc-footer-row"><span className="sc-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">→</span><span>VIEW DATA</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">↵</span><span>OPEN LINK</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">ESC</span><span>BACK</span></div>
      </div>
    </div>
  );
}
