"use client";

import { ReportForm } from "@/components/form/report-form";
import { incidentFormConfig } from "@/form-config/incident-form";

export default function IncidentPage() {
  return <ReportForm config={incidentFormConfig} />;
}
