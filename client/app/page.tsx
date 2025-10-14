"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageContainer, MainContentContainer, BottomContentContainer } from "@/components/ui/PageContainer";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SpeakIndicator from "@/components/ui/SpeakIndicator";
import HeaderText from "@/components/ui/HeaderText";

export default function Home() {
  const [lang, setLang] = useState<"en" | "ms" | "ta" | "zh">("en");

  const langLabels: Record<string, string> = {
    en: "English",
    ms: "Malay",
    ta: "Tamil",
    zh: "Mandarin",
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

  const langButton = (active = false): React.CSSProperties => ({
    border: active ? "none" : "1px solid rgba(0,0,0,0.12)",
    background: active ? "#ef4444" : "transparent",
    color: active ? "white" : "#111",
    cursor: "pointer",
    minWidth: 80,
    textAlign: "center",
  });

  function ButtonCard(title: string, options: Array<string>, color: string, action: () => void) {
    return (
      <button style={{ flex: 1, width: "100%" }} onClick={action}>
        <Card
          style={{ cursor: "pointer" }}
          className={color}
        >
        <CardHeader style={{ fontSize: "clamp(18px, 3.5vw, 28px)", fontWeight: 700, textAlign: "center" }}>{title}</CardHeader>
        <CardContent>
          <div style={{ color: "#333", lineHeight: 1.8, alignItems: "left", textAlign: "left" }}>
            {options.map((option, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "20px" }}>
                {option}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      </button>
    );
  }

  return (
    <PageContainer>
      <MainContentContainer>
        <HeaderText>How May I Help You?</HeaderText>

        <div style={buttonsWrap}>
          {ButtonCard(
            "Report an Incident", 
            ["🚦 Traffic Offence", "🧾 Theft", "⚠️ Scam"], "bg-red-200", 
            () => {
              console.log("Reporting an Incident")
              // redirect to /incident
              window.location.href = "http://localhost:3000/incident";
            }
          )}
          {ButtonCard(
            "Report a Lost Item", 
            ["🎒 Bags", "📱 Electronics", "💎 Valuables"], "bg-green-200", 
            () => console.log("Report a Lost Item")
          )}
          {ButtonCard(
            "⚠️\nEmergency", 
            ["🚑 Injured Persons", "🔍 Missing Persons", "🏥 Medical Emergency", "👮‍♂️ Contact an Officer"], "bg-purple-200", 
            () => console.log("Report an Emergency")
          )}
        </div>

        <SpeakIndicator />
      </MainContentContainer>

      <BottomContentContainer>
        <div style={{ width: "100%", display: "flex", justifyContent: "center", gap: "12px", padding: "12px" }}>
          {(["en", "ms", "ta", "zh"] as const).map((l) => (
            <Button
              key={l}
              onClick={() => setLang(l)}
              style={langButton(lang === l)}
              aria-pressed={lang === l}
              title={langLabels[l]}
            >
              {langLabels[l]}<br />
            </Button>
          ))}
        </div>
      </BottomContentContainer>
    </PageContainer>
  );
}
