"use client";

import { useState } from "react";

export default function IncidentPage() {
  const container: React.CSSProperties = {
    height: "100vh", // exactly one screen height
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px",
    boxSizing: "border-box",
    background: "#fff",
    color: "#111",
  };

  const centerArea: React.CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "60px",
    width: "100%",
  };

  const headerStyle: React.CSSProperties = {
    fontSize: "clamp(28px, 6vw, 56px)",
    fontWeight: 800,
    textAlign: "center",
    margin: 0,
  };

  const micIcon: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: "#ef4444",
    color: "white",
    marginLeft: 8,
    marginRight: 8,
  };

  const bottomBar: React.CSSProperties = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    padding: "12px",
  };

  return (
    <div style={container}>
      <div style={centerArea}>
        <h1 style={headerStyle}>Report an Incident</h1>
      </div>

      <div style={bottomBar}>
        <div style={{ marginTop: 6, fontSize: 16, color: "#333" }}>
          You can also press the red
          <span style={micIcon} aria-hidden>
            {/* simple microphone SVG */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3z" fill="currentColor"/>
              <path d="M19 11a1 1 0 1 0-2 0 5 5 0 0 1-10 0 1 1 0 1 0-2 0 7 7 0 0 0 5 6.92V21a1 1 0 1 0 2 0v-3.08A7 7 0 0 0 19 11z" fill="currentColor"/>
            </svg>
          </span>
          button to speak to this kiosk
        </div>
      </div>
    </div>
  );
}
