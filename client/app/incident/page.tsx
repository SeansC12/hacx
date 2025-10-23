"use client";

import ReportFormUI from "@/components/ReportFormUI";
import { exampleIncidentReport } from "@/model/ReportForm";

export default function IncidentPage() {
  return <ReportFormUI form={exampleIncidentReport} />;
}
