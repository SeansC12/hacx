"use client";

export default function SpeakIndicator() {
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

  return (
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
  )
}