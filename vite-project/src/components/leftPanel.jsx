// src/components/LeftPanel.jsx
import { useNavigate, useLocation } from "react-router-dom";
import dogImage from "../assets/dog.png";

export default function LeftPanel() {
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname === "/" || location.pathname === "/dashboard";
  const isBrowser = location.pathname.startsWith("/ilos") || location.pathname.startsWith("/browser");

  const railBtn = (active) => ({
    width: 44,
    height: 44,
    borderRadius: 14,
    background: active
      ? "linear-gradient(135deg, rgba(167,139,250,0.15), rgba(96,165,250,0.15))"
      : "rgba(255,255,255,0.03)",
    border: active
      ? "1px solid rgba(167,139,250,0.4)"
      : "1px solid rgba(255,255,255,0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: active ? "#a78bfa" : "#3a4555",
    transition: "all 0.2s",
  });

  return (
    <div style={{
      width: 60,
      background: "#0a0c10",
      borderRight: "1px solid #181f2a",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "14px 0",
      flexShrink: 0,
      gap: 10,
      position: "relative",
      zIndex: 10,
    }}>

      {/* Logo */}
      <div style={{
        marginBottom: 8,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{
          width: 42,
          height: 42,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
          padding: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <img
            src={dogImage}
            alt="Bullypad logo"
             onClick={() => navigate("/")}
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
        {/* Glow under logo */}
        <div style={{
          position: "absolute",
          bottom: -6,
          left: "50%",
          transform: "translateX(-50%)",
          width: 20,
          height: 4,
          background: "linear-gradient(90deg, #a78bfa, #60a5fa)",
          borderRadius: 10,
          filter: "blur(4px)",
          opacity: 0.6,
        }} />
      </div>

      {/* Divider */}
      <div style={{
        width: 30,
        height: 1,
        background: "linear-gradient(90deg, transparent, #2a3a50, transparent)",
        margin: "4px 0",
      }} />

      {/* Dashboard / Grid icon */}
      <div
        style={railBtn(isDashboard)}
        onClick={() => navigate("/")}
        onMouseEnter={e => {
          if (!isDashboard) {
            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            e.currentTarget.style.color = "#8899aa";
          }
        }}
        onMouseLeave={e => {
          if (!isDashboard) {
            e.currentTarget.style.background = "rgba(255,255,255,0.03)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
            e.currentTarget.style.color = "#3a4555";
          }
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="1.5" y="1.5" width="6" height="6" rx="2"
            fill={isDashboard ? "url(#g1)" : "currentColor"} opacity={isDashboard ? 1 : 0.9} />
          <rect x="10.5" y="1.5" width="6" height="6" rx="2"
            fill={isDashboard ? "url(#g2)" : "currentColor"} opacity={isDashboard ? 1 : 0.9} />
          <rect x="1.5" y="10.5" width="6" height="6" rx="2"
            fill={isDashboard ? "url(#g3)" : "currentColor"} opacity={isDashboard ? 1 : 0.9} />
          <rect x="10.5" y="10.5" width="6" height="6" rx="2"
            fill={isDashboard ? "url(#g4)" : "currentColor"} opacity={isDashboard ? 1 : 0.9} />
          <defs>
            <linearGradient id="g1" x1="1.5" y1="1.5" x2="7.5" y2="7.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a78bfa" />
              <stop offset="1" stopColor="#60a5fa" />
            </linearGradient>
            <linearGradient id="g2" x1="10.5" y1="1.5" x2="16.5" y2="7.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ec4899" />
              <stop offset="1" stopColor="#a78bfa" />
            </linearGradient>
            <linearGradient id="g3" x1="1.5" y1="10.5" x2="7.5" y2="16.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#60a5fa" />
              <stop offset="1" stopColor="#34d399" />
            </linearGradient>
            <linearGradient id="g4" x1="10.5" y1="10.5" x2="16.5" y2="16.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a78bfa" />
              <stop offset="1" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Browser / ILO icon */}
      <div
        style={railBtn(isBrowser)}
        onClick={() => navigate("/token-minter")}
        onMouseEnter={e => {
          if (!isBrowser) {
            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            e.currentTarget.style.color = "#8899aa";
          }
        }}
        onMouseLeave={e => {
          if (!isBrowser) {
            e.currentTarget.style.background = "rgba(255,255,255,0.03)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
            e.currentTarget.style.color = "#3a4555";
          }
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="7"
            stroke={isBrowser ? "url(#bc1)" : "currentColor"}
            strokeWidth="1.5" />
          <circle cx="9" cy="9" r="2.8"
            stroke={isBrowser ? "url(#bc2)" : "currentColor"}
            strokeWidth="1.5" />
          <line x1="9" y1="2" x2="9" y2="6.2"
            stroke={isBrowser ? "url(#bc3)" : "currentColor"}
            strokeWidth="1.5" strokeLinecap="round" />
          <line x1="9" y1="11.8" x2="9" y2="16"
            stroke={isBrowser ? "url(#bc3)" : "currentColor"}
            strokeWidth="1.5" strokeLinecap="round" />
          <line x1="2" y1="9" x2="6.2" y2="9"
            stroke={isBrowser ? "url(#bc3)" : "currentColor"}
            strokeWidth="1.5" strokeLinecap="round" />
          <line x1="11.8" y1="9" x2="16" y2="9"
            stroke={isBrowser ? "url(#bc3)" : "currentColor"}
            strokeWidth="1.5" strokeLinecap="round" />
          <defs>
            <linearGradient id="bc1" x1="2" y1="2" x2="16" y2="16" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a78bfa" />
              <stop offset="1" stopColor="#60a5fa" />
            </linearGradient>
            <linearGradient id="bc2" x1="6.2" y1="6.2" x2="11.8" y2="11.8" gradientUnits="userSpaceOnUse">
              <stop stopColor="#60a5fa" />
              <stop offset="1" stopColor="#34d399" />
            </linearGradient>
            <linearGradient id="bc3" x1="0" y1="0" x2="18" y2="18" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a78bfa" />
              <stop offset="1" stopColor="#60a5fa" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Divider */}
      <div style={{
        width: 30,
        height: 1,
        background: "linear-gradient(90deg, transparent, #2a3a50, transparent)",
        margin: "4px 0",
      }} />

      {/* Flag / Language */}
      <div style={{ marginBottom: 4 }}>
        <img
          src="https://flagcdn.com/w20/gb.png"
          alt="EN"
          style={{ width: 22, height: 15, borderRadius: 3, objectFit: "cover", opacity: 0.7 }}
        />
      </div>

    </div>
  );
}