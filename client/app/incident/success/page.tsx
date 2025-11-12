"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function IncidentSuccessPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-50 p-8">
      <div className="w-full max-w-xl space-y-6 rounded-lg border bg-white p-8 shadow">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-green-600">Report Submitted</h1>
          <p className="text-gray-700">
            Your incident report has been successfully submitted. A confirmation email will be sent to you shortly.
          </p>
        </div>
        <div className="space-y-4">
          <div className="rounded-md bg-green-50 p-4 text-sm text-green-800">
            Reference ID: <strong>IR-{Date.now()}</strong>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/incident" className="inline-block">
              <Button variant="outline">File Another Report</Button>
            </Link>
            <Link href="/" className="inline-block">
              <Button>Return Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
