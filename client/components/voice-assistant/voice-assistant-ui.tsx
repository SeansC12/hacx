"use client";

import { GradientFade } from "./gradient-fade";
import { VoiceAssistantButton } from "./voice-assistant-button";

export function VoiceAssistant() {
  return (
    <div className="flex flex-col w-full">
      <GradientFade />
      <div className="grow flex flex-col items-center bg-white">
        <VoiceAssistantButton />
      </div>
    </div>
  );
}
