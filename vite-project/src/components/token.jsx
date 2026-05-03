import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LeftPanel from "../components/leftPanel";

const NAV_ITEMS = [
  { label: "Token Minter", icon: "◎" },
  { label: "Token Locker", icon: "🔒", locked: true },
  { label: "Liquidity Locker", icon: "◉" },
  { label: "Create ILO", icon: "+" },
];

function CheckItem({ text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{
        width: 18, height: 18, borderRadius: "50%",
        background: "rgba(0,200,100,0.15)", border: "1px solid rgba(0,200,100,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 10, color: "#00cc66", flexShrink: 0,
      }}>✓</span>
      <span style={{ fontSize: 12.5, color: "#8899aa" }}>{text}</span>
    </div>
  );
}

function SuccessModal({ tokenName, tokenSymbol, totalSupply, onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.75)",
      display: "flex", alignItems: "center", justifyContent: "center",
      backdropFilter: "blur(4px)",
    }}>
      <div style={{
        background: "#111318", border: "1px solid #1a2030",
        borderRadius: 16, padding: "36px 40px", width: 420,
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: 16, textAlign: "center",
        boxShadow: "0 0 60px rgba(0,255,200,0.08)",
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: "rgba(0,200,100,0.1)", border: "2px solid rgba(0,200,100,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28,
        }}>✓</div>

        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#ffffff", marginBottom: 6 }}>
            Token Minted Successfully!
          </div>
          <div style={{ fontSize: 13, color: "#6b7a8d", lineHeight: 1.6 }}>
            Your BCNT token has been created and is now live on the blockchain.
          </div>
        </div>

        <div style={{
          width: "100%", background: "#0d1017", border: "1px solid #1a2030",
          borderRadius: 10, padding: "14px 18px",
          display: "flex", flexDirection: "column", gap: 10,
        }}>
          {[
            { label: "Token Name", value: tokenName },
            { label: "Symbol", value: tokenSymbol },
            { label: "Total Supply", value: Number(totalSupply).toLocaleString() },
            { label: "Fee Paid", value: "1.5 BNB" },
            { label: "Status", value: "✓ Confirmed", color: "#00cc66" },
          ].map(row => (
            <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "#4a5568" }}>{row.label}</span>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: row.color || "#e8edf5" }}>{row.value}</span>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 11, color: "#4a5568" }}>
          Tx: <span style={{ color: "#a78bfa", cursor: "pointer" }}>0x3f8a...9c12 ↗</span>
        </div>

        <button onClick={onClose} style={{
          width: "100%",
          background: "linear-gradient(90deg,#a78bfa,#60a5fa,#34d399)",
          border: "none", borderRadius: 10, padding: "12px",
          color: "#fff", fontSize: 14, fontWeight: 700,
          cursor: "pointer", fontFamily: "inherit",
        }}>Done</button>
      </div>
    </div>
  );
}

export default function TokenMinter() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Owner & Developer");
  const [showBanner, setShowBanner] = useState(true);
  const [activeNav, setActiveNav] = useState("Token Minter");

  const [form, setForm] = useState({
    tokenName: "", tokenSymbol: "", totalSupply: "", decimals: "18",
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [minted, setMinted] = useState([]);

  const totalRaw = form.totalSupply
    ? (parseFloat(form.totalSupply) * Math.pow(10, parseInt(form.decimals || 18))).toLocaleString()
    : "0";

  const validate = () => {
    const e = {};
    if (!form.tokenName.trim()) e.tokenName = "Token name is required";
    if (!form.tokenSymbol.trim()) e.tokenSymbol = "Token symbol is required";
    if (!form.totalSupply || isNaN(form.totalSupply) || parseFloat(form.totalSupply) <= 0)
      e.totalSupply = "Enter a valid total supply";
    return e;
  };

  const handleMint = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setMinted(prev => [...prev, { ...form, id: Date.now() }]);
    setForm({ tokenName: "", tokenSymbol: "", totalSupply: "", decimals: "18" });
  };

  const isFormFilled = form.tokenName && form.tokenSymbol && form.totalSupply;

  const styles = {
    root: {
      background: "#0a0c10",
      color: "#d0d6e0",
      fontFamily: "'Inter', 'DM Sans', sans-serif",
      display: "flex",
      fontSize: 13,
      overflow: "hidden",
      position: "fixed",
      inset: 0,
      width: "100%",
    },
    sidebar: {
      width: 210,
      background: "#0d1017",
      borderRight: "1px solid #181f2a",
      display: "flex",
      flexDirection: "column",
      padding: "20px 0",
      flexShrink: 0,
      position: "relative",
      overflowY: "auto",
      overflowX: "hidden",
    },
    sectionLabel: {
      padding: "0 20px 16px",
      fontSize: 15, fontWeight: 700, color: "#e8edf5",
    },
    tabRow: {
      display: "flex", margin: "0 14px 18px",
      background: "#111318", border: "1px solid #1a2030",
      borderRadius: 10, padding: 3, gap: 2,
    },
    tab: (active) => ({
      flex: 1, padding: "7px 8px",
      fontSize: 11, fontWeight: active ? 700 : 500,
      color: active ? "#fff" : "#6b7a8d",
      background: active ? "linear-gradient(90deg,#a78bfa,#60a5fa)" : "transparent",
      border: "none", borderRadius: 8,
      cursor: "pointer", fontFamily: "inherit",
      transition: "all 0.2s", whiteSpace: "nowrap",
    }),
    navItem: (active, locked) => ({
      display: "flex", alignItems: "center", gap: 10,
      padding: "10px 20px",
      cursor: locked ? "not-allowed" : "pointer",
      color: active ? "#e8edf5" : locked ? "#2a3a4a" : "#6b7a8d",
      background: active ? "rgba(255,255,255,0.04)" : "transparent",
      fontSize: 13, fontWeight: active ? 600 : 400,
      borderLeft: active ? "2px solid #a78bfa" : "2px solid transparent",
      transition: "all 0.15s",
      opacity: locked ? 0.4 : 1,
    }),
    main: {
      flex: 1, display: "flex", flexDirection: "column",
      overflow: "hidden", minWidth: 0,
    },
    topbar: {
      height: 50, background: "#0d1017",
      borderBottom: "1px solid #181f2a",
      display: "flex", alignItems: "center",
      justifyContent: "space-between",
      padding: "0 28px", flexShrink: 0,
    },
    content: {
      padding: "28px 32px 40px",
      display: "flex", flexDirection: "column", gap: 22,
      flex: 1, overflowY: "auto", overflowX: "hidden",
    },
    banner: {
      background: "#111318", border: "1px solid #1a2a3a",
      borderRadius: 12, padding: "16px 20px",
      fontSize: 12.5, color: "#8899aa", lineHeight: 1.7,
      position: "relative",
    },
    card: {
      background: "#111318", border: "1px solid #1a2030",
      borderRadius: 12, overflow: "hidden",
    },
    inputWrap: (hasError) => ({
      background: "#0d1017",
      border: `1px solid ${hasError ? "#ff4444" : "#1e2a3a"}`,
      borderRadius: 8, padding: "12px 14px",
      transition: "border-color 0.15s",
    }),
    input: {
      background: "none", border: "none", outline: "none",
      color: "#e8edf5", fontSize: 13.5, width: "100%",
      fontFamily: "inherit",
    },
    label: {
      fontSize: 11.5, color: "#4a5568", marginBottom: 6, display: "block",
    },
    error: { fontSize: 11, color: "#ff6666", marginTop: 4 },
    mintBtn: (enabled) => ({
      width: "100%",
      background: enabled ? "linear-gradient(90deg,#a78bfa,#60a5fa,#34d399)" : "#1a2030",
      border: "none", borderRadius: 10, padding: "13px",
      color: enabled ? "#fff" : "#3a4555",
      fontSize: 14, fontWeight: 700,
      cursor: enabled ? "pointer" : "not-allowed",
      fontFamily: "inherit", transition: "all 0.2s",
    }),
    footer: {
      borderTop: "1px solid #181f2a",
      padding: "28px 32px 20px",
      display: "flex", justifyContent: "space-between",
      alignItems: "flex-start", flexWrap: "wrap", gap: 20,
      flexShrink: 0,
    },
  };

  return (
    <div style={styles.root}>
      <LeftPanel />

      {showSuccess && (
        <SuccessModal
          tokenName={form.tokenName}
          tokenSymbol={form.tokenSymbol}
          totalSupply={form.totalSupply}
          onClose={handleSuccessClose}
        />
      )}

      {/* ── SIDEBAR ── */}
      <div style={styles.sidebar}>
        <div style={{ borderTop: "1px solid #181f2a", paddingTop: 20 }}>
          <div style={styles.sectionLabel}>Services</div>

          <div style={styles.tabRow}>
            {["Investor", "Owner & Developer"].map(t => (
              <button key={t} style={styles.tab(activeTab === t)} onClick={() => setActiveTab(t)}>
                {t}
              </button>
            ))}
          </div>

          {NAV_ITEMS.map(item => (
            <div
              key={item.label}
              style={styles.navItem(activeNav === item.label, item.locked)}
              onClick={() => {
                if (item.locked) return;
                setActiveNav(item.label);
                if (item.label === "Liquidity Locker") navigate("/locker");
                if (item.label === "Create ILO") navigate("/create");
                if (item.label === "Token Minter") navigate("/token-minter");
              }}
              onMouseEnter={e => {
                if (activeNav !== item.label && !item.locked)
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
              }}
              onMouseLeave={e => {
                if (activeNav !== item.label && !item.locked)
                  e.currentTarget.style.background = "transparent";
              }}
            >
              <span style={{
                width: 22, height: 22, borderRadius: "50%",
                border: `1px solid ${activeNav === item.label ? "#a78bfa" : "#2a3a4a"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11,
                color: activeNav === item.label ? "#a78bfa" : item.locked ? "#2a3a4a" : "#3a4555",
                flexShrink: 0,
              }}>{item.icon}</span>
              <span>{item.label}</span>
              {item.locked && (
                <span style={{ fontSize: 9, color: "#3a4555", marginLeft: "auto" }}>LOCKED</span>
              )}
            </div>
          ))}
        </div>

        <div style={{ position: "absolute", bottom: 20, left: 20, fontSize: 20 }}>🌐</div>
      </div>

      {/* ── MAIN ── */}
      <div style={styles.main}>

        {/* Topbar */}
        <div style={styles.topbar}>
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            {["♡", "✈", "📶", "▶▶"].map((ic, i) => (
              <span key={i} style={{ color: "#4a5568", fontSize: 16, cursor: "pointer" }}
                onMouseEnter={e => e.target.style.color = "#8899aa"}
                onMouseLeave={e => e.target.style.color = "#4a5568"}
              >{ic}</span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "#111820", border: "1px solid #1e2d40",
              borderRadius: 20, padding: "5px 12px",
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f5a623", display: "inline-block" }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: "#c0ccd8" }}>BSC</span>
            </div>
            <span style={{ color: "#a78bfa", fontWeight: 700, fontSize: 13 }}>1,581 BNB</span>
            <span style={{ color: "#3a4555" }}>|</span>
            <span style={{ color: "#6b7a8d", fontSize: 11 }}>0xBBB6A7...6hn9</span>
          </div>
        </div>

        {/* Content */}
        <div style={styles.content}>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#ffffff" }}>Token Minter</div>

          {showBanner && (
            <div style={styles.banner}>
              <button onClick={() => setShowBanner(false)} style={{
                position: "absolute", top: 12, right: 14,
                background: "none", border: "none", color: "#4a5568", fontSize: 16, cursor: "pointer",
              }}>✕</button>
              BCNT tokens are fully BEP20 compliant Non-Mintable Tokens. Use the DOTIPAD Token factory
              to mint your very own token at the click of a button. Your BCNT token will be shown
              favourably in the DOTIPAD browser and bypass the need for an audit on the token contract
              itself, as well as when using our ILO dapp. Anyone can query our BCNT token mint factory
              with your token address to see your new token is a valid, safe, and BEP20 compliant token.
            </div>
          )}

          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#e8edf5", marginBottom: 14 }}>
              BEP20 compliant Non-Mintable Tokens (BCNT) Specs
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 32px" }}>
              {[
                "No mint function",
                "Fully BEP20 compliant",
                "No owner / admin functions",
                "Fully decentralised",
                "No unsafe code in the token contract itself",
              ].map(spec => <CheckItem key={spec} text={spec} />)}
            </div>
          </div>

          {/* Main 2-col */}
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 320px", gap: 16, alignItems: "start" }}>

            {/* Mint form */}
            <div style={styles.card}>
              <div style={{ padding: "20px 20px 0", fontSize: 15, fontWeight: 700, color: "#e8edf5", marginBottom: 18 }}>
                Mint your own BCNT!
              </div>
              <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: 14 }}>

                <div>
                  <label style={styles.label}>Token Name</label>
                  <div style={styles.inputWrap(!!errors.tokenName)}>
                    <input style={styles.input} placeholder="e.g. My Awesome Token"
                      value={form.tokenName}
                      onChange={e => { setForm(f => ({ ...f, tokenName: e.target.value })); setErrors(er => ({ ...er, tokenName: "" })); }}
                    />
                  </div>
                  {errors.tokenName && <div style={styles.error}>{errors.tokenName}</div>}
                </div>

                <div>
                  <label style={styles.label}>Token Symbol</label>
                  <div style={styles.inputWrap(!!errors.tokenSymbol)}>
                    <input style={styles.input} placeholder="e.g. MAT"
                      value={form.tokenSymbol}
                      onChange={e => { setForm(f => ({ ...f, tokenSymbol: e.target.value.toUpperCase() })); setErrors(er => ({ ...er, tokenSymbol: "" })); }}
                    />
                  </div>
                  {errors.tokenSymbol && <div style={styles.error}>{errors.tokenSymbol}</div>}
                </div>

                <div>
                  <label style={styles.label}>Total Supply</label>
                  <div style={styles.inputWrap(!!errors.totalSupply)}>
                    <input style={styles.input} placeholder="e.g. 1000000" type="number"
                      value={form.totalSupply}
                      onChange={e => { setForm(f => ({ ...f, totalSupply: e.target.value })); setErrors(er => ({ ...er, totalSupply: "" })); }}
                    />
                  </div>
                  <div style={{ fontSize: 11, color: "#4a5568", marginTop: 4 }}>
                    Total supply (excluding decimals e.g. 100 tokens)
                  </div>
                  {errors.totalSupply && <div style={styles.error}>{errors.totalSupply}</div>}
                </div>

                <div>
                  <label style={styles.label}>Decimals</label>
                  <div style={styles.inputWrap(false)}>
                    <input style={styles.input} type="number" value={form.decimals}
                      onChange={e => setForm(f => ({ ...f, decimals: e.target.value }))}
                    />
                  </div>
                  <div style={{ fontSize: 11, color: "#4a5568", marginTop: 4 }}>Decimals (18 recommended)</div>
                </div>

                <div style={{ borderTop: "1px solid #1a2030", paddingTop: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: "#6b7a8d" }}>Total supply (including decimals - raw amount)</span>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: "#a78bfa" }}>Fee: 1.5 BNB</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#e8edf5" }}>{totalRaw}</span>
                    <span style={{ fontSize: 11, color: "#4a5568" }}>+ 0.2% total supply</span>
                  </div>
                </div>

                <button style={styles.mintBtn(!!isFormFilled)} onClick={handleMint}>
                  Mint A New Token
                </button>
              </div>
            </div>

            {/* Your BCNT panel */}
            <div style={styles.card}>
              <div style={{
                padding: "16px 18px", borderBottom: "1px solid #1a2030",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#e8edf5" }}>Your BCNT</span>
                <span style={{ color: "#4a5568", fontSize: 16, cursor: "pointer" }}
                  onMouseEnter={e => e.target.style.color = "#8899aa"}
                  onMouseLeave={e => e.target.style.color = "#4a5568"}
                >⟳</span>
              </div>
              <div style={{ padding: "16px 18px" }}>
                {minted.length === 0 ? (
                  <div style={{ fontSize: 12.5, color: "#4a5568", lineHeight: 1.7 }}>
                    You have not minted any BCNT yet.<br />
                    All BCNT generated by your account will be shown here.
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {minted.map(token => (
                      <div key={token.id} style={{
                        background: "#0d1017", border: "1px solid #1a2030",
                        borderRadius: 8, padding: "10px 14px",
                      }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#e8edf5" }}>{token.tokenName}</div>
                        <div style={{ fontSize: 11, color: "#4a5568", marginTop: 2 }}>
                          {token.tokenSymbol} · Supply: {Number(token.totalSupply).toLocaleString()}
                        </div>
                        <div style={{ fontSize: 11, color: "#00cc66", marginTop: 4 }}>✓ Minted</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={styles.footer}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#e8edf5", letterSpacing: -0.5 }}>
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
                    <span key={link}
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
            Dotipad © 2021 • support@dotipad.io • All rights reserved. Designed by Twenty-Two.
          </div>

        </div>
      </div>
    </div>
  );
}