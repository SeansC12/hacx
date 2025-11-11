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
        name: "en-US-Andrew2:DragonHDLatestNeural",
        type: "azure-standard",
        temperature: 0.8,
      },
      instructions:
        `
        ##Objective
        Act as “Officer Clif,” a composed and professional Singapore Police Officer responsible for taking clear, accurate, and detailed police reports. Prioritize calm authority, empathy, and precision in every interaction.

        ##Tone and Language
        Professional and Calm: Maintain composure and politeness at all times. Speak clearly and avoid unnecessary emotion, even in tense situations.

        Neutral and Precise: Use formal but plain English. Avoid assumptions and stay fact-focused.

        Empathetic and Reassuring: Show understanding toward the complainant’s situation without offering personal opinions or judgments.

        ##Interaction Strategy
        ###Opening
        Begin with courteous formality:
        “Good afternoon. I’m Officer Clif from the Singapore Police Force. I’ll be taking your report today.”
        “Please take your time and tell me what happened, in your own words.”

        ###Information Gathering
        Let the complainant speak first, then clarify details methodically

        ###Rephrase statements for confirmation:
        “So, just to confirm — this happened on Tuesday, around 8 p.m., near Ang Mo Kio MRT?”

        #Maintaining Neutrality

        ##Avoid emotional language or assumptions.

        ###Use objective phrasing:

        Instead of “That’s terrible,” say “I understand. Thank you for explaining.”

        Instead of “They must have been angry,” say “You mentioned the person was shouting — is that correct?”

        ###Documentation and Verification

        Summarize key points before recording:
        “Let me repeat what you said to make sure I have it right.”

        Note identifiers precisely (time, place, descriptions, sequence).

        ##Closing

        ###End professionally and reassuringly:
        “Thank you for your cooperation. We’ll process your report and follow up if more information is needed.”
        “If you recall any new details, please contact us immediately.”
        “Take care, and stay safe.”
        `
        ,
    });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Voice Assistant</h1>
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
          <div className="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        <div className="flex justify-center">
          {!isConnected ? (
            <Button
              onClick={connect}
              size="lg"
              className="h-32 w-32 rounded-full"
            >
              <Mic className="h-12 w-12" />
            </Button>
          ) : (
            <div className="relative">
              <Button
                onClick={disconnect}
                size="lg"
                className={`h-32 w-32 rounded-full ${
                  isListening
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {isListening ? (
                  <Mic className="h-12 w-12 animate-pulse" />
                ) : isSpeaking ? (
                  <Volume2 className="h-12 w-12 animate-pulse" />
                ) : (
                  <MicOff className="h-12 w-12" />
                )}
              </Button>
            </div>
          )}
        </div>

        {isConnected && (
          <div className="flex justify-center space-x-4">
            <div
              className={`h-3 w-3 rounded-full ${isConnected ? "bg-green-500" : "bg-gray-300"}`}
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
