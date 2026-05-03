import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LeftPanel from "./leftPanel";

const NAV_ITEMS = [
  { label: "Token Minter",      path: "/token-minter",      icon: "◎" },
  { label: "Token Locker",            icon: "◎" },
  { label: "Liquidity Locker",  path: "/locker",   icon: "◉" },
  { label: "Create ILO",        path: "/create",             icon: "+", active: true },
];

const RAYDIUM_URL =
  "https://raydium.io/swap/?inputCurrency=sol&outputCurrency=gXn8BEGmac3whuQsumEcUXv3BSext6r7kFYGJaRKMeL&fixed=out";
const JUPITER_URL =
  "https://jup.ag/swap/SOL-BULLY_gXn8BEGmac3whuQsumEcUXv3BSext6r7kFYGJaRKMeL";

// Simple donut/pie chart SVG
function TokenomicsChart({ presalePct = 55, liquidityPct = 30, feesPct = 5, lockedPct = 8, unlockedPct = 2 }) {
  const size = 120, cx = 60, cy = 60, r = 45, strokeW = 28;
  const circ = 2 * Math.PI * r;
  const segments = [
    { pct: presalePct,   color: "#9945FF" },
    { pct: liquidityPct, color: "#4a90d9" },
    { pct: feesPct,      color: "#f5a623" },
    { pct: lockedPct,    color: "#00c8b4" },
    { pct: unlockedPct,  color: "#3a4555" },
  ];
  let offset = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
      {segments.map((s, i) => {
        const dash = (s.pct / 100) * circ;
        const gap  = circ - dash;
        const el   = (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none"
            stroke={s.color} strokeWidth={strokeW}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-offset * circ / 100}
          />
        );
        offset += s.pct;
        return el;
      })}
    </svg>
  );
}

// Block number picker modal
function BlockModal({ value, onSelect, onClose }) {
  const [val, setVal] = useState(value || "0");
  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={onClose}
    >
      <div
        style={{ background: "#131920", border: "1px solid #1e2a3a", borderRadius: 12, padding: "24px", minWidth: 320 }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ fontSize: 15, fontWeight: 700, color: "#e8edf5", marginBottom: 16 }}>Block number</div>
        <input
          value={val}
          onChange={e => setVal(e.target.value)}
          style={{ width: "100%", background: "#0d1017", border: "1px solid #1e2a3a", borderRadius: 8, padding: "10px 12px", color: "#e8edf5", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
        />
        <div style={{ fontSize: 11, color: "#4a5568", marginTop: 6 }}>Current block: 101990582</div>
        <button
          onClick={() => { onSelect(val); onClose(); }}
          style={{ marginTop: 16, width: "100%", background: "linear-gradient(90deg,#a78bfa,#60a5fa)", border: "none", borderRadius: 8, padding: "11px", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}
        >Select</button>
      </div>
    </div>
  );
}

// Success modal
function SuccessModal({ onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
      <div style={{ background: "#111318", border: "1px solid #1a2030", borderRadius: 16, padding: "40px", width: 420, display: "flex", flexDirection: "column", alignItems: "center", gap: 18, textAlign: "center" }}>
        <div style={{ width: 68, height: 68, borderRadius: "50%", background: "rgba(0,200,100,0.1)", border: "2px solid rgba(0,200,100,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>✓</div>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 8 }}>ILO Created Successfully!</div>
          <div style={{ fontSize: 13, color: "#6b7a8d", lineHeight: 1.6 }}>Your Initial Liquidity Offering has been approved and created on the blockchain.</div>
        </div>
        <div style={{ width: "100%", background: "#0d1017", border: "1px solid #1a2030", borderRadius: 10, padding: "14px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "Pair",     value: "DEGE / BNB" },
            { label: "Hard Cap", value: "1000 BNB" },
            { label: "Soft Cap", value: "500 BNB" },
            { label: "Fee Paid", value: "1.5 BNB" },
            { label: "Status",   value: "✓ Live", color: "#00cc66" },
          ].map(r => (
            <div key={r.label} style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, color: "#4a5568" }}>{r.label}</span>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: r.color || "#e8edf5" }}>{r.value}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: "#4a5568" }}>Tx: <span style={{ color: "#a78bfa", cursor: "pointer" }}>0x9f2c...a441 ↗</span></div>
        <button
          onClick={onClose}
          style={{ width: "100%", background: "linear-gradient(90deg,#a78bfa,#60a5fa,#34d399)", border: "none", borderRadius: 10, padding: "12px", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
        >Done — View My ILO</button>
      </div>
    </div>
  );
}

export default function CreateILO() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Owner & Developer");
  const [launchpadExpanded, setLaunchpadExpanded] = useState(false);
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenFound, setTokenFound] = useState(false);
  const [searching, setSearching] = useState(false);

  // Form fields
  const [presaleAmount, setPresaleAmount]   = useState("");
  const [softCap, setSoftCap]               = useState("");
  const [hardCap, setHardCap]               = useState("");
  const [bnbLimit, setBnbLimit]             = useState("");
  const [lockLiquidity, setLockLiquidity]   = useState("1 year");
  const [listingPct, setListingPct]         = useState("10%");
  const [liquidityPct, setLiquidityPct]     = useState(60);
  const [referral, setReferral]             = useState("");
  const [startBlock, setStartBlock]         = useState("10299351");
  const [endBlock, setEndBlock]             = useState("20782551");
  const [showStartBlock, setShowStartBlock] = useState(false);
  const [showEndBlock, setShowEndBlock]     = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);
  const [predictionSlider, setPredictionSlider] = useState(500);
  const [approved, setApproved]             = useState(false);
  const [showSuccess, setShowSuccess]       = useState(false);

  const presaleRate      = presaleAmount && hardCap ? Math.round(parseFloat(presaleAmount) / parseFloat(hardCap)) : 0;
  const listingRate      = presaleRate ? Math.round(presaleRate * 0.9) : 0;
  const amountForSale    = parseFloat(presaleAmount) || 0;
  const amountForLiquidity = hardCap ? Math.round(parseFloat(hardCap) * (liquidityPct / 100) * (presaleRate || 1)) : 0;
  const fees             = hardCap ? Math.round(parseFloat(hardCap) * 0.018 * (presaleRate || 1)) : 0;
  const totalRequired    = amountForSale + amountForLiquidity + fees;

  const bnbLiquidityPred = predictionSlider ? (predictionSlider * liquidityPct / 100).toFixed(2) : "0";
  const yourBnb          = predictionSlider ? (predictionSlider * 0.964).toFixed(2) : "0";
  const degeLiqPred      = bnbLiquidityPred ? Math.round(parseFloat(bnbLiquidityPred) * listingRate) : 0;
  const degeSoldPred     = predictionSlider ? Math.round(predictionSlider * presaleRate) : 0;

  const handleSearch  = () => {
    if (!tokenAddress) return;
    setSearching(true);
    setTimeout(() => { setSearching(false); setTokenFound(true); }, 900);
  };
  const handleApprove = () => setApproved(true);
  const handleCreate  = () => { if (approved) setShowSuccess(true); };

  const s = {
    root:       { minHeight: "100vh", background: "#0a0c10", color: "#d0d6e0", fontFamily: "'Inter','DM Sans',sans-serif", display: "flex", fontSize: 13 },
    sidebar:    { width: 210, background: "#0d1017", borderRight: "1px solid #181f2a", display: "flex", flexDirection: "column", padding: "20px 0", flexShrink: 0, position: "relative" },
    main:       { flex: 1, display: "flex", flexDirection: "column", overflow: "auto" },
    topbar:     { height: 50, background: "#0d1017", borderBottom: "1px solid #181f2a", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", flexShrink: 0 },
    content:    { padding: "28px 32px 40px", display: "flex", flexDirection: "column", gap: 20, flex: 1 },
    card:       { background: "#111318", border: "1px solid #1a2030", borderRadius: 12, padding: "20px" },
    input:      (w) => ({ background: "#0d1017", border: "1px solid #1e2a3a", borderRadius: 8, padding: "10px 12px", color: "#e8edf5", fontSize: 13, fontFamily: "inherit", outline: "none", width: w || "100%", boxSizing: "border-box" }),
    label:      { fontSize: 11, color: "#4a5568", marginBottom: 4, display: "block" },
    tabRow:     { display: "flex", margin: "0 14px 18px", background: "#111318", border: "1px solid #1a2030", borderRadius: 10, padding: 3, gap: 2 },
    tab:        (a) => ({ flex: 1, padding: "7px 6px", fontSize: 11, fontWeight: a ? 700 : 500, color: a ? "#fff" : "#6b7a8d", background: a ? "linear-gradient(90deg,#a78bfa,#60a5fa)" : "transparent", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }),
    navItem:    (a) => ({ display: "flex", alignItems: "center", gap: 10, padding: "10px 20px", cursor: "pointer", color: a ? "#e8edf5" : "#6b7a8d", background: a ? "rgba(255,255,255,0.04)" : "transparent", fontSize: 13, fontWeight: a ? 600 : 400, borderLeft: a ? "2px solid #a78bfa" : "2px solid transparent", transition: "color 0.15s" }),
    pctBtn:     (a) => ({ background: a ? "rgba(167,139,250,0.2)" : "#1a2030", border: `1px solid ${a ? "#a78bfa" : "#242f40"}`, borderRadius: 20, padding: "4px 12px", fontSize: 12, color: a ? "#a78bfa" : "#8899aa", cursor: "pointer", fontFamily: "inherit" }),
    approveBtn: { background: "linear-gradient(90deg,#a78bfa,#60a5fa)", border: "none", borderRadius: 10, padding: "13px 28px", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", flex: 1 },
    createBtn:  (enabled) => ({ background: enabled ? "linear-gradient(90deg,#34d399,#60a5fa)" : "#1a2030", border: "none", borderRadius: 10, padding: "13px 28px", color: enabled ? "#fff" : "#3a4555", fontSize: 14, fontWeight: 700, cursor: enabled ? "pointer" : "not-allowed", fontFamily: "inherit", flex: 1 }),
    footer:     { borderTop: "1px solid #181f2a", padding: "32px 32px 16px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20 },
    swapBtn:    (color) => ({ display: "flex", alignItems: "center", gap: 6, background: "#111820", border: `1px solid ${color}30`, borderRadius: 20, padding: "5px 14px", fontSize: 12, color, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.3, transition: "all 0.2s" }),
  };

  return (
    <div style={s.root}>
      <LeftPanel />

      {showSuccess    && <SuccessModal onClose={() => { setShowSuccess(false); navigate("/ilos"); }} />}
      {showStartBlock && <BlockModal value={startBlock} onSelect={setStartBlock} onClose={() => setShowStartBlock(false)} />}
      {showEndBlock   && <BlockModal value={endBlock}   onSelect={setEndBlock}   onClose={() => setShowEndBlock(false)} />}

      {/* ── SIDEBAR ── */}
      <div style={s.sidebar}>
        {/* Logo → home */}
        <div
          style={{ padding: "0 20px 28px", cursor: "pointer", fontSize: 20, fontWeight: 800, color: "#e8edf5" }}
          onClick={() => navigate("/")}
        >
          Dot<span style={{ color: "#a78bfa" }}>IPA</span>D
        </div>

        <div style={{ borderTop: "1px solid #181f2a", paddingTop: 20 }}>
          <div style={{ padding: "0 20px 16px", fontSize: 15, fontWeight: 700, color: "#e8edf5" }}>Services</div>

          {/* Role tabs */}
          <div style={s.tabRow}>
            {["Investor", "Owner & Developer"].map(t => (
              <button key={t} style={s.tab(activeTab === t)} onClick={() => setActiveTab(t)}>{t}</button>
            ))}
          </div>

          {/* Nav items — each navigates to its path */}
          {NAV_ITEMS.map(item => (
            <div
              key={item.label}
              style={s.navItem(item.active)}
              onClick={() => item.path && navigate(item.path)}
              onMouseEnter={e => { if (!item.active) e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
              onMouseLeave={e => { if (!item.active) e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ width: 22, height: 22, borderRadius: "50%", border: `1px solid ${item.active ? "#a78bfa" : "#2a3a4a"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: item.active ? "#a78bfa" : "#3a4555", flexShrink: 0 }}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div style={{ position: "absolute", bottom: 20, left: 20, fontSize: 20 }}>🌐</div>
      </div>

      {/* ── MAIN ── */}
      <div style={s.main}>

        {/* Topbar */}
        <div style={s.topbar}>
          {/* LEFT: Raydium + Jupiter swap buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              style={s.swapBtn("#14F195")}
              onClick={() => window.open(RAYDIUM_URL, "_blank")}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(20,241,149,0.08)"; e.currentTarget.style.borderColor = "#14F19560"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#111820"; e.currentTarget.style.borderColor = "#14F19530"; }}
            >
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#14F195", display: "inline-block", flexShrink: 0 }} />
              Raydium
            </button>
            <button
              style={s.swapBtn("#C7F284")}
              onClick={() => window.open(JUPITER_URL, "_blank")}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(199,242,132,0.08)"; e.currentTarget.style.borderColor = "#C7F28460"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#111820"; e.currentTarget.style.borderColor = "#C7F28430"; }}
            >
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#C7F284", display: "inline-block", flexShrink: 0 }} />
              Jupiter
            </button>
          </div>

          {/* RIGHT: chain chip + wallet */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#111820", border: "1px solid #1e2d40", borderRadius: 20, padding: "5px 12px" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#9945FF", display: "inline-block" }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: "#c0ccd8" }}>SOLANA</span>
            </div>
            <span style={{ color: "#a78bfa", fontWeight: 700, fontSize: 13 }}>1,581 BNB</span>
            <span style={{ color: "#3a4555" }}>|</span>
            <span style={{ color: "#6b7a8d", fontSize: 11 }}>0xBBB6A7...6hn9</span>
          </div>
        </div>

        {/* Content */}
        <div style={s.content}>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#fff" }}>
            {tokenFound ? "Create ILO" : "Create Initial Liquidity Offering (ILO)"}
          </div>

          {/* Exchange selector */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#111318", border: "1px solid #1a2030", borderRadius: 10, padding: "10px 16px", cursor: "pointer", alignSelf: "flex-start" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#f5a623,#e8703a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🥞</div>
            <div>
              <div style={{ fontSize: 10, color: "#4a5568" }}>Select exchange</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#e8edf5" }}>PancakeSwap V2</div>
            </div>
            <span style={{ color: "#4a5568" }}>▾</span>
          </div>

          {/* Launchpad info card */}
          <div style={{ ...s.card, padding: "16px 20px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#e8edf5", marginBottom: 6 }}>Launchpad</div>
                <div style={{ fontSize: 12.5, color: "#6b7a8d", lineHeight: 1.6 }}>
                  Run a decentralised Initial Liquidity Offering (ILO) to raise funds and liquidity for your project with our trusted decentalised launchpad.
                </div>
              </div>
              <button
                onClick={() => setLaunchpadExpanded(v => !v)}
                style={{ background: "none", border: "none", color: "#a78bfa", fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4, flexShrink: 0, marginLeft: 16 }}
              >
                {launchpadExpanded ? "Hide ▲" : "View More ▾"}
              </button>
            </div>

            {launchpadExpanded && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
                <div style={{ background: "#0d1017", border: "1px solid #1a2030", borderRadius: 10, padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 10 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,#a78bfa,#60a5fa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>D</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#e8edf5" }}>DOTipad</div>
                  <div style={{ fontSize: 12, color: "#6b7a8d", lineHeight: 1.6 }}>
                    Is your project stellar!? Apply to be incubated by DOTipad by sending us a mail at: <span style={{ color: "#a78bfa" }}>support@DOTipad.io</span>
                  </div>
                  <div style={{ fontSize: 11.5, color: "#4a5568", lineHeight: 1.5 }}>
                    If you would like to be incubated do not create a presale yet, we'll help with marketing, KYC, Audits, Hardcaps and presale parameters.
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#e8edf5", marginBottom: 12 }}>Presale best practices</div>
                  <ul style={{ margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      <>Raise around $300k. <strong style={{ color: "#e8edf5" }}>The best presales raise less.</strong> Dont be greedy. Raise less so there is room for your market cap to grow.</>,
                      "Use token vesting to lock as many of your team tokens as you can to increase trust in your project.",
                      "Use token vesting to send tokens to marketers if you need to give tokens to anyone before a presale concludes.",
                      <>Build trust by applying for <strong style={{ color: "#e8edf5" }}>Audits and KYC</strong>. Alternatively use our DEGEGAM safe-token minter to mint a pre-audited token.</>,
                    ].map((item, i) => (
                      <li key={i} style={{ fontSize: 12, color: "#6b7a8d", lineHeight: 1.6 }}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Create Your Presale */}
          <div style={s.card}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#e8edf5", marginBottom: 16 }}>Create Your Presale</div>
            <div style={{ display: "flex", alignItems: "center", background: "#0d1017", border: "1px solid #1e2a3a", borderRadius: 8, padding: "10px 14px", gap: 10 }}>
              <input
                style={{ background: "none", border: "none", outline: "none", color: "#e8edf5", fontSize: 13, flex: 1, fontFamily: "inherit" }}
                placeholder="Enter your token address..."
                value={tokenAddress}
                onChange={e => { setTokenAddress(e.target.value); setTokenFound(false); }}
                onKeyDown={e => e.key === "Enter" && handleSearch()}
              />
              <span onClick={handleSearch} style={{ color: searching ? "#a78bfa" : "#4a5568", cursor: "pointer", fontSize: 16 }}>
                {searching ? "⟳" : "🔍"}
              </span>
            </div>

            {tokenFound && (
              <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ background: "#0d1017", border: "1px solid #1a2030", borderRadius: 10, padding: "20px", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#f5a623,#e8703a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>D</div>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#f5a623,#f0c040)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", marginLeft: -8 }}>B</div>
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#e8edf5" }}>DEGE/BNB</span>
                </div>
                <div style={{ background: "#0d1017", border: "1px solid #1a2030", borderRadius: 10, padding: "16px", display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { label: "Buyers participate with",          value: "BNB ▾",        color: "#f5a623" },
                    { label: "Pancakeswap V2 pair to be created",value: "DEGE/BNB" },
                    { label: "Presale creator ⓘ",                value: "0xBBB6A7...6hn9" },
                  ].map(r => (
                    <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 11.5, color: "#6b7a8d" }}>{r.label}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: r.color || "#e8edf5" }}>{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main form — only show after token found */}
          {tokenFound && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

                {/* LEFT col */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={s.card}>
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#e8edf5" }}>How many DEGE are up for presale?</span>
                        <span style={{ fontSize: 11, color: "#6b7a8d" }}>Balance: 4,972,535 DEGE</span>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <input style={{ ...s.input(), flex: 1 }} placeholder="0" value={presaleAmount} onChange={e => setPresaleAmount(e.target.value)} type="number" />
                        <button onClick={() => setPresaleAmount("4972535")}
                          style={{ background: "#1a2030", border: "1px solid #2a3a4a", borderRadius: 8, padding: "0 14px", color: "#a78bfa", fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>MAX</button>
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                      <div>
                        <label style={s.label}>Soft Cap</label>
                        <div style={{ display: "flex", gap: 6 }}>
                          <input style={s.input()} placeholder="0" value={softCap} onChange={e => setSoftCap(e.target.value)} type="number" />
                          <span style={{ display: "flex", alignItems: "center", fontSize: 12, color: "#6b7a8d", paddingRight: 4 }}>BNB</span>
                        </div>
                      </div>
                      <div>
                        <label style={s.label}>Hard Cap</label>
                        <div style={{ display: "flex", gap: 6 }}>
                          <input style={s.input()} placeholder="0" value={hardCap} onChange={e => setHardCap(e.target.value)} type="number" />
                          <span style={{ display: "flex", alignItems: "center", fontSize: 12, color: "#6b7a8d", paddingRight: 4 }}>BNB</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <div>
                        <label style={s.label}>BNB limit per user</label>
                        <div style={{ display: "flex", gap: 6 }}>
                          <input style={s.input()} placeholder="0" value={bnbLimit} onChange={e => setBnbLimit(e.target.value)} type="number" />
                          <span style={{ display: "flex", alignItems: "center", fontSize: 12, color: "#6b7a8d", paddingRight: 4 }}>BNB</span>
                        </div>
                      </div>
                      <div>
                        <label style={s.label}>Lock Liquidity for</label>
                        <select style={{ ...s.input(), appearance: "none" }} value={lockLiquidity} onChange={e => setLockLiquidity(e.target.value)}>
                          {["1 year", "6 months", "2 years", "Forever"].map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Start / End blocks */}
                  <div style={s.card}>
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#e8edf5", marginBottom: 10 }}>Start Date</div>
                      <div style={{ background: "#0d1017", border: "1px solid #1a2030", borderRadius: 8, padding: "12px 14px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "#e8edf5" }}>Tue 24 Jul, 2021, 21:00</div>
                            <div style={{ fontSize: 11, color: "#4a5568" }}>A few seconds ago</div>
                            <div style={{ fontSize: 11, color: "#4a5568" }}>block {startBlock}</div>
                          </div>
                          <div style={{ display: "flex", gap: 8 }}>
                            <span onClick={() => setShowStartBlock(true)} style={{ color: "#6b7a8d", cursor: "pointer", fontSize: 16 }}>📅</span>
                            <span style={{ color: "#6b7a8d", cursor: "pointer", fontSize: 16 }}>⧉</span>
                          </div>
                        </div>
                        <div style={{ fontSize: 11, color: "#ffaa00", marginTop: 8 }}>Presale should ideally start 1 week from today to give you time to raise awareness</div>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#e8edf5", marginBottom: 10 }}>End Date</div>
                      <div style={{ background: "#0d1017", border: "1px solid #1a2030", borderRadius: 8, padding: "12px 14px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "#e8edf5" }}>Tue 31 Jul, 2021, 21:00</div>
                            <div style={{ fontSize: 11, color: "#4a5568" }}>in 7 days</div>
                            <div style={{ fontSize: 11, color: "#4a5568" }}>block {endBlock}</div>
                          </div>
                          <div style={{ display: "flex", gap: 8 }}>
                            <span onClick={() => setShowEndBlock(true)} style={{ color: "#6b7a8d", cursor: "pointer", fontSize: 16 }}>📅</span>
                            <span style={{ color: "#6b7a8d", cursor: "pointer", fontSize: 16 }}>⧉</span>
                          </div>
                        </div>
                        <div style={{ fontSize: 11, color: "#4a5568", marginTop: 6 }}>Presale duration: 7 days / {Math.abs(parseInt(endBlock) - parseInt(startBlock)).toLocaleString()} blocks</div>
                      </div>
                    </div>
                  </div>

                  {/* Referral */}
                  <div style={s.card}>
                    <label style={{ ...s.label, fontSize: 13, color: "#e8edf5", fontWeight: 600 }}>Referral address (Optional)</label>
                    <input style={s.input()} placeholder="Referral address" value={referral} onChange={e => setReferral(e.target.value)} />
                  </div>
                </div>

                {/* RIGHT col */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={s.card}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                      <span style={{ fontSize: 12.5, color: "#6b7a8d" }}>Presale rate</span>
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: "#e8edf5" }}>1 BNB = {presaleRate || 0} DEGE</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                      <span style={{ fontSize: 12.5, color: "#6b7a8d" }}>Pancake listing rate</span>
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: "#e8edf5" }}>1 BNB = {listingRate || 0} DEGE</span>
                    </div>
                    <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
                      {["0%", "10%", "25%", "30%", "50%"].map(p => (
                        <button key={p} style={s.pctBtn(listingPct === p)} onClick={() => setListingPct(p)}>{p}</button>
                      ))}
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 12.5, color: "#6b7a8d" }}>Percent of raised BNB used for liquidity</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#e8edf5" }}>{liquidityPct}%</span>
                      </div>
                      <input type="range" min="50" max="100" value={liquidityPct} onChange={e => setLiquidityPct(parseInt(e.target.value))}
                        style={{ width: "100%", accentColor: "#a78bfa" }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                      <span style={{ fontSize: 12, color: "#6b7a8d" }}>Additional tokens required for liquidity if hardcap is met</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
                      <span style={{ fontSize: 18 }}>🎯</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#e8edf5" }}>250 DEGE</span>
                    </div>
                    <button
                      onClick={() => setShowPrediction(v => !v)}
                      style={{ width: "100%", background: showPrediction ? "rgba(167,139,250,0.15)" : "#1a2030", border: `1px solid ${showPrediction ? "#a78bfa" : "#242f40"}`, borderRadius: 10, padding: "11px", color: showPrediction ? "#a78bfa" : "#8899aa", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                    >
                      Presale prediction {showPrediction ? "▲" : "▾"}
                    </button>
                  </div>

                  {showPrediction && (
                    <div style={s.card}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#e8edf5", marginBottom: 4 }}>Presale prediction</div>
                      <div style={{ fontSize: 11.5, color: "#6b7a8d", marginBottom: 14 }}>Use the slider to predict fee and liquidity amounts depending on amounts raised in presale.</div>
                      <div style={{ position: "relative", marginBottom: 20 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#4a5568", marginBottom: 4 }}>
                          <span>{softCap || 0} BNB<br /><span style={{ color: "#6b7a8d", fontSize: 10 }}>Soft Cap</span></span>
                          <span style={{ textAlign: "center", color: "#a78bfa", fontWeight: 700 }}>{predictionSlider} BNB</span>
                          <span style={{ textAlign: "right" }}>{hardCap || 1000} BNB<br /><span style={{ color: "#6b7a8d", fontSize: 10 }}>Hard Cap</span></span>
                        </div>
                        <input type="range" min={parseFloat(softCap) || 0} max={parseFloat(hardCap) || 1000}
                          value={predictionSlider} onChange={e => setPredictionSlider(parseInt(e.target.value))}
                          style={{ width: "100%", accentColor: "#a78bfa" }} />
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                        {[
                          { label: "DOTipad fee",    value: (predictionSlider * 0.018).toFixed(1),            unit: "BNB"  },
                          { label: "BNB liquidity",  value: bnbLiquidityPred,                                  unit: "BNB"  },
                          { label: "Your BNB",       value: yourBnb,                                           unit: "BNB"  },
                          { label: "DOTipad fee",    value: Math.round(predictionSlider * 0.018 * (presaleRate || 1)), unit: "DEGE" },
                          { label: "DEGE liquidity", value: degeLiqPred.toLocaleString(),                      unit: "DEGE" },
                          { label: "DEGE sold",      value: degeSoldPred.toLocaleString(),                     unit: "DEGE" },
                        ].map((item, i) => (
                          <div key={i} style={{ background: "#0d1017", border: "1px solid #1a2030", borderRadius: 8, padding: "10px 12px" }}>
                            <div style={{ fontSize: 10.5, color: "#4a5568", marginBottom: 4 }}>{item.label}</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#e8edf5" }}>{item.value}</div>
                            <div style={{ fontSize: 10, color: "#6b7a8d" }}>{item.unit}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Fees + Tokenomics */}
                  <div style={s.card}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#e8edf5", marginBottom: 12 }}>Fees</div>
                    {["1.5 BNB – Presale & Locking fee", "1.8% – BNB raised fee", "1.8% – DEGE sold fee", "DOTipad PancakeV2 locking fee"].map(f => (
                      <div key={f} style={{ fontSize: 12, color: "#6b7a8d", marginBottom: 6 }}>{f}</div>
                    ))}
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#e8edf5", marginTop: 16, marginBottom: 12 }}>Tokenomics</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <TokenomicsChart />
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {[
                          { label: "Presale",   color: "#9945FF" },
                          { label: "Liquidity", color: "#4a90d9" },
                          { label: "Fees",      color: "#f5a623" },
                          { label: "Locked",    color: "#00c8b4" },
                          { label: "Unlocked",  color: "#3a4555" },
                        ].map(item => (
                          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ width: 8, height: 8, borderRadius: "50%", background: item.color, display: "inline-block" }} />
                            <span style={{ fontSize: 12, color: "#8899aa" }}>{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total required summary */}
              <div style={{ ...s.card, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <div style={{ fontSize: 12.5, color: "#6b7a8d", marginBottom: 6 }}>Total DEGE required</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#e8edf5" }}>{totalRequired.toLocaleString()} DEGE</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { label: "Amount for sale",      value: `${amountForSale.toLocaleString()} DEGE` },
                    { label: "Amount for liquidity", value: `${amountForLiquidity.toLocaleString()}` },
                    { label: "Fees",                 value: `${fees.toLocaleString()} DEGE` },
                  ].map(r => (
                    <div key={r.label} style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 12, color: "#6b7a8d" }}>{r.label}</span>
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: "#e8edf5" }}>{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ fontSize: 11.5, color: "#4a5568" }}>
                Please note: If the presale is a success, any unsold tokens are sent to the 0x00...dEa0 burn address.
              </div>

              {/* Approve + Create */}
              <div style={{ display: "flex", gap: 12 }}>
                <button style={s.approveBtn} onClick={handleApprove}>
                  {approved ? "✓ Approved" : "Approve"}
                </button>
                <button style={s.createBtn(approved)} onClick={handleCreate}>
                  Create Presale
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div style={s.footer}>
          {/* Logo → home */}
          <div
            style={{ fontSize: 18, fontWeight: 800, color: "#e8edf5", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Dot<span style={{ color: "#a78bfa" }}>IPA</span>D
          </div>
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            {[
              ["Careers", "About Dotipad", "Council", "Apply for Launchpad"],
              ["Terms and conditions", "Privacy Policy", "Documentation", "Audits"],
              ["Documentation", "Dotipad.js"],
            ].map((col, ci) => (
              <div key={ci} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {col.map(link => (
                  <span key={link} style={{ fontSize: 12, color: "#4a5568", cursor: "pointer" }}
                    onMouseEnter={e => e.target.style.color = "#8899aa"}
                    onMouseLeave={e => e.target.style.color = "#4a5568"}>{link}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{ fontSize: 11, color: "#2a3444", textAlign: "center", padding: "0 0 16px" }}>
          Dotipad © 2021 • support@dotipad.io • All rights reserved. Designed by Twenty-Two.
        </div>
      </div>
    </div>
  );
}