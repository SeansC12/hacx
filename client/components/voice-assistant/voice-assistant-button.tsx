"use client";

import { useState } from "react";
import { Mic, Square, Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFormContext } from "@/contexts/form-context";

interface VoiceAssistantButtonProps {
  isConnected: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  error: string | null;
  onConnect: () => Promise<void>;
  onDisconnect: () => void;
}

export function VoiceAssistantButton({
  isConnected,
  isListening,
  isSpeaking,
  error,
  onConnect,
  onDisconnect,
}: VoiceAssistantButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const { setPendingUpdate } = useFormContext();

  const handleInitialClick = async () => {
    setIsConnecting(true);
    await onConnect();
    setIsConnecting(false);
    setIsExpanded(true);
  };

  const handleStopClick = () => {
    setPendingUpdate(null);
    onDisconnect();
    setIsExpanded(false);
  };

  return (
    <div className="relative flex h-full items-center justify-center">
      <div className="relative flex h-20 min-w-[280px] items-center justify-center">
        {/* Initial Button */}
        <button
          onClick={handleInitialClick}
          disabled={isConnecting}
          className={cn(
            "relative flex cursor-pointer items-center gap-3 rounded-sm px-4 py-3 font-medium transition-all duration-700 ease-in-out",
            "bg-transparent shadow-lg hover:shadow-xl",
            "absolute active:scale-95 disabled:cursor-not-allowed disabled:opacity-50",
            "before:absolute before:inset-0 before:rounded-sm before:p-[2px]",
            "before:bg-gradient-to-r before:from-blue-500 before:via-purple-500 before:to-orange-500",
            "before:-z-10 before:content-['']",
            "after:absolute after:inset-[2px] after:rounded-sm after:bg-white",
            "after:-z-10 after:content-['']",
            "after:transition-colors after:duration-200",
            "hover:after:bg-neutral-100",
            isExpanded
              ? "pointer-events-none scale-90 opacity-0"
              : "scale-100 opacity-100",
          )}
          aria-label="Talk to Officer Clif"
        >
          {isConnecting ? (
            <Loader2 className="h-5 w-5 animate-spin text-purple-500" />
          ) : (
            <Sparkles className="h-5 w-5 text-purple-500" />
          )}
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text font-bold text-transparent">
            {isConnecting ? "Connecting..." : "Talk to Officer Clif"}
          </span>
        </button>

        {/* Expanded Microphone Button */}
        <button
          onClick={handleStopClick}
          className={cn(
            "absolute transition-all duration-700 ease-in-out",
            "flex h-16 w-16 items-center justify-center rounded-full",
            "shadow-lg hover:shadow-xl active:scale-95",
            isExpanded
              ? "scale-100 opacity-100"
              : "pointer-events-none scale-0 opacity-0",
            isListening
              ? "bg-gradient-to-br from-red-500 to-red-600"
              : isSpeaking
                ? "animate-pulse bg-gradient-to-br from-blue-500 to-purple-600"
                : "bg-gradient-to-br from-purple-500 to-indigo-600",
          )}
          aria-label={isListening ? "Listening..." : "Stop recording"}
        >
          {isListening ? (
            <Mic className="h-8 w-8 animate-pulse text-white" />
          ) : (
            <Square className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {error && (
        <div className="absolute top-24 max-w-xs rounded border border-red-400 bg-red-100 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}
    </div>
  );
}
