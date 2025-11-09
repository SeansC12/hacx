"use client";

import { useVoiceAssistant } from "@/hooks/use-voice-assistant";
import { useFormContext } from "@/contexts/form-context";
import { VoiceAssistantButton } from "./voice-assistant-button";
import { FormConfig } from "@/types/form";

interface VoiceFormAssistantProps {
  formConfig: FormConfig;
}

export function VoiceFormAssistant({ formConfig }: VoiceFormAssistantProps) {
  const { setPendingUpdate, confirmPendingUpdate, cancelPendingUpdate } =
    useFormContext();

  // Create tools definition for all form fields
  const tools = [
    {
      type: "function",
      name: "update_form_field",
      description:
        "Update a form field with the provided value after user confirmation",
      parameters: {
        type: "object",
        properties: {
          field_id: {
            type: "string",
            description: "The ID of the form field to update",
            enum: formConfig.sections.flatMap((section) =>
              section.inputs.map((input) => input.id),
            ),
          },
          field_label: {
            type: "string",
            description: "The human-readable label of the field",
          },
          value: {
            type: "string",
            description: "The value to set for the field",
          },
        },
        required: ["field_id", "field_label", "value"],
      },
    },
    {
      type: "function",
      name: "confirm_update",
      description: "User confirmed the pending form update",
      parameters: {
        type: "object",
        properties: {},
      },
    },
    {
      type: "function",
      name: "cancel_update",
      description: "User cancelled the pending form update",
      parameters: {
        type: "object",
        properties: {},
      },
    },
  ];

  const handleToolCall = (toolName: string, args: any) => {
    console.log("Tool call:", toolName, args);

    if (toolName === "update_form_field") {
      setPendingUpdate({
        inputId: args.field_id,
        value: args.value,
        label: args.field_label,
      });
    } else if (toolName === "confirm_update") {
      confirmPendingUpdate();
    } else if (toolName === "cancel_update") {
      cancelPendingUpdate();
    }
  };

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
      instructions: `You are a helpful form-filling assistant. You help users fill out their incident report form by listening to their responses and updating the form fields.

Available form fields: ${formConfig.sections
        .map(
          (section) =>
            `${section.name}: ${section.inputs.map((input) => `${input.name} (${input.id})`).join(", ")}`,
        )
        .join("; ")}

When the user provides information:
1. Use the update_form_field function to set the value
2. Always ask the user to confirm: "I heard [value] for [field_label]. Is that correct?"
3. Wait for confirmation (yes/no)
4. If confirmed, call confirm_update
5. If not confirmed or user wants to change it, call cancel_update and ask them to repeat

Be conversational and helpful. Guide users through the form naturally.`,
      tools,
      onToolCall: handleToolCall,
    });

  return (
    <VoiceAssistantButton
      isConnected={isConnected}
      isListening={isListening}
      isSpeaking={isSpeaking}
      error={error}
      onConnect={connect}
      onDisconnect={disconnect}
    />
  );
}
