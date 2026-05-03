import { useState } from "react";
import { useNavigate } from "react-router-dom";
import chartImage from "../assets/info.png";
import LeftPanel from "../components/leftPanel";

const NAV_ITEMS = [
  { label: "Tokens", icon: "○" },
  { label: "Pairs", icon: "◎" },
  { label: "ILO's", icon: "◈", active: true },
];

function LogoImg() {
  return (
    <img
     
    />
  );
}

function AuditBadge({ label, color }) {
  const colors = {
    green: { bg: "rgba(0,200,100,0.1)", text: "#00cc66", border: "rgba(0,200,100,0.25)" },
    blue: { bg: "rgba(74,144,217,0.1)", text: "#4a90d9", border: "rgba(74,144,217,0.25)" },
    teal: { bg: "rgba(0,200,180,0.1)", text: "#00c8b4", border: "rgba(0,200,180,0.25)" },
  };
  const c = colors[color] || colors.green;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        background: c.bg,
        color: c.text,
        border: `1px solid ${c.border}`,
        borderRadius: 20,
        padding: "4px 12px",
        fontSize: 11.5,
        fontWeight: 500,
      }}
    >
      <span>✓</span> {label}
    </span>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 18px",
        background: "#111318",
        border: "1px solid #1a2030",
        borderRadius: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 18, color: "#4a5568" }}>{icon}</span>
        <span style={{ fontSize: 13.5, color: "#c0ccd8", fontWeight: 500 }}>{label}</span>
      </div>
      <span style={{ fontSize: 14, fontWeight: 700, color: "#e8edf5" }}>{value}</span>
    </div>
  );
}

function VerifyBadge({ text, color = "green" }) {
  const colors = {
    green: { bg: "rgba(0,200,100,0.06)", text: "#00cc66", border: "rgba(0,200,100,0.2)", icon: "✓" },
    blue: { bg: "rgba(74,144,217,0.06)", text: "#4a90d9", border: "rgba(74,144,217,0.2)", icon: "◎" },
  };
  const c = colors[color];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: 8,
        padding: "10px 14px",
      }}
    >
      <span style={{ color: c.text, fontSize: 16, flexShrink: 0 }}>{c.icon}</span>
      <span style={{ fontSize: 12, color: c.text, lineHeight: 1.4 }}>{text}</span>
    </div>
  );
}

export default function ILODetail() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Presale");
  const [amount, setAmount] = useState("5.8");

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
    },
    logoArea: {
      padding: "0 20px 28px",
    },
    sectionLabel: {
      padding: "0 20px 12px",
      fontSize: 13,
      fontWeight: 700,
      color: "#e8edf5",
    },
    navItem: (active) => ({
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "9px 20px",
      cursor: "pointer",
      color: active ? "#e8edf5" : "#4a5568",
      background: active ? "rgba(255,255,255,0.04)" : "transparent",
      fontSize: 13,
      fontWeight: active ? 600 : 400,
      borderLeft: active ? "2px solid #00ffc8" : "2px solid transparent",
    }),
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
    topbarIcons: {
      display: "flex",
      alignItems: "center",
      gap: 22,
    },
    walletArea: {
      display: "flex",
      alignItems: "center",
      gap: 12,
    },
    solChip: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      background: "#111820",
      border: "1px solid #1e2d40",
      borderRadius: 20,
      padding: "5px 12px",
      fontSize: 12,
      color: "#c0ccd8",
    },
    content: {
      padding: "20px 32px 40px",
      display: "flex",
      flexDirection: "column",
      gap: 20,
      flex: 1,
      overflowY: "auto",
      overflowX: "hidden",
    },
    breadcrumb: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 12,
      color: "#4a5568",
    },
    card: {
      background: "#0f1218",
      border: "1px solid #181f2a",
      borderRadius: 14,
      overflow: "hidden",
    },
    tab: (active) => ({
      padding: "8px 18px",
      fontSize: 13.5,
      fontWeight: active ? 600 : 400,
      color: active ? "#e8edf5" : "#4a5568",
      cursor: "pointer",
      borderBottom: active ? "2px solid #a78bfa" : "2px solid transparent",
      transition: "all 0.15s",
    }),
    pctBtn: {
      background: "#1a2030",
      border: "1px solid #242f40",
      borderRadius: 20,
      padding: "4px 14px",
      fontSize: 12,
      color: "#8899aa",
      cursor: "pointer",
      fontFamily: "inherit",
    },
    purchaseBtn: {
      width: "100%",
      background: "linear-gradient(90deg, #a78bfa, #60a5fa, #34d399)",
      border: "none",
      borderRadius: 10,
      padding: "14px",
      color: "#fff",
      fontSize: 15,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "inherit",
      letterSpacing: 0.3,
    },
    footer: {
      borderTop: "1px solid #181f2a",
      padding: "32px 32px 16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      flexWrap: "wrap",
      gap: 20,
      flexShrink: 0,
    },
  };

  return (
    <div style={styles.root}>
      <LeftPanel />
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logoArea}>
          <LogoImg size={36} />
        </div>
        <div style={{ borderTop: "1px solid #181f2a", paddingTop: 20 }}>
          <div style={styles.sectionLabel}>Browser</div>
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              style={styles.navItem(item.active)}
              onClick={() => item.label === "ILO's" && navigate("/ilos")}
            >
              <span style={{ fontSize: 14, color: item.active ? "#00ffc8" : "#3a4555" }}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", bottom: 20, left: 20, fontSize: 20 }}>🌐</div>
      </div>

      {/* Main */}
      <div style={styles.main}>
        {/* Topbar */}
        <div style={styles.topbar}>
          <div style={styles.topbarIcons}>
            {["♡", "✈", "📶", "▶▶"].map((ic, i) => (
              <span
                key={i}
                style={{ color: "#4a5568", fontSize: 16, cursor: "pointer" }}
                onMouseEnter={(e) => (e.target.style.color = "#8899aa")}
                onMouseLeave={(e) => (e.target.style.color = "#4a5568")}
              >
                {ic}
              </span>
            ))}
          </div>
          <div style={styles.walletArea}>
            <div style={styles.solChip}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#9945FF",
                  display: "inline-block",
                }}
              />
              <span style={{ fontWeight: 600 }}>SOL</span>
            </div>
            <span style={{ color: "#a78bfa", fontWeight: 700, fontSize: 13 }}>1,581 SOL</span>
            <span style={{ color: "#3a4555" }}>|</span>
            <span style={{ color: "#6b7a8d", fontSize: 11 }}>0xBBB6A7...6hn9</span>
          </div>
        </div>

        {/* Scrollable content + footer wrapper */}
        <div style={styles.content}>
          {/* Breadcrumb */}
          <div style={styles.breadcrumb}>
            <span
              style={{ cursor: "pointer", color: "#6b7a8d" }}
              onClick={() => navigate("/ilos")}
            >
              ILO's
            </span>
            <span>/</span>
            <span style={{ color: "#e8edf5" }}>Alpaca</span>
          </div>

          {/* Page title + badges */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", margin: 0 }}>JAMES</h1>
            <AuditBadge label="Audited" color="green" />
            <AuditBadge label="KYC" color="blue" />
            <AuditBadge label="SAFU" color="teal" />
          </div>

          {/* Main 2-col layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) 320px",
              gap: 20,
              alignItems: "start",
            }}
          >
            {/* LEFT COLUMN */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Presale countdown */}
              <div style={{ ...styles.card, padding: "16px 20px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#e8edf5" }}>
                    Presale Ends In:{" "}
                    <span style={{ color: "#ffffff" }}>2 Day(s), 20 Hr, 15 Min</span>
                  </span>
                  <span
                    style={{
                      background: "rgba(0,200,100,0.12)",
                      color: "#00cc66",
                      border: "1px solid rgba(0,200,100,0.3)",
                      borderRadius: 6,
                      padding: "3px 12px",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    Live
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 11.5,
                    color: "#4a5568",
                  }}
                >
                  <span>77704 blocks to go</span>
                  <span>Starts Thu, 30 Jul, 10:00</span>
                </div>
              </div>

              {/* Info rows */}
              <InfoRow icon="🔒" label="Liquidity Lock" value="85%" />
              <InfoRow icon="👤" label="Participants" value="829" />
              <InfoRow icon="◎" label="Tokenomics" value="80%" />

              {/* Telegram */}
              <div
                style={{
                  ...styles.card,
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <span style={{ fontSize: 22, color: "#4a5568" }}>✈</span>
                <div>
                  <div style={{ fontSize: 12, color: "#6b7a8d", marginBottom: 4 }}>
                    Discuss this Launchpad in our dedicated Telegram community
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#a78bfa",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Bullypad ILO Chat ↗
                  </span>
                </div>
              </div>

              {/* Tabs + presale form */}
              <div style={{ ...styles.card, padding: 0 }}>
                <div
                  style={{
                    display: "flex",
                    borderBottom: "1px solid #181f2a",
                    padding: "0 20px",
                  }}
                >
                  {["Presale", "Info", "Audit"].map((tab) => (
                    <div
                      key={tab}
                      style={styles.tab(activeTab === tab)}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </div>
                  ))}
                </div>

                <div style={{ padding: "20px" }}>
                  {activeTab === "Presale" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      {/* Min/Max */}
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            border: "1px solid #2a3a4a",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 12,
                            color: "#6b7a8d",
                          }}
                        >
                          ⓘ
                        </span>
                        <div>
                          <div style={{ fontSize: 10, color: "#4a5568", letterSpacing: 0.5 }}>
                            MIN BUY / MAX BUY
                          </div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: "#e8edf5" }}>
                            1/20 SOL
                          </div>
                        </div>
                      </div>

                      {/* Input row */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "minmax(0, 1fr) 200px",
                          gap: 14,
                        }}
                      >
                        {/* Spend box */}
                        <div
                          style={{
                            background: "#111318",
                            border: "1px solid #1a2030",
                            borderRadius: 10,
                            padding: "14px 16px",
                          }}
                        >
                          <div style={{ fontSize: 12, color: "#6b7a8d", marginBottom: 10 }}>
                            Spend how much SOL?
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              fontSize: 11,
                              color: "#4a5568",
                              marginBottom: 8,
                            }}
                          >
                            Balance: 50 SOL
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              marginBottom: 14,
                            }}
                          >
                            <input
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              style={{
                                background: "none",
                                border: "none",
                                outline: "none",
                                fontSize: 20,
                                fontWeight: 700,
                                color: "#e8edf5",
                                fontFamily: "inherit",
                                width: "100%",
                              }}
                            />
                            <button
                              style={{
                                background: "#1a2030",
                                border: "1px solid #2a3a4a",
                                borderRadius: 6,
                                padding: "4px 12px",
                                fontSize: 11,
                                fontWeight: 700,
                                color: "#a78bfa",
                                cursor: "pointer",
                                fontFamily: "inherit",
                              }}
                            >
                              MAX
                            </button>
                          </div>
                          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                            {["0%", "10%", "25%", "30%", "50%"].map((p) => (
                              <button key={p} style={styles.pctBtn}>{p}</button>
                            ))}
                          </div>
                        </div>

                        {/* Total Raised */}
                        <div
                          style={{
                            background: "#111318",
                            border: "1px solid #1a2030",
                            borderRadius: 10,
                            padding: "14px 16px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <div style={{ fontSize: 11, color: "#6b7a8d", marginBottom: 8 }}>
                            Total Raised
                          </div>
                          <div style={{ fontSize: 22, fontWeight: 800, color: "#e8edf5" }}>
                            1'001 SOL
                          </div>
                        </div>
                      </div>

                      {/* Purchase btn */}
                      <button style={styles.purchaseBtn}>Purchase</button>

                      <div style={{ fontSize: 11, color: "#4a5568", textAlign: "center" }}>
                        Any excess SOL above your allowance is immediately refunded
                      </div>
                    </div>
                  )}

                  {activeTab === "Info" && (
                    <div style={{ color: "#8899aa", fontSize: 13, padding: "10px 0" }}>
                      Project information and tokenomics details will appear here.
                    </div>
                  )}

                  {activeTab === "Audit" && (
                    <div style={{ color: "#8899aa", fontSize: 13, padding: "10px 0" }}>
                      Audit reports and security details will appear here.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div style={{ ...styles.card, padding: "18px" }}>
              {/* Token header */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <LogoImg size={30} />
                <span style={{ fontSize: 16, fontWeight: 700, color: "#ffffff" }}>JAMES</span>
              </div>

              {/* Links */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 18,
                  flexWrap: "wrap",
                }}
              >
                <span style={{ fontSize: 12, color: "#a78bfa", cursor: "pointer" }}>
                  SOLSCAN ↗
                </span>
                <span style={{ fontSize: 12, color: "#e8edf5", display: "flex", alignItems: "center", gap: 6 }}>
                  0x05gn41...3F30
                  <span style={{ color: "#4a5568", cursor: "pointer", fontSize: 13 }}>⧉</span>
                </span>
                <span style={{ fontSize: 12, color: "#a78bfa", cursor: "pointer" }}>
                  Website ↗
                </span>
              </div>

              {/* Chart image */}
              <div style={{ marginBottom: 16 }}>
                <img
                  src={chartImage}
                  alt="Token distribution chart"
                  style={{ width: "100%", height: "auto", display: "block", borderRadius: 8 }}
                />
              </div>

              {/* Legend */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  marginBottom: 18,
                  paddingLeft: 4,
                }}
              >
                {[
                  { label: "Presale", color: "#9945FF" },
                  { label: "Liquidity", color: "#4a90d9" },
                  { label: "Fees", color: "#f5a623" },
                  { label: "Locked", color: "#00c8b4" },
                  { label: "Unlocked", color: "#4a5568" },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: item.color,
                        display: "inline-block",
                      }}
                    />
                    <span style={{ fontSize: 12, color: "#8899aa" }}>{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Verify badges */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <VerifyBadge
                  text="This tokens contract has been checked for exploits by third party auditors. See the audit tab for more details"
                  color="green"
                />
                <VerifyBadge text="This team has passed KYC verification" color="blue" />
                <VerifyBadge text="SAFU" color="green" />
              </div>
            </div>
          </div>

          {/* Footer (inside scroll area) */}
          <div style={styles.footer}>
            <LogoImg size={36} />
            <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
              {[
                ["Careers", "About Bullypad", "Council", "Apply for Launchpad"],
                ["Terms and conditions", "Privacy Policy", "Documentation", "Audits"],
                ["Documentation", "Bullypad.js"],
              ].map((col, ci) => (
                <div key={ci} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.map((link) => (
                    <span
                      key={link}
                      style={{ fontSize: 12, color: "#4a5568", cursor: "pointer" }}
                      onMouseEnter={(e) => (e.target.style.color = "#8899aa")}
                      onMouseLeave={(e) => (e.target.style.color = "#4a5568")}
                    >
                      {link}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 11, color: "#2a3444", textAlign: "center", padding: "0 0 16px" }}>
            Bullypad © 2024 • support@Bullypad.io • All rights reserved. Designed by Twenty-Two.
          </div>
        </div>
      </div>
    </div>
  );
}