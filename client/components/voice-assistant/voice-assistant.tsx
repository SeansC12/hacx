"use client";

import { GradientFade } from "./gradient-fade";
import { VoiceAssistantButton } from "./voice-assistant-button";

export function VoiceAssistant() {
  return (
    <div className="flex w-full flex-col">
      <GradientFade />
      <div className="flex grow flex-col items-center bg-white">
        <VoiceAssistantButton />
      </div>
    </div>
  );
}
