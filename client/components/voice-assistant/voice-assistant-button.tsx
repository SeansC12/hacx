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

        {/* Expanded Microphone Button */}
        <button
          onClick={handleStopClick}
          className={cn(
            "absolute transition-all duration-700 ease-in-out",
            "w-16 h-16 rounded-full flex items-center justify-center",
            "shadow-lg hover:shadow-xl active:scale-95",
            isExpanded
              ? "opacity-100 scale-100"
              : "opacity-0 scale-0 pointer-events-none",
            isListening
              ? "bg-gradient-to-br from-red-500 to-red-600"
              : isSpeaking
                ? "bg-gradient-to-br from-blue-500 to-purple-600 animate-pulse"
                : "bg-gradient-to-br from-purple-500 to-indigo-600",
          )}
          aria-label={isListening ? "Listening..." : "Stop recording"}
        >
          {isListening ? (
            <Mic className="w-8 h-8 text-white animate-pulse" />
          ) : (
            <Square className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {error && (
        <div className="absolute top-24 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm max-w-xs">
          {error}
        </div>
      )}
    </div>
  );
}
