"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  const [lang, setLang] = useState<"en" | "ms" | "ta" | "zh">("en");

  const langLabels: Record<string, string> = {
    en: "English",
    ms: "Malay",
    ta: "Tamil",
    zh: "Mandarin",
  };

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

  const buttonsWrap: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    width: "100%",
    maxWidth: "840px",
    padding: "0 12px",
    fontSize: "clamp(14px, 3.5vw, 22px)",
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

  const langButton = (active = false): React.CSSProperties => ({
    padding: "8px 14px",
    borderRadius: 10,
    border: active ? "none" : "1px solid rgba(0,0,0,0.12)",
    background: active ? "#ef4444" : "transparent",
    color: active ? "white" : "#111",
    fontWeight: 700,
    cursor: "pointer",
    minWidth: 80,
    textAlign: "center",
  });

  function ButtonCard(title: string, options: Array<string>, color: string, action: () => void) {
    return (
      <div style={{ flex: 1, width: "100%" }}>
        <Card
          onClick={action}
          style={{ cursor: "pointer",  }}
          className={color}
        >
        <CardHeader style={{ fontSize: "clamp(18px, 3.5vw, 28px)", fontWeight: 700, textAlign: "center" }}>{title}</CardHeader>
        <CardContent>
          <div style={{ color: "#333", lineHeight: 1.8 }}>
            {options.map((option, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span>{option}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      </div>
    );
  }

  return (
    <div style={container}>
      <div style={centerArea}>
        <h1 style={headerStyle}>How May I Help You?</h1>

        <div style={buttonsWrap}>
          {ButtonCard("Report an Incident", ["🚦 Traffic Offence", "🧾 Theft", "⚠️ Scam"], "bg-red-200", () => console.log("Report an Incident"))}
          {ButtonCard("Report a Lost Item", ["🎒 Bags", "📱 Electronics", "💎 Valuables"], "bg-green-200", () => console.log("Report a Lost Item"))}
          {ButtonCard("⚠️\nEmergency", ["🚑 Injured Persons", "🔍 Missing Persons", "🏥 Medical Emergency", "👮‍♂️ Contact an Officer"], "bg-purple-200", () => console.log("Report a Lost Item"))}
        </div>

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

      <div style={bottomBar}>
        {(["en", "ms", "ta", "zh"] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={langButton(lang === l)}
            aria-pressed={lang === l}
            title={langLabels[l]}
          >
            {langLabels[l]}
          </button>
        ))}
      </div>
    </div>
  );
}
