"use client";

import { useVoiceAssistant } from "@/hooks/use-voice-assistant";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2 } from "lucide-react";

export function VoiceAssistant() {
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Voice Assistant</h1>
          <p className="text-gray-600">
            {!isConnected && "Click to start the voice assistant"}
            {isConnected &&
              !isListening &&
              !isSpeaking &&
              "Ready - Start speaking"}
            {isListening && "Listening..."}
            {isSpeaking && "Speaking..."}
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="flex justify-center">
          {!isConnected ? (
            <Button
              onClick={connect}
              size="lg"
              className="w-32 h-32 rounded-full"
            >
              <Mic className="w-12 h-12" />
            </Button>
          ) : (
            <div className="relative">
              <Button
                onClick={disconnect}
                size="lg"
                className={`w-32 h-32 rounded-full ${
                  isListening
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {isListening ? (
                  <Mic className="w-12 h-12 animate-pulse" />
                ) : isSpeaking ? (
                  <Volume2 className="w-12 h-12 animate-pulse" />
                ) : (
                  <MicOff className="w-12 h-12" />
                )}
              </Button>
            </div>
          )}
        </div>

        {isConnected && (
          <div className="flex justify-center space-x-4">
            <div
              className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-gray-300"}`}
            />
            <span className="text-sm text-gray-600">
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
