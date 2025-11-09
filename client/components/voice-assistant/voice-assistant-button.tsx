"use client";

import { useVoiceAssistant } from "@/hooks/use-voice-assistant";
import { useState } from "react";
import { Mic, Square, Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function VoiceAssistantButton() {
  const { isConnected, isListening, isSpeaking, error, connect, disconnect } =
    useVoiceAssistant({
      endpoint:
        process.env.NEXT_PUBLIC_VOICELIVE_ENDPOINT ||
        "wss://ai-hacx-voice.services.ai.azure.com/voice-live/realtime?api-version=2025-10-01",
      apiKey: process.env.NEXT_PUBLIC_VOICELIVE_API_KEY || "",
      model: "gpt-4o-realtime-preview",
      voice: {
        name: "en-US-Ava:DragonHDLatestNeural",
        type: "azure-standard",
        temperature: 0.8,
      },
      instructions:
        "You are a helpful AI assistant. You are an English teacher trying to teach a preschooler English by correcting the user's grammar.",
    });

  const [isExpanded, setIsExpanded] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleInitialClick = async () => {
    setIsConnecting(true);
    await connect();
    setIsConnecting(false);
    setIsExpanded(true);
  };

  const handleStopClick = () => {
    disconnect();
    setIsExpanded(false);
  };

  return (
    <div className="relative flex items-center justify-center h-full">
      <div className="relative flex items-center justify-center min-w-[280px] h-20">
        {/* Initial Button */}
        <button
          onClick={handleInitialClick}
          disabled={isConnecting}
          className={cn(
            "relative flex items-center gap-3 px-4 py-3 cursor-pointer rounded-sm font-medium transition-all duration-700 ease-in-out",
            "bg-transparent shadow-lg hover:shadow-xl",
            "active:scale-95 absolute disabled:cursor-not-allowed disabled:opacity-50",
            "before:absolute before:inset-0 before:rounded-sm before:p-[2px]",
            "before:bg-gradient-to-r before:from-blue-500 before:via-purple-500 before:to-orange-500",
            "before:-z-10 before:content-['']",
            "after:absolute after:inset-[2px] after:rounded-sm after:bg-white",
            "after:-z-10 after:content-['']",
            "after:transition-colors after:duration-200",
            "hover:after:bg-neutral-100",
            isExpanded
              ? "opacity-0 scale-90 pointer-events-none"
              : "opacity-100 scale-100",
          )}
          aria-label="Talk to Officer Clif"
        >
          {isConnecting ? (
            <Loader2 className="h-5 w-5 text-purple-500 animate-spin" />
          ) : (
            <Sparkles className="h-5 w-5 text-purple-500" />
          )}
          <span className="font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
            {isConnecting ? "Connecting..." : "Talk to Officer Clif"}
          </span>
        </button>

        {/* Split Buttons Container */}
        <div
          className={cn(
            "flex items-center gap-4 transition-all duration-700 ease-in-out absolute",
            isExpanded
              ? "opacity-100 scale-100 delay-150"
              : "opacity-0 scale-90 pointer-events-none",
          )}
        >
          {/* Microphone Button */}
          <button
            onClick={() => {}}
            disabled={!isConnected}
            className={cn(
              "relative flex h-16 w-16 items-center justify-center rounded-full transition-all duration-500",
              "shadow-lg hover:shadow-xl hover:scale-105 active:scale-95",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              isListening ? "bg-green-800" : "bg-yellow-500",
            )}
            aria-label={isListening ? "Listening..." : "Ready to listen"}
          >
            <Mic
              className={cn(
                "h-7 w-7 text-white transition-transform duration-500",
                isListening && "animate-pulse scale-110",
              )}
            />
          </button>

          {/* Stop Button */}
          <button
            onClick={handleStopClick}
            className={cn(
              "relative flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300 ease-out",
              "bg-blue-primary shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 hover:bg-blue-secondary",
            )}
            aria-label="Stop and reset"
          >
            <Square className="h-6 w-6 text-white fill-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function MicrophoneButton() {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "relative flex h-16 w-16 items-center justify-center rounded-full transition-all duration-500 ease-out",
        "shadow-lg hover:shadow-xl hover:scale-105 active:scale-95",
        isActive
          ? "bg-gradient-to-br from-emerald-400 to-teal-500"
          : "bg-gradient-to-br from-blue-500 to-indigo-600",
      )}
      aria-label={isActive ? "Stop recording" : "Start recording"}
    >
      <Mic
        className={cn(
          "h-7 w-7 text-white transition-transform duration-500",
          isActive && "scale-110",
        )}
      />

      {/* Pulse animation ring when active */}
      {isActive && (
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-75 animate-ping" />
      )}
    </button>
  );
}
