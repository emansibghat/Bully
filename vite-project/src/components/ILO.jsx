import { useNavigate } from "react-router-dom";
import LeftPanel from "../components/leftPanel";
import dogImage from "../assets/dog.png";

function LogoImg() {}

const launches = [
  {
    date: "25 Jan 2024",
    name: "JAMES",
    pair: "JAMES/SOL",
    icon: "🟡",
    iconBg: "#f5a623",
    audit: ["Audited", "SAFU"],
    liquidityLock: "Forever",
    liquidityPct: "35%",
    progress: "0/1500 SOL",
    progressPct: 0,
    status: "Upcoming",
    statusColor: "#f5a623",
    link: "https://bullypad.adeebahmad.com/launches/james",
    external: false,
  },
  {
    date: "03 May 2026",
    name: "Bully",
    pair: "BULLY/SOL",
    icon: "🐕",
    iconBg: "#3a3a3a",
    useDogImg: true,
    audit: ["Audited"],
    liquidityLock: "Forever",
    liquidityPct: "35%",
    progress: "550/550 SOL",
    progressPct: 100,
    status: "Success",
    statusColor: "#00cc88",
    link: "https://birdeye.so/token/gXn8BEGmac3whuQsumEcUXv3BSext6r7kFYGJaRKMeL?chain=solana",
    external: true,
  },
];

export default function Launches() {
  const navigate = useNavigate();

  const s = {
   root: {
  minHeight: "100vh",
  width: "100%",   // add this
  background: "#0a0c10",
  color: "#d0d6e0",
  fontFamily: "'Inter','DM Sans',sans-serif",
  display: "flex",
  fontSize: 13,
},
   main: {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  minWidth: 0,   // add this
  width: "100%", // add this
},
    topbar: {
      height: 56,
      background: "#0d1017",
      borderBottom: "1px solid #181f2a",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
     padding: "0 16px",
    },

    content: {
  padding: "36px 16px 60px",  // was 40px, reduce to 16px
  display: "flex",
  flexDirection: "column",
  gap: 24,
  flex: 1,
},
  };

  const handleRowClick = (launch) => {
    if (launch.external) {
      window.open(launch.link, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = launch.link;
    }
  };

  return (
    <div style={s.root}>
      {/* LEFT PANEL */}
      <LeftPanel />

      {/* MAIN */}
      <div style={s.main}>
        {/* Topbar */}
        <div style={s.topbar}>
          <LogoImg size={28} onClick={() => navigate("/")} />
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
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
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "#111820",
                border: "1px solid #1e2d40",
                borderRadius: 20,
                padding: "5px 14px",
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#9945FF,#14F195)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                }}
              >
                ◎
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#c0ccd8" }}>
                SOL
              </span>
            </div>
            <span style={{ color: "#a78bfa", fontWeight: 700, fontSize: 13 }}>
              0 SOL
            </span>
            <button
              style={{
                background: "none",
                border: "1px solid #2a3a4a",
                borderRadius: 20,
                padding: "6px 16px",
                color: "#e8edf5",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Select Wallet
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={s.content}>
          <div
            style={{
              fontSize: 36,
              fontWeight: 900,
              color: "#fff",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            LAUNCHES
          </div>

          {/* Exchange selector */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#111318",
              border: "1px solid #1a2030",
              borderRadius: 12,
              padding: "12px 18px",
              cursor: "pointer",
              alignSelf: "flex-start",
              minWidth: 280,
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#9945FF,#14F195)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
              }}
            >
              ◎
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: "#4a5568" }}>
                Select exchange
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#e8edf5" }}>
                Raydium
              </div>
            </div>
            <span style={{ color: "#4a5568", fontSize: 12 }}>▾</span>
          </div>

          {/* Search + Sort row */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                background: "#111318",
                border: "1px solid #1a2030",
                borderRadius: 12,
                padding: "12px 16px",
                gap: 10,
              }}
            >
              <input
                style={{
                  background: "none",
                  border: "none",
                  outline: "none",
                  color: "#e8edf5",
                  fontSize: 14,
                  flex: 1,
                  fontFamily: "inherit",
                }}
                placeholder="Search"
              />
              <span style={{ color: "#4a5568", fontSize: 18 }}>🔍</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "#111318",
                border: "1px solid #1a2030",
                borderRadius: 12,
                padding: "12px 18px",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  border: "1.5px solid #9945FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#9945FF",
                  }}
                />
              </div>
              <span style={{ fontSize: 13, color: "#e8edf5", fontWeight: 600 }}>
                Sort By:
              </span>
              <span style={{ fontSize: 13, color: "#e8edf5" }}>KYC only</span>
            </div>
          </div>

          {/* Table */}
          <div
            style={{
              background: "#111318",
              border: "1px solid #1a2030",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {/* Table header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr 180px 160px 160px 120px",
                padding: "16px 24px",
                borderBottom: "1px solid #1a2030",
              }}
            >
              {[
                "Date",
                "Launch Name",
                "Audit",
                "Liquidity Lock",
                "Progress",
                "Status",
              ].map((h) => (
                <div
                  key={h}
                  style={{ fontSize: 13, fontWeight: 700, color: "#e8edf5" }}
                >
                  {h}
                </div>
              ))}
            </div>

            {/* Table rows */}
            {launches.map((launch, i) => (
              <div
                key={i}
                onClick={() => handleRowClick(launch)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "140px 1fr 180px 160px 160px 120px",
                  padding: "20px 24px",
                  borderBottom:
                    i < launches.length - 1 ? "1px solid #1a2030" : "none",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.02)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                {/* Date */}
                <div style={{ fontSize: 13, color: "#8899aa" }}>
                  {launch.date}
                </div>

                {/* Launch Name */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: launch.iconBg || "#1a2030",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    {launch.useDogImg ? (
                      <img
                        src={dogImage}
                        alt="bully"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      launch.icon
                    )}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#e8edf5",
                      }}
                    >
                      {launch.name}
                    </div>
                    <div style={{ fontSize: 11, color: "#4a7a9b" }}>
                      {launch.pair}
                    </div>
                  </div>
                </div>

                {/* Audit */}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {launch.audit.map((a) => (
                    <div
                      key={a}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        background: "rgba(0,200,120,0.1)",
                        border: "1px solid rgba(0,200,120,0.3)",
                        borderRadius: 20,
                        padding: "4px 10px",
                        fontSize: 11,
                        color: "#00cc88",
                        fontWeight: 600,
                      }}
                    >
                      <span>✓</span> {a}
                    </div>
                  ))}
                  {launch.audit.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        background: "rgba(100,150,255,0.1)",
                        border: "1px solid rgba(100,150,255,0.3)",
                        borderRadius: 20,
                        padding: "4px 10px",
                        fontSize: 11,
                        color: "#60a5fa",
                        fontWeight: 600,
                      }}
                    >
                      <span style={{ fontSize: 10 }}>◎</span> KYC
                    </div>
                  )}
                </div>

                {/* Liquidity Lock */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 13,
                      color: "#e8edf5",
                      fontWeight: 600,
                    }}
                  >
                    <span>🔥</span>
                    {launch.liquidityLock}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: 12,
                      color: "#6b7a8d",
                      marginTop: 4,
                    }}
                  >
                    <span>🔒</span>
                    {launch.liquidityPct}
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <div
                    style={{ fontSize: 13, color: "#e8edf5", fontWeight: 600 }}
                  >
                    {launch.progress}
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      height: 4,
                      background: "#1a2030",
                      borderRadius: 2,
                      overflow: "hidden",
                      width: 120,
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${launch.progressPct}%`,
                        background:
                          launch.progressPct === 100
                            ? "#00cc88"
                            : "linear-gradient(90deg,#a78bfa,#60a5fa)",
                        borderRadius: 2,
                        transition: "width 0.3s",
                      }}
                    />
                  </div>
                  <div style={{ fontSize: 11, color: "#4a5568", marginTop: 3 }}>
                    {launch.progressPct}%
                  </div>
                </div>

                {/* Status */}
                <div>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: launch.statusColor,
                      background:
                        launch.progressPct === 100
                          ? "rgba(0,204,136,0.1)"
                          : "rgba(245,166,35,0.1)",
                      border: `1px solid ${launch.statusColor}33`,
                      borderRadius: 20,
                      padding: "5px 14px",
                    }}
                  >
                    {launch.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: "1px solid #181f2a",
          padding: "24px 16px 16px", 
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 800, color: "#e8edf5" }}>
            Dot<span style={{ color: "#a78bfa" }}>IPA</span>D
          </div>
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            {[
              ["Careers", "About Dotipad", "Council", "Apply for Launchpad"],
              [
                "Terms and conditions",
                "Privacy Policy",
                "Documentation",
                "Audits",
              ],
              ["Documentation", "Dotipad.js"],
            ].map((col, ci) => (
              <div
                key={ci}
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {col.map((link) => (
                  <span
                    key={link}
                    style={{
                      fontSize: 12,
                      color: "#4a5568",
                      cursor: "pointer",
                    }}
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
        <div
          style={{
            fontSize: 11,
            color: "#2a3444",
            textAlign: "center",
            padding: "0 0 16px",
          }}
        >
          Dotipad © 2021 • support@dotipad.io • All rights reserved.
        </div>
      </div>
    </div>
  );
}
