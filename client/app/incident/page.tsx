"use client";

import { ReportForm } from "@/components/form/report-form";
import { incidentFormConfig } from "@/form-config/incident-form";
import { VoiceAssistantUI } from "@/components/voice-assistant/voice-assistant-ui";

export default function IncidentPage() {
  return (
    <div className="grid h-full w-full grid-cols-1 grid-rows-[90%_10%] overflow-y-hidden bg-gray-50">
      <div className="h-full w-full overflow-y-auto">
        <ReportForm config={incidentFormConfig} />
      </div>
      <VoiceAssistantUI formConfig={incidentFormConfig} />
    </div>
  );
}
