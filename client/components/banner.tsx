"use client";
import { useState } from "react";
import { ArrowRight, MessageCircleWarning, X } from "lucide-react";

export default function Banner() {
  const [open, setOpen] = useState(false);
  return (
    <div className="from-blue-dark to-blue-dark relative flex h-24 w-full items-center justify-center gap-10 bg-gradient-to-r px-10 py-3 shadow-md">
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-bold text-white">
          <MessageCircleWarning className="mr-2 inline-block h-8 w-8" />
          This is a 24/7 unmanned kiosk.
        </p>
      </div>
      <button
        onClick={() => setOpen(true)}
        className="h-max rounded-md bg-white/10 px-4 py-3 text-lg font-bold text-white backdrop-blur transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        Learn more
        <ArrowRight className="ml-2 inline-block h-5 w-5" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center"
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          {/* Modal card */}
          <div className="relative mt-28 w-full max-w-xl rounded-lg border border-white/20 bg-white/20 p-6 text-white shadow-xl ring-1 ring-white/20">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close dialog"
              className="absolute right-3 top-3 rounded p-1 text-white/70 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <MessageCircleWarning className="h-6 w-6" /> Unmanned Kiosk
            </h2>
            <p className="text-sm leading-relaxed text-white/90">
              This kiosk operates <strong>24/7 without on-site staff</strong>. Your
              interactions are recorded and securely transmitted to the Singapore
              Police Force systems. For emergencies, please dial <strong>999</strong> or use
              the emergency assistance channel. A live officer may review and
              follow up on submissions. Do not leave personal belongings
              unattended.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="rounded-md bg-white px-4 py-2 text-sm font-medium text-blue-dark shadow hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
