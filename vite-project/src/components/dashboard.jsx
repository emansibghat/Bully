import { useNavigate } from "react-router-dom";
import { useState } from "react";
import myDashboardImage from "../assets/eps.png";
import LeftPanel from "./leftPanel";

const NAV_ITEMS = [
  { label: "Dashboard", active: true },
  { label: "Account", disabled: true, comingSoon: true },
  { label: "Eligibility", disabled: true, comingSoon: true },
  { label: "Whitelisted", disabled: true, comingSoon: true },
];

const QUICK_LINKS = [
  { label: "ILO's", path: "/ilos" },
  { label: "Token Minter", path: "/token-minter", comingSoon: true },
  { label: "Token Locker", comingSoon: true },
  { label: "Liquidity Locker", path: "/locker", comingSoon: true },
  { label: "Create ILO", isCreate: true, path: "/create", comingSoon: true },
];

const RAYDIUM_URL =
  "https://raydium.io/swap/?inputCurrency=sol&outputCurrency=gXn8BEGmac3whuQsumEcUXv3BSext6r7kFYGJaRKMeL&fixed=out";
const JUPITER_URL =
  "https://jup.ag/swap/SOL-BULLY_gXn8BEGmac3whuQsumEcUXv3BSext6r7kFYGJaRKMeL";

function Badge({ text }) {
  return (
    <span
      style={{
        fontSize: 9,
        fontWeight: 600,
        letterSpacing: 0.5,
        color: "#4a5568",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </span>
  );
}

function ProgressBar({ value }) {
  return (
    <div
      style={{
        background: "#1e2530",
        borderRadius: 4,
        height: 4,
        width: 80,
        marginTop: 4,
      }}
    >
      <div
        style={{
          background: "#00ffc8",
          width: `${value}%`,
          height: "100%",
          borderRadius: 4,
        }}
      />
    </div>
  );
}

function CircleIcon({ active }) {
  return (
    <div
      style={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: active ? "#00ffc8" : "transparent",
        border: active ? "none" : "2px solid #3a4555",
        flexShrink: 0,
      }}
    />
  );
}

function LogoImg({ size }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #a78bfa, #ec4899)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: "bold",
        fontSize: size * 0.5,
        flexShrink: 0,
      }}
    >
      B
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    labelSidebar: {
      width: 190,
      background: "#0d1017",
      borderRight: "1px solid #181f2a",
      display: "flex",
      flexDirection: "column",
      padding: "20px 0",
      flexShrink: 0,
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
      borderBottom: "1px solid #1a2030",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 28px",
      flexShrink: 0,
    },
    topbarLeft: { display: "flex", alignItems: "center", gap: 20 },
    topbarRight: { display: "flex", alignItems: "center", gap: 10 },

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

    solanaChip: {
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
    connectBtn: {
      background: "linear-gradient(90deg,#a78bfa,#ec4899)",
      border: "none",
      borderRadius: 20,
      padding: "6px 16px",
      color: "#fff",
      fontWeight: 700,
      fontSize: 12,
      cursor: "pointer",
      fontFamily: "inherit",
      letterSpacing: 0.3,
    },
    content: {
      padding: "24px 28px",
      display: "flex",
      flexDirection: "column",
      gap: 24,
      overflowY: "auto",
      overflowX: "hidden",
      flex: 1,
    },
    pageTitle: {
      fontSize: 24,
      fontWeight: 700,
      color: "#ffffff",
      marginBottom: 0,
    },
    topGrid: {
      display: "grid",
      gridTemplateColumns: "minmax(0,1fr) 240px",
      gap: 16,
    },
    card: {
      background: "#111318",
      border: "1px solid #1a2030",
      borderRadius: 12,
      overflow: "hidden",
    },
    sectionTitle: {
      fontSize: 15,
      fontWeight: 600,
      color: "#ffffff",
      marginBottom: 12,
    },
    table: { width: "100%", borderCollapse: "collapse" },
    th: {
      padding: "10px 16px",
      textAlign: "left",
      fontSize: 12,
      color: "#4a5568",
      fontWeight: 500,
      borderBottom: "1px solid #1a2030",
    },
    td: {
      padding: "12px 16px",
      fontSize: 12.5,
      color: "#c0ccd8",
      borderBottom: "1px solid #131a22",
      verticalAlign: "middle",
    },
    viewAll: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      padding: "10px 16px",
      fontSize: 12,
      color: "#4a90d9",
      cursor: "pointer",
      justifyContent: "center",
    },
    upcomingBadge: {
      background: "rgba(255,170,0,0.12)",
      color: "#ffaa00",
      border: "1px solid #ffaa0030",
      borderRadius: 6,
      padding: "3px 10px",
      fontSize: 11,
      fontWeight: 600,
    },
    auditBadge: (color) => ({
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      background:
        color === "green"
          ? "rgba(0,200,100,0.1)"
          : "rgba(74,144,217,0.1)",
      color: color === "green" ? "#00cc66" : "#4a90d9",
      border: `1px solid ${
        color === "green" ? "#00cc6630" : "#4a90d930"
      }`,
      borderRadius: 20,
      padding: "3px 10px",
      fontSize: 11,
      fontWeight: 500,
    }),
    quickLinkIcon: (isCreate) => ({
      width: 34,
      height: 34,
      borderRadius: "50%",
      border: isCreate ? "1px solid #2a3a4a" : "1px solid #00ffc830",
      background: isCreate ? "#1a2530" : "rgba(0,255,200,0.05)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 14,
      flexShrink: 0,
      color: isCreate ? "#4a5568" : "#00ffc8",
    }),
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      backdropFilter: "blur(4px)",
    },
    modalContainer: {
      background: "#0d1117",
      width: "380px",
      borderRadius: "16px",
      padding: "24px",
      position: "relative",
      border: "1px solid #21262d",
      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      textAlign: "center",
    },
    closeBtn: {
      position: "absolute",
      top: 16,
      right: 16,
      background: "#161b22",
      border: "none",
      color: "#8b949e",
      borderRadius: "50%",
      width: 28,
      height: 28,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    walletOption: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "12px 16px",
      borderRadius: "12px",
      cursor: "pointer",
      marginBottom: "8px",
    },
    walletIcon: (color) => ({
      width: 32,
      height: 32,
      borderRadius: "8px",
      background: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }),
  };

  return (
    <div style={styles.root}>
      <LeftPanel />

      {/* Wallet Modal */}
      {isModalOpen && (
        <div
          style={styles.modalOverlay}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={styles.modalContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={styles.closeBtn}
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#fff",
                marginBottom: "32px",
                marginTop: "10px",
              }}
            >
              Connect a wallet on Solana <br /> to continue
            </h2>
            {[
              {
                label: "Solflare",
                icon: "☀️",
                color: "linear-gradient(135deg,#FF8008,#FFC837)",
              },
              { label: "Phantom", icon: "👻", color: "#512DA8" },
            ].map((w) => (
              <div
                key={w.label}
                style={styles.walletOption}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#161b22")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <div style={styles.walletIcon(w.color)}>{w.icon}</div>
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#fff",
                  }}
                >
                  {w.label}
                </span>
              </div>
            ))}
            <div
              style={{
                marginTop: "20px",
                color: "#8b949e",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              Less options ▲
            </div>
          </div>
        </div>
      )}

      {/* ── Label Sidebar ── */}
      <div style={styles.labelSidebar}>
        <div
          style={{
            padding: "0 20px 14px",
            fontSize: 13,
            fontWeight: 700,
            color: "#e8edf5",
          }}
        >
          General
        </div>
        <div style={{ borderTop: "1px solid #181f2a", paddingTop: 16 }}>
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 20px",
                cursor: item.disabled ? "not-allowed" : "pointer",
                color: item.active
                  ? "#ffffff"
                  : item.disabled
                  ? "#3a4555"
                  : "#6b7a8d",
                background: item.active
                  ? "rgba(255,255,255,0.04)"
                  : "transparent",
                fontSize: 12.5,
                fontWeight: item.active ? 600 : 400,
                borderLeft: item.active
                  ? "2px solid #00ffc8"
                  : "2px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (!item.active && !item.disabled)
                  e.currentTarget.style.color = "#c0ccd8";
              }}
              onMouseLeave={(e) => {
                if (!item.active && !item.disabled)
                  e.currentTarget.style.color = "#6b7a8d";
              }}
            >
              <CircleIcon active={item.active} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span>{item.label}</span>
                {item.comingSoon && (
                  <span
                    style={{
                      fontSize: 9,
                      color: "#2d3748",
                      fontWeight: 600,
                      marginTop: 1,
                    }}
                  >
                    COMING SOON
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main ── */}
      <div style={styles.main}>
        {/* Topbar */}
        <div style={styles.topbar}>
          {/* LEFT: Raydium + Jupiter swap buttons */}
          <div style={styles.topbarLeft}>
            <button
              style={styles.swapBtn("#14F195")}
              onClick={() => window.open(RAYDIUM_URL, "_blank")}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(20,241,149,0.08)";
                e.currentTarget.style.borderColor = "#14F19560";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#111820";
                e.currentTarget.style.borderColor = "#14F19530";
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#14F195",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              Raydium
            </button>

            <button
              style={styles.swapBtn("#C7F284")}
              onClick={() => window.open(JUPITER_URL, "_blank")}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(199,242,132,0.08)";
                e.currentTarget.style.borderColor = "#C7F28460";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#111820";
                e.currentTarget.style.borderColor = "#C7F28430";
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#C7F284",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              Jupiter
            </button>
          </div>

          {/* RIGHT: Chain chip + Connect wallet */}
          <div style={styles.topbarRight}>
            <div style={styles.solanaChip}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#9945FF",
                  display: "inline-block",
                }}
              />
              <span style={{ fontSize: 12, fontWeight: 600 }}>SOLANA</span>
            </div>
            <button
              style={styles.connectBtn}
              onClick={() => setIsModalOpen(true)}
            >
              CONNECT WALLET
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div style={styles.content}>
          <div style={styles.pageTitle}>Dashboard</div>

          {/* Top grid: chart + quick links */}
          <div style={styles.topGrid}>
            {/* Chart card */}
            <div style={styles.card}>
              <div
                style={{
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              />
              <div>
                <img
                  src={myDashboardImage}
                  alt="BULLY chart"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
              <div
                style={{
                  padding: "10px 16px",
                  borderTop: "1px solid #1a2030",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: 11, color: "#4a5568" }}>
                  Charts by TradingView ⓘ
                </span>
              </div>
            </div>

            {/* Quick links */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {QUICK_LINKS.map((item) => (
                <div
                  key={item.label}
                  onClick={() => item.path && navigate(item.path)}
                  style={{
                    ...styles.card,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 14px",
                    cursor: item.path ? "pointer" : "default",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "#2a3a50")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "#1a2030")
                  }
                >
                  <div style={styles.quickLinkIcon(item.isCreate)}>
                    {item.isCreate ? "+" : "◎"}
                  </div>
                  <span style={{ fontSize: 13, color: "#c0ccd8", flex: 1 }}>
                    {item.label}
                  </span>
                  {item.comingSoon && <Badge text="COMING SOON" />}
                </div>
              ))}
            </div>
          </div>

          {/* New ILO */}
          <div>
            <div style={styles.sectionTitle}>New ILO</div>
            <div style={styles.card}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {[
                      "Date",
                      "ILO Name",
                      "Audit",
                      "Liquidity Lock",
                      "Progress",
                      "Status",
                    ].map((h) => (
                      <th key={h} style={styles.th}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={styles.td}>
                      <span style={{ color: "#8899aa" }}>
                        Thu, 30 Jul, 10:00
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <div
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: "50%",
                            background:
                              "linear-gradient(135deg,#0077ff,#00ffc8)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 10,
                            fontWeight: 700,
                          }}
                        >
                          J
                        </div>
                        <div>
                          <div
                            style={{
                              fontSize: 12.5,
                              fontWeight: 600,
                              color: "#e8edf5",
                            }}
                          >
                            JAMES
                          </div>
                          <div style={{ fontSize: 10.5, color: "#4a5568" }}>
                            JAMES / SOL
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <span style={styles.auditBadge("green")}>
                          ✓ Audited
                        </span>
                        <span style={styles.auditBadge("blue")}>✓ KYC</span>
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={{ fontSize: 12, color: "#e8edf5" }}>
                        FOREVER
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "#6b7a8d",
                          marginTop: 2,
                        }}
                      >
                        🔒 60%
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={{ fontSize: 11, color: "#8899aa" }}>
                        0 / 1000 SOL
                      </div>
                      <ProgressBar value={0} />
                      <div
                        style={{
                          fontSize: 10,
                          color: "#4a5568",
                          marginTop: 3,
                        }}
                      >
                        0%
                      </div>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.upcomingBadge}>Upcoming</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* View All → /create */}
              <div
                style={styles.viewAll}
                onClick={() => navigate("/launches")}
              >
                View All ›
              </div>
            </div>
          </div>

          {/* New Token Locks */}
          <div>
            <div style={styles.sectionTitle}>
              New Token Locks{" "}
              
            </div>
            <div style={styles.card}>
              <div
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid #1a2030",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <span style={{ color: "#9945FF", fontSize: 16 }}>◎</span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#e8edf5",
                    }}
                  >
                    Solana
                  </span>
                </div>
                <span style={{ fontSize: 11, color: "#4a5568" }}>
                  (135 Tokens)
                </span>
              </div>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Token Name</th>
                    <th style={{ ...styles.th, textAlign: "right" }}>
                      Tokens Locked
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={styles.td}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <div
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: "50%",
                            background:
                              "linear-gradient(135deg,#0077ff,#9945FF)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 10,
                          }}
                        >
                          B
                        </div>
                        <div>
                          <div
                            style={{
                              fontSize: 12.5,
                              fontWeight: 600,
                              color: "#e8edf5",
                            }}
                          >
                            BULLYPAD
                          </div>
                          <div style={{ fontSize: 10.5, color: "#4a5568" }}>
                            Pairs index 58292
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ ...styles.td, textAlign: "right" }}>
                      <div
                        style={{ fontSize: 12.5, fontWeight: 600, color: "#e8edf5" }}
                      >
                        2,000,000,000
                      </div>
                      <div style={{ fontSize: 11, color: "#00cc66" }}>
                        🌿 15%
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* View All → /create */}
              <div
                style={styles.viewAll}
                onClick={() => navigate("/launches")}
              >
                View All ›
              </div>
            </div>
          </div>

          {/* New Liquidity Locks */}
          <div>
            <div style={styles.sectionTitle}>
              New Liquidity Locks{" "}
             
            </div>
            <div style={styles.card}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {["Pairs", "Liquidity", "Locked", "Unlock date"].map(
                      (h) => (
                        <th key={h} style={styles.th}>
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={styles.td}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <div
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            background:
                              "linear-gradient(135deg,#0077ff,#00ffc8)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 9,
                          }}
                        >
                          B
                        </div>
                        <span style={{ color: "#4a5568" }}>/</span>
                        <div
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            background:
                              "linear-gradient(135deg,#9945FF,#14f195)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 9,
                          }}
                        >
                          ◎
                        </div>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#e8edf5",
                          }}
                        >
                          SOL
                        </span>
                      </div>
                    </td>
                    <td style={styles.td}>
                      <span style={{ fontSize: 12.5, color: "#e8edf5" }}>
                        $ 5,492,202.50
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div
                        style={{ fontSize: 12.5, color: "#e8edf5" }}
                      >
                        $ 2,196,881
                      </div>
                      <div style={{ fontSize: 11, color: "#00cc66" }}>
                        🌿 40%
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <span style={{ fontSize: 12, color: "#8899aa" }}>
                          Next in 4 months
                        </span>
                        <span
                          style={{
                            background: "#1a2530",
                            border: "1px solid #2a3a4a",
                            borderRadius: 6,
                            padding: "3px 10px",
                            fontSize: 11,
                            color: "#c0ccd8",
                            cursor: "pointer",
                          }}
                        >
                          View
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* View All → /create */}
              <div
                style={styles.viewAll}
                onClick={() => navigate("/launches")}
              >
                View All ›
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              borderTop: "1px solid #1a2030",
              paddingTop: 28,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 20,
              marginTop: 20,
            }}
          >
            <LogoImg size={32} />
            <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
              {[
                [
                  "Careers",
                  "About Bullypad",
                  "Council",
                  "Apply for Launchpad",
                ],
                [
                  "Terms and conditions",
                  "Privacy Policy",
                  "Documentation",
                  "Audits",
                ],
                ["Documentation", "Bullypad.js"],
              ].map((col, ci) => (
                <div
                  key={ci}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {col.map((link) => (
                    <span
                      key={link}
                      style={{ fontSize: 12, color: "#4a5568", cursor: "pointer" }}
                      onMouseEnter={(e) =>
                        (e.target.style.color = "#8899aa")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.color = "#4a5568")
                      }
                    >
                      {link}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              fontSize: 11,
              color: "#2a3444",
              textAlign: "center",
              paddingBottom: 16,
            }}
          >
            Bullypad © 2024 • support@Bullypad.io • All rights reserved.
            Designed by Twenty-Two.
          </div>
        </div>
      </div>
    </div>
  );
}