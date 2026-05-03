import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dogImage from "../assets/dog.png";

function CircleIcon({ active }) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="7.5" cy="7.5" r="6.2" stroke={active ? "#00ffc8" : "#3a4555"} strokeWidth="1.3" />
      <circle cx="7.5" cy="7.5" r="2.3" stroke={active ? "#00ffc8" : "#3a4555"} strokeWidth="1.3" />
    </svg>
  );
}

const SERVICE_ITEMS = [
  { label: "Token Minter",      path: "/token-minter" },
  { label: "Token Locker",           locked: true },
  { label: "Liquidity Locker",  path: "/liquidity-locker",  active: true },
  { label: "Create ILO",        path: "/create" },
];

const RAYDIUM_URL =
  "https://raydium.io/swap/?inputCurrency=sol&outputCurrency=gXn8BEGmac3whuQsumEcUXv3BSext6r7kFYGJaRKMeL&fixed=out";
const JUPITER_URL =
  "https://jup.ag/swap/SOL-BULLY_gXn8BEGmac3whuQsumEcUXv3BSext6r7kFYGJaRKMeL";

function DateTimePicker({ value, onChange, onClose }) {
  const now = new Date(value || Date.now());
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState(now.getDate());
  const [selectedHour, setSelectedHour] = useState(now.getHours());
  const [selectedMin, setSelectedMin] = useState(now.getMinutes());

  const monthNames = ["January","February","March","April","May","June",
    "July","August","September","October","November","December"];
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const mins  = Array.from({ length: 60 }, (_, i) => i);

  function handleOK() {
    const d = new Date(viewYear, viewMonth, selectedDate, selectedHour, selectedMin);
    onChange(d);
    onClose();
  }

  const calBtn = {
    background: "#1a2030", border: "1px solid #2a3a4a", borderRadius: 4,
    padding: "2px 7px", color: "#8899aa", cursor: "pointer",
    fontSize: 12, fontFamily: "inherit",
  };

  return (
    <div style={{
      position: "absolute", top: "100%", left: 0, right: 0,
      background: "#111318", border: "1px solid #1e2a3a",
      borderRadius: 12, padding: 16, zIndex: 100,
      display: "flex", gap: 12, marginTop: 8,
      boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ display: "flex", gap: 4 }}>
            <button onClick={() => setViewYear(v => v - 1)} style={calBtn}>«</button>
            <button onClick={() => setViewMonth(m => m === 0 ? (setViewYear(y => y - 1), 11) : m - 1)} style={calBtn}>‹</button>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#e8edf5" }}>{monthNames[viewMonth]} {viewYear}</span>
          <div style={{ display: "flex", gap: 4 }}>
            <button onClick={() => setViewMonth(m => m === 11 ? (setViewYear(y => y + 1), 0) : m + 1)} style={calBtn}>›</button>
            <button onClick={() => setViewYear(v => v + 1)} style={calBtn}>»</button>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 6 }}>
          {dayNames.map(d => (
            <div key={d} style={{ textAlign: "center", fontSize: 10, color: "#4a5568", padding: "2px 0" }}>{d}</div>
          ))}
          {cells.map((d, i) => (
            <div key={i} onClick={() => d && setSelectedDate(d)} style={{
              textAlign: "center", fontSize: 12, padding: "5px 2px",
              borderRadius: 6, cursor: d ? "pointer" : "default",
              color: d ? (d === selectedDate ? "#fff" : "#c0ccd8") : "transparent",
              background: d === selectedDate ? "#a78bfa" : "transparent",
            }}>{d || ""}</div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          <button
            onClick={() => {
              const n = new Date();
              setViewYear(n.getFullYear()); setViewMonth(n.getMonth());
              setSelectedDate(n.getDate()); setSelectedHour(n.getHours()); setSelectedMin(n.getMinutes());
            }}
            style={{ ...calBtn, fontSize: 11 }}
          >Now</button>
          <button onClick={handleOK} style={{
            background: "linear-gradient(90deg,#a78bfa,#60a5fa)",
            border: "none", borderRadius: 6, padding: "4px 16px",
            color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer",
          }}>OK</button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2, maxHeight: 220, overflowY: "auto" }}>
          {hours.map(h => (
            <div key={h} onClick={() => setSelectedHour(h)} style={{
              padding: "3px 10px", borderRadius: 4, cursor: "pointer", fontSize: 12,
              color: h === selectedHour ? "#a78bfa" : "#8899aa",
              background: h === selectedHour ? "rgba(167,139,250,0.15)" : "transparent",
            }}>{String(h).padStart(2, "0")}</div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2, maxHeight: 220, overflowY: "auto" }}>
          {mins.map(m => (
            <div key={m} onClick={() => setSelectedMin(m)} style={{
              padding: "3px 10px", borderRadius: 4, cursor: "pointer", fontSize: 12,
              color: m === selectedMin ? "#a78bfa" : "#8899aa",
              background: m === selectedMin ? "rgba(167,139,250,0.15)" : "transparent",
            }}>{String(m).padStart(2, "0")}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LiquidityLocker() {
  const navigate = useNavigate();

  const [step, setStep] = useState("address");
  const [activeTab, setActiveTab] = useState("newlock");
  const [roleTab, setRoleTab] = useState("owner");

  const [pairAddress, setPairAddress] = useState("");
  const [pairSelected, setPairSelected] = useState(false);

  const [lpAmount, setLpAmount] = useState("0.00");
  const [unlockDate, setUnlockDate] = useState(new Date("2021-07-30T18:00:00"));
  const [showCalendar, setShowCalendar] = useState(false);
  const [unlockerAddr, setUnlockerAddr] = useState("");
  const [referralAddr, setReferralAddr] = useState("");
  const [approved, setApproved] = useState(false);
  const [locked, setLocked] = useState(false);

  const pctBtns = ["25%", "50%", "75%", "100%"];
  const [activePct, setActivePct] = useState(null);

  function handlePctClick(p) {
    setActivePct(p);
    setLpAmount((100 * parseInt(p) / 100).toString());
  }

  function handleContinue() {
    if (pairAddress.trim() && pairSelected) setStep("liquidity");
  }

  function handleApprove() { setApproved(true); }

  function handleLock() {
    if (approved) {
      setLocked(true);
      setStep("address");
      setPairSelected(false);
    }
  }

  const formattedDate = unlockDate
    ? `${unlockDate.toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric" })}, ${String(unlockDate.getHours()).padStart(2, "0")}:${String(unlockDate.getMinutes()).padStart(2, "0")}`
    : "—";

  const styles = {
    root: {
      background: "#0a0c10",
      color: "#d0d6e0",
      fontFamily: "'DM Sans', 'Inter', sans-serif",
      display: "flex",
      fontSize: 13,
      overflow: "hidden",
      position: "fixed",
      inset: 0,
      width: "100%",
    },
    iconRail: {
      width: 60,
      background: "#0a0c10",
      borderRight: "1px solid #181f2a",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "16px 0",
      flexShrink: 0,
      gap: 8,
    },
    labelSidebar: {
      width: 190,
      background: "#0d1017",
      borderRight: "1px solid #181f2a",
      display: "flex",
      flexDirection: "column",
      padding: "20px 0",
      flexShrink: 0,
      overflowY: "auto",
    },
    main: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      minWidth: 0,
    },
    topbar: {
      height: 50,
      background: "#0d1017",
      borderBottom: "1px solid #181f2a",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 28px",
      flexShrink: 0,
    },
    content: {
      padding: "28px 40px",
      display: "flex",
      flexDirection: "column",
      gap: 24,
      flex: 1,
      overflowY: "auto",
      overflowX: "hidden",
    },
    card: {
      background: "#111318",
      border: "1px solid #1e2a3a",
      borderRadius: 12,
      padding: "20px 24px",
    },
    inputBox: {
      background: "none", border: "none", outline: "none",
      color: "#e8edf5", fontSize: 13, fontFamily: "inherit", width: "100%",
    },
    gradientBtn: {
      background: "linear-gradient(90deg,#a78bfa,#60a5fa)",
      border: "none", borderRadius: 10, padding: "13px",
      color: "#fff", fontSize: 14, fontWeight: 700,
      cursor: "pointer", fontFamily: "inherit", width: "100%",
    },
    dimBtn: {
      background: "#1a2030", border: "1px solid #2a3a4a",
      borderRadius: 10, padding: "13px",
      color: "#4a5568", fontSize: 14, fontWeight: 600,
      cursor: "not-allowed", fontFamily: "inherit", width: "100%",
    },
    swapBtn: (color) => ({
      display: "flex",
      alignItems: "center",
      gap: 6,
      background: "#111820",
      border: `1px solid ${color}30`,
      borderRadius: 20,
      padding: "5px 14px",
      fontSize: 12,
      color: color,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "inherit",
      letterSpacing: 0.3,
      transition: "all 0.2s",
    }),
  };

  const railBtn = (active) => ({
    width: 36, height: 36, borderRadius: 10,
    background: active ? "#1a2a3a" : "transparent",
    border: active ? "1px solid #2a3a50" : "1px solid transparent",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", color: active ? "#00ffc8" : "#3a4555",
  });

  return (
    <div style={styles.root}>

      {/* ── Icon Rail ── */}
      <div style={styles.iconRail}>
        <div style={{ marginBottom: 12 }}>
          <img
            src={dogImage}
            alt="logo"
            onClick={() => navigate("/")}
            style={{ width: 34, height: 34, borderRadius: "50%", objectFit: "cover", display: "block", cursor: "pointer" }}
          />
        </div>
        <div style={{ width: 28, height: 1, background: "#181f2a", margin: "4px 0 8px" }} />

        {/* Dashboard icon — navigates home */}
        <div style={railBtn(false)} onClick={() => navigate("/")}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.9" />
            <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.9" />
            <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.9" />
            <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.9" />
          </svg>
        </div>

        {/* Browser icon — active (current page) */}
        <div style={railBtn(true)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4" />
            <line x1="8" y1="1.5" x2="8" y2="5"    stroke="currentColor" strokeWidth="1.4" />
            <line x1="8" y1="11"  x2="8" y2="14.5" stroke="currentColor" strokeWidth="1.4" />
            <line x1="1.5" y1="8" x2="5"    y2="8"  stroke="currentColor" strokeWidth="1.4" />
            <line x1="11"  y1="8" x2="14.5" y2="8"  stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </div>

        {/* ILOs icon */}
        <div style={railBtn(false)} onClick={() => navigate("/ilos")} title="ILO's">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" />
            <path d="M4 4V3a2 2 0 014 0v1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <line x1="8" y1="8" x2="8" y2="10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>

        <div style={{ flex: 1 }} />

        {/* Flag */}
        <div style={{ marginBottom: 4 }}>
          <img src="https://flagcdn.com/w20/gb.png" alt="EN"
            style={{ width: 20, height: 14, borderRadius: 2, objectFit: "cover" }} />
        </div>
      </div>

      {/* ── Label Sidebar ── */}
      <div style={styles.labelSidebar}>
        <div style={{ padding: "0 20px 16px", fontSize: 13, fontWeight: 700, color: "#e8edf5" }}>
          Services
        </div>

        {/* Role tabs */}
        <div style={{ display: "flex", gap: 6, padding: "0 14px 18px" }}>
          <button
            onClick={() => setRoleTab("investor")}
            style={{
              flex: 1, padding: "6px 0", borderRadius: 8,
              background: roleTab === "investor" ? "#1a2030" : "transparent",
              color: roleTab === "investor" ? "#e8edf5" : "#6b7a8d",
              fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
              border: "1px solid " + (roleTab === "investor" ? "#2a3a4a" : "transparent"),
            }}
          >Investor</button>
          <button
            onClick={() => setRoleTab("owner")}
            style={{
              flex: 1, padding: "6px 0", borderRadius: 8,
              background: roleTab === "owner" ? "linear-gradient(90deg,#a78bfa,#60a5fa)" : "transparent",
              color: "#fff",
              fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
              border: "none",
            }}
          >Owner & Developer</button>
        </div>

        <div style={{ borderTop: "1px solid #181f2a", paddingTop: 16 }}>
          {SERVICE_ITEMS.map((item) => (
            <div
              key={item.label}
              onClick={() => item.path && navigate(item.path)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 20px",
                cursor: item.path ? "pointer" : "default",
                color: item.active ? "#ffffff" : "#6b7a8d",
                background: item.active ? "rgba(255,255,255,0.04)" : "transparent",
                fontSize: 13, fontWeight: item.active ? 600 : 400,
                borderLeft: item.active ? "2px solid #00ffc8" : "2px solid transparent",
                transition: "color 0.15s",
              }}
              onMouseEnter={e => { if (!item.active) e.currentTarget.style.color = "#c0ccd8"; }}
              onMouseLeave={e => { if (!item.active) e.currentTarget.style.color = "#6b7a8d"; }}
            >
              <CircleIcon active={item.active} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main ── */}
      <div style={styles.main}>

        {/* Topbar */}
        <div style={styles.topbar}>
          {/* LEFT: Raydium + Jupiter swap buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              style={styles.swapBtn("#14F195")}
              onClick={() => window.open(RAYDIUM_URL, "_blank")}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(20,241,149,0.08)";
                e.currentTarget.style.borderColor = "#14F19560";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "#111820";
                e.currentTarget.style.borderColor = "#14F19530";
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#14F195", display: "inline-block", flexShrink: 0 }} />
              Raydium
            </button>

            <button
              style={styles.swapBtn("#C7F284")}
              onClick={() => window.open(JUPITER_URL, "_blank")}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(199,242,132,0.08)";
                e.currentTarget.style.borderColor = "#C7F28460";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "#111820";
                e.currentTarget.style.borderColor = "#C7F28430";
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#C7F284", display: "inline-block", flexShrink: 0 }} />
              Jupiter
            </button>
          </div>

          {/* RIGHT: chain chip + wallet info */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "#111820", border: "1px solid #1e2d40",
              borderRadius: 20, padding: "5px 12px", fontSize: 12, color: "#c0ccd8",
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#9945FF", display: "inline-block" }} />
              <span style={{ fontWeight: 600 }}>SOLANA</span>
            </div>
            <span style={{ color: "#a78bfa", fontWeight: 700, fontSize: 13 }}>1,581 BNB</span>
            <span style={{ color: "#3a4555" }}>|</span>
            <span style={{ color: "#6b7a8d", fontSize: 11 }}>0xBBB6A7...6hn9</span>
          </div>
        </div>

        {/* ── Content ── */}
        <div style={styles.content}>

          {/* Breadcrumb */}
          {step === "liquidity" && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#4a5568" }}>
              <span
                style={{ cursor: "pointer", color: "#6b7a8d" }}
                onClick={() => setStep("address")}
              >Liquidity Locker</span>
              <span>/</span>
              <span style={{ color: "#e8edf5", fontWeight: 600 }}>DEGE-BNB</span>
            </div>
          )}

          {/* Page title */}
          <div style={{ fontSize: 26, fontWeight: 700, color: "#ffffff" }}>
            {step === "liquidity" ? (
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: "linear-gradient(135deg,#ff6b35,#f7931a)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700, color: "#fff",
                }}>D</div>
                DEGE/BNB
              </div>
            ) : "Liquidity Locker"}
          </div>

          {/* New Lock / Edit Withdraw tabs */}
          {step === "address" && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Exchange selector */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "#111318", border: "1px solid #1e2a3a",
                borderRadius: 10, padding: "9px 14px", cursor: "pointer",
              }}>
                <span style={{ fontSize: 16 }}>⚡</span>
                <div>
                  <div style={{ fontSize: 10, color: "#4a5568" }}>Select exchange</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#e8edf5" }}>Raydium</div>
                </div>
                <span style={{ color: "#4a5568" }}>▾</span>
              </div>

              <button
                onClick={() => setActiveTab("newlock")}
                style={{
                  padding: "10px 28px", borderRadius: 10, border: "none",
                  background: activeTab === "newlock"
                    ? "linear-gradient(90deg,#a78bfa,#60a5fa)"
                    : "#1a2030",
                  color: "#fff", fontSize: 13, fontWeight: 700,
                  cursor: "pointer", fontFamily: "inherit",
                }}
              >New Lock</button>

              <button
                onClick={() => setActiveTab("editwithdraw")}
                style={{
                  padding: "10px 28px", borderRadius: 10,
                  border: "1px solid #2a3a4a",
                  background: activeTab === "editwithdraw" ? "#1a2030" : "transparent",
                  color: activeTab === "editwithdraw" ? "#e8edf5" : "#6b7a8d",
                  fontSize: 13, fontWeight: 600,
                  cursor: "pointer", fontFamily: "inherit",
                }}
              >Edit / Withdraw</button>
            </div>
          )}

          {/* ── STEP: ADDRESS ── */}
          {step === "address" && activeTab === "newlock" && (
            <div style={{ ...styles.card, maxWidth: 680 }}>
              <div style={{ fontSize: 13, color: "#c0ccd8", marginBottom: 18 }}>
                Enter the Raydium pairs address you'd like to lock liquidity for
              </div>

              <div style={{
                background: "#0d1017", border: "1px solid #1e2a3a",
                borderRadius: 8, padding: "12px 16px", marginBottom: 6,
              }}>
                <input
                  value={pairAddress}
                  onChange={e => {
                    setPairAddress(e.target.value);
                    setPairSelected(false);
                    setLocked(false);
                    setApproved(false);
                  }}
                  placeholder="Raydium pairs address..."
                  style={{ ...styles.inputBox, fontSize: 14 }}
                />
              </div>
              <div style={{ fontSize: 11, color: "#3a4555", marginBottom: 20 }}>
                e.g. 0xc70bb2736e218861dca818d1e9f7a1930fe61e5b
              </div>

              {pairAddress.length > 5 && (
                <>
                  <div style={{ fontSize: 12, color: "#8899aa", marginBottom: 10 }}>Pairs found</div>

                  {/* Pair row — not yet selected */}
                  {!pairSelected && !locked && (
                    <div
                      onClick={() => setPairSelected(true)}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        background: "#0d1017", border: "1px solid #1e2a3a",
                        borderRadius: 8, padding: "12px 16px", marginBottom: 16, cursor: "pointer",
                        transition: "border-color 0.2s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = "#a78bfa"}
                      onMouseLeave={e => e.currentTarget.style.borderColor = "#1e2a3a"}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 13, color: "#e8edf5", fontWeight: 600 }}>DEGE</span>
                        <span style={{ color: "#4a5568" }}>/</span>
                        <span style={{ fontSize: 13, color: "#e8edf5", fontWeight: 600 }}>BNB</span>
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#e8edf5" }}>100</span>
                    </div>
                  )}

                  {/* Pair row — selected */}
                  {pairSelected && !locked && (
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      background: "#0d1017", border: "1px solid #a78bfa",
                      borderRadius: 8, padding: "12px 16px", marginBottom: 16,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 13, color: "#e8edf5", fontWeight: 600 }}>DEGE</span>
                        <span style={{ color: "#4a5568" }}>/</span>
                        <span style={{ fontSize: 13, color: "#e8edf5", fontWeight: 600 }}>BNB</span>
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#e8edf5" }}>100</span>
                    </div>
                  )}

                  {/* Locked state */}
                  {locked && (
                    <>
                      <div style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        background: "#0d1017", border: "1px solid #1e2a3a",
                        borderRadius: 8, padding: "12px 16px", marginBottom: 10,
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 13, color: "#e8edf5", fontWeight: 600 }}>DEGE</span>
                          <span style={{ color: "#4a5568" }}>/</span>
                          <span style={{ fontSize: 13, color: "#e8edf5", fontWeight: 600 }}>BNB</span>
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#e8edf5" }}>50</span>
                      </div>

                      <div style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        background: "#0d1017", border: "1px solid #00ffc830",
                        borderRadius: 8, padding: "14px 18px",
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{
                            width: 40, height: 40, borderRadius: "50%",
                            border: "2px solid #00ffc8",
                            background: "rgba(0,255,200,0.08)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 18,
                          }}>🔒</div>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#00ffc8" }}>50% LOCKED</div>
                            <div style={{ fontSize: 12, marginTop: 3 }}>
                              <span style={{ color: "#a78bfa" }}>$241,816.5</span>
                              <span style={{ color: "#6b7a8d" }}>/$483,633</span>
                            </div>
                          </div>
                        </div>
                        <span
                          style={{ color: "#4a5568", fontSize: 18, cursor: "pointer" }}
                          onMouseEnter={e => e.target.style.color = "#8899aa"}
                          onMouseLeave={e => e.target.style.color = "#4a5568"}
                        >⚙</span>
                      </div>

                      <button
                        onClick={() => {
                          setLocked(false);
                          setPairAddress("");
                          setPairSelected(false);
                          setApproved(false);
                          setLpAmount("0.00");
                          setActivePct(null);
                          setUnlockerAddr("");
                          setReferralAddr("");
                        }}
                        style={{ ...styles.gradientBtn, marginTop: 14 }}
                      >Lock Another</button>
                    </>
                  )}

                  {!locked && (
                    <button
                      onClick={handleContinue}
                      style={pairSelected ? styles.gradientBtn : styles.dimBtn}
                    >Continue</button>
                  )}

                  {!pairSelected && !locked && (
                    <div style={{ marginTop: 14 }}>
                      <span style={{ fontSize: 13, color: "#a78bfa", cursor: "pointer" }}>
                        Get LP-Token ↗
                      </span>
                    </div>
                  )}
                </>
              )}

              {pairAddress.length <= 5 && (
                <div style={{ marginTop: 4 }}>
                  <span style={{ fontSize: 13, color: "#a78bfa", cursor: "pointer" }}>
                    Get LP-Token ↗
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Edit / Withdraw tab */}
          {step === "address" && activeTab === "editwithdraw" && (
            <div style={{ ...styles.card, maxWidth: 680, color: "#6b7a8d", fontSize: 13 }}>
              Connect your wallet to view and manage your existing locks.
            </div>
          )}

          {/* ── STEP: LIQUIDITY FORM ── */}
          {step === "liquidity" && (
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 16, maxWidth: 780 }}>

              {/* Lock LP tokens */}
              <div style={styles.card}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#e8edf5", marginBottom: 14 }}>
                  Lock how many LP tokens?
                </div>
                <div style={{ fontSize: 11, color: "#6b7a8d", textAlign: "right", marginBottom: 8 }}>
                  Balance: 100
                </div>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: "#0d1017", border: "1px solid #1e2a3a",
                  borderRadius: 8, padding: "10px 14px", marginBottom: 14,
                }}>
                  <input
                    value={lpAmount}
                    onChange={e => { setLpAmount(e.target.value); setActivePct(null); }}
                    style={{ ...styles.inputBox, fontSize: 18, fontWeight: 700 }}
                  />
                  <button
                    onClick={() => { setLpAmount("100"); setActivePct("100%"); }}
                    style={{
                      background: "#1a2030", border: "1px solid #2a3a4a",
                      borderRadius: 6, padding: "4px 12px",
                      fontSize: 11, fontWeight: 700, color: "#a78bfa",
                      cursor: "pointer", fontFamily: "inherit",
                    }}
                  >MAX</button>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {pctBtns.map(p => (
                    <button key={p} onClick={() => handlePctClick(p)} style={{
                      background: activePct === p ? "rgba(167,139,250,0.15)" : "#1a2030",
                      border: `1px solid ${activePct === p ? "#a78bfa" : "#2a3a4a"}`,
                      borderRadius: 20, padding: "4px 12px",
                      fontSize: 12, color: activePct === p ? "#a78bfa" : "#8899aa",
                      cursor: "pointer", fontFamily: "inherit",
                    }}>{p}</button>
                  ))}
                </div>
              </div>

              {/* Unlock date */}
              <div style={{ ...styles.card, position: "relative" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#e8edf5", marginBottom: 14 }}>
                  Unlock date
                </div>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: "#0d1017", border: "1px solid #1e2a3a",
                  borderRadius: 8, padding: "12px 14px",
                }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#e8edf5" }}>{formattedDate}</div>
                    <div style={{ fontSize: 11, color: "#4a5568", marginTop: 3 }}>A few seconds ago</div>
                  </div>
                  <span
                    style={{ color: "#a78bfa", fontSize: 18, cursor: "pointer" }}
                    onClick={() => setShowCalendar(v => !v)}
                  >📅</span>
                </div>
                {showCalendar && (
                  <DateTimePicker
                    value={unlockDate}
                    onChange={d => setUnlockDate(d)}
                    onClose={() => setShowCalendar(false)}
                  />
                )}
              </div>

              {/* Someone else withdraw */}
              <div style={styles.card}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#e8edf5", marginBottom: 6 }}>
                  Someone else can withdraw tokens
                </div>
                <div style={{ fontSize: 11, color: "#6b7a8d", marginBottom: 12 }}>
                  Allows the token developer locking the LP to declare a different address
                </div>
                <div style={{
                  background: "#0d1017", border: "1px solid #1e2a3a",
                  borderRadius: 8, padding: "10px 14px",
                }}>
                  <input
                    placeholder="Unlocker address"
                    value={unlockerAddr}
                    onChange={e => setUnlockerAddr(e.target.value)}
                    style={{ ...styles.inputBox, fontSize: 12, color: unlockerAddr ? "#c0ccd8" : "#6b7a8d" }}
                  />
                </div>
                {unlockerAddr && (
                  <div style={{ fontSize: 11, color: "#c0ccd8", marginTop: 6, wordBreak: "break-all" }}>
                    {unlockerAddr}
                  </div>
                )}
              </div>

              {/* Referral */}
              <div style={styles.card}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#e8edf5", marginBottom: 6 }}>
                  Do you have a valid referral address?
                </div>
                <div style={{ fontSize: 11, color: "#6b7a8d", marginBottom: 12 }}>
                  Enjoy a 10% flatrate discount if so!
                </div>
                <div style={{
                  background: "#0d1017", border: "1px solid #1e2a3a",
                  borderRadius: 8, padding: "10px 14px",
                }}>
                  <input
                    placeholder="Referral address"
                    value={referralAddr}
                    onChange={e => setReferralAddr(e.target.value)}
                    style={{ ...styles.inputBox, fontSize: 12, color: referralAddr ? "#c0ccd8" : "#6b7a8d" }}
                  />
                </div>
              </div>

              {/* Fee + warning */}
              <div style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={styles.card}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#e8edf5" }}>Fee options</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#e8edf5" }}>1 BNB</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12, color: "#6b7a8d" }}>Your balance: 581 BNB</span>
                    <span style={{ fontSize: 12, color: "#6b7a8d" }}>(+1% CAKEV2)</span>
                  </div>
                </div>
                <div style={{
                  ...styles.card,
                  background: "rgba(167,139,250,0.04)",
                  border: "1px solid rgba(167,139,250,0.15)",
                }}>
                  <div style={{ fontSize: 12, color: "#8899aa", lineHeight: 1.6 }}>
                    Once tokens are locked they cannot be withdrawn under any circumstances
                    until the timer has expired. Please ensure the parameters are correct, as they are final.
                  </div>
                </div>
              </div>

              {/* Approve + Lock */}
              <div style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <button
                  onClick={handleApprove}
                  style={!approved ? styles.gradientBtn : styles.dimBtn}
                >Approve</button>
                <button
                  onClick={handleLock}
                  style={approved ? styles.gradientBtn : styles.dimBtn}
                >Lock</button>
              </div>

            </div>
          )}

          {/* Footer */}
          <div style={{
            borderTop: "1px solid #181f2a", paddingTop: 28,
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-start", flexWrap: "wrap", gap: 20, marginTop: 20,
          }}>
            <img
              src={dogImage}
              alt="logo"
              onClick={() => navigate("/")}
              style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", cursor: "pointer" }}
            />
            <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
              {[
                ["Careers", "About Bullypad", "Council", "Apply for Launchpad"],
                ["Terms and conditions", "Privacy Policy", "Documentation", "Audits"],
                ["Documentation", "Bullypad.js"],
              ].map((col, ci) => (
                <div key={ci} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.map(link => (
                    <span
                      key={link}
                      style={{ fontSize: 12, color: "#4a5568", cursor: "pointer" }}
                      onMouseEnter={e => e.target.style.color = "#8899aa"}
                      onMouseLeave={e => e.target.style.color = "#4a5568"}
                    >{link}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 11, color: "#2a3444", textAlign: "center", paddingBottom: 16 }}>
            Bullypad © 2024 • support@Bullypad.io • All rights reserved. Designed by Twenty-Two.
          </div>

        </div>
      </div>
    </div>
  );
}