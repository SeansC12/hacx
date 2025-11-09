"use client";

import { ReportForm } from "@/components/form/report-form";
import { incidentFormConfig } from "@/form-config/incident-form";
import { VoiceAssistant } from "@/components/voice-assistant/voice-assistant-ui";

export default function IncidentPage() {
  return (
    <div className="grid grid-cols-1 grid-rows-[90%_10%] w-full h-full">
      <ReportForm config={incidentFormConfig} />
      <VoiceAssistant />
    </div>
  );
}
