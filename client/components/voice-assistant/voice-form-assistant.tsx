"use client";

import { useVoiceAssistant } from "@/hooks/use-voice-assistant";
import { useFormContext } from "@/contexts/form-context";
import { VoiceAssistantButton } from "./voice-assistant-button";
import { FormConfig } from "@/types/form";
import { useRef } from "react";

interface VoiceFormAssistantProps {
  formConfig: FormConfig;
}

export function VoiceFormAssistant({ formConfig }: VoiceFormAssistantProps) {
  const {
    setPendingUpdate,
    confirmPendingUpdate,
    cancelPendingUpdate,
    pendingUpdate,
  } = useFormContext();
  const clientRef = useRef<any>(null);

  // Create tools definition for all form fields
  const tools = [
    {
      type: "function",
      name: "update_form_field",
      description:
        "Propose an update to a form field. ALWAYS call this when user provides information.",
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
      description:
        "User confirmed the pending form update. Call this when user says yes, correct, confirmed, etc.",
      parameters: {
        type: "object",
        properties: {},
      },
    },
    {
      type: "function",
      name: "cancel_update",
      description:
        "User cancelled or rejected the pending form update. Call this when user says no, that's wrong, incorrect, etc.",
      parameters: {
        type: "object",
        properties: {},
      },
    },
  ];

  const handleToolCall = (toolName: string, args: any, callId: string) => {
    console.log("Tool call:", toolName, args, "Call ID:", callId);

    if (toolName === "update_form_field") {
      setPendingUpdate({
        inputId: args.field_id,
        value: args.value,
        label: args.field_label,
      });

      // Send success response back to the model
      if (clientRef.current) {
        clientRef.current.sendFunctionOutput(callId, {
          success: true,
          message: `Proposed update: ${args.field_label} = ${args.value}. Please confirm with the user.`,
        });
      }
    } else if (toolName === "confirm_update") {
      confirmPendingUpdate();

      // Send success response
      if (clientRef.current) {
        clientRef.current.sendFunctionOutput(callId, {
          success: true,
          message: `Form field updated successfully.`,
        });
      }
    } else if (toolName === "cancel_update") {
      cancelPendingUpdate();

      // Send success response
      if (clientRef.current) {
        clientRef.current.sendFunctionOutput(callId, {
          success: true,
          message: `Update cancelled. Please ask the user to provide the correct information.`,
        });
      }
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
      instructions: `You are Officer Clif, a friendly and efficient police officer helping citizens fill out an incident report form. Your job is to guide them through the form and extract information from their speech.

IMPORTANT RULES:
1. ALWAYS use update_form_field immediately when user provides ANY information
2. After calling update_form_field, ALWAYS ask: "I heard [VALUE] for [FIELD NAME]. Is that correct?"
3. Listen for confirmation words (yes, correct, that's right, yep, yeah) → call confirm_update
4. Listen for rejection words (no, wrong, incorrect, that's not right) → call cancel_update and ask them to repeat
5. Be proactive - don't wait for the user to ask what to do next
6. Guide them through the form section by section
7. For emails, type out the email in the input field, and ask the user if it is correct instead. This is because emails can have unique spellings and characters that make it hard to understand and confirm via voice.

Available form fields:
${formConfig.sections
  .map(
    (section, idx) =>
      `\nSection ${idx + 1}: ${section.name}\n${section.inputs
        .map(
          (input) =>
            `  - ${input.name} (ID: ${input.id})${input.required ? " [REQUIRED]" : ""}`,
        )
        .join("\n")}`,
  )
  .join("\n")}

Example conversation flow:
User: "My name is John Doe"
You: [Call update_form_field with field_id="name", value="John Doe"]
You: "I heard John Doe for Full Name. Is that correct?"
User: "Yes"
You: [Call confirm_update]
You: "Great! Now, what's your email address?"

Be conversational, helpful, and always confirm before moving to the next field.`,
      tools,
      onToolCall: handleToolCall,
      onConnect: (client) => {
        clientRef.current = client;
      },
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
