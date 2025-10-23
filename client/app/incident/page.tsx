"use client";

import ReportFormUI from "@/components/report-form-ui";
import { exampleIncidentReport } from "@/model/ReportForm";

export default function IncidentPage() {
  return <ReportFormUI form={exampleIncidentReport} />;
}
