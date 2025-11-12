"use client";

import { FormConfig } from "@/types/form";
import { GradientFade } from "./gradient-fade";
import { VoiceAssistantButton } from "./voice-assistant-button";
import { VoiceFormAssistant } from "./voice-form-assistant";

export function VoiceAssistantUI({ formConfig }: { formConfig: FormConfig }) {
  return (
    <div className="flex w-full flex-col">
      <GradientFade />
      <div className="flex grow flex-col items-center bg-white">
        <VoiceFormAssistant formConfig={formConfig} />
      </div>
    </div>
  );
}
