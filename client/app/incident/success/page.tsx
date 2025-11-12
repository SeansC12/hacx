"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function IncidentSuccessPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-50 p-8">
      <div className="w-full max-w-xl space-y-6 rounded-lg border bg-white p-8 shadow">
        <div className="space-y-2 text-center">
          <p className="text-2xl font-bold text-black">Report Submitted</p>
          <p className="text-black">
            Your incident report has been successfully submitted. A confirmation
            email will be sent to you shortly.
          </p>
        </div>
        <div className="space-y-4">
          <div className="rounded-md p-4 text-sm text-center text-gray-800">
            Reference ID: <strong>IR-{Date.now()}</strong>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
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
