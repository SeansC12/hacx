"use client";

import { ReportForm } from "@/components/form/report-form";
import { incidentFormConfig } from "@/form-config/incident-form";
import { VoiceAssistantButton } from "@/components/voice-assistant-button";

export default function IncidentPage() {
  return (
    <div className="grid grid-cols-1 grid-rows-[90%_10%] w-full h-full">
      <ReportForm config={incidentFormConfig} />
      <VoiceAssistantButton />
    </div>
  );
}
