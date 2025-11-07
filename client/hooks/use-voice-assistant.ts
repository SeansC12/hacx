import { useState, useCallback, useEffect, useRef } from "react";
import { VoiceLiveClient, ServerEventType } from "@/lib/voicelive-client";
import { AudioProcessor } from "@/lib/audio-processor";

export interface VoiceAssistantConfig {
  endpoint: string;
  apiKey: string;
  model: string;
  voice: {
    name: string;
    type: string;
    temperature: number;
  };
  instructions: string;
}

export function useVoiceAssistant(config: VoiceAssistantConfig) {
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clientRef = useRef<VoiceLiveClient | null>(null);
  const audioProcessorRef = useRef<AudioProcessor | null>(null);

  const connect = useCallback(async () => {
    try {
      setError(null);

      // Create client
      const client = new VoiceLiveClient(
        config.endpoint,
        config.apiKey,
        config.model,
      );
      clientRef.current = client;

      // Create audio processor
      const audioProcessor = new AudioProcessor();
      audioProcessorRef.current = audioProcessor;

      // Connect to Voice Live API
      await client.connect();
      setIsConnected(true);

      // Setup session
      await client.updateSession({
        modalities: ["text", "audio"],
        instructions: config.instructions,
        voice: config.voice,
        input_audio_format: "pcm16",
        output_audio_format: "pcm16",
        turn_detection: {
          type: "server_vad",
          threshold: 0.5,
          prefix_padding_ms: 300,
          silence_duration_ms: 500,
        },
      });

      // Setup event listeners
      client.on(ServerEventType.SESSION_UPDATED, () => {
        console.log("Session ready");
        startListening();
      });

      client.on(ServerEventType.INPUT_AUDIO_BUFFER_SPEECH_STARTED, () => {
        console.log("User started speaking");
        setIsListening(true);
        audioProcessor.stopPlayback();
      });

      client.on(ServerEventType.INPUT_AUDIO_BUFFER_SPEECH_STOPPED, () => {
        console.log("User stopped speaking");
        setIsListening(false);
        audioProcessor.startPlayback();
      });

      client.on(ServerEventType.RESPONSE_CREATED, () => {
        console.log("Assistant response created");
        setIsSpeaking(true);
      });

      client.on(ServerEventType.RESPONSE_AUDIO_DELTA, (event: any) => {
        audioProcessor.queueAudio(event.delta);
      });

      client.on(ServerEventType.RESPONSE_AUDIO_DONE, () => {
        console.log("Assistant finished speaking");
        setIsSpeaking(false);
      });

      client.on(ServerEventType.ERROR, (event: any) => {
        console.error("Voice Live error:", event.error);
        setError(event.error.message);
      });

      client.on("disconnected", () => {
        setIsConnected(false);
        setIsListening(false);
        setIsSpeaking(false);
      });

      await audioProcessor.startPlayback();
    } catch (err: any) {
      console.error("Connection error:", err);
      setError(err.message);
      setIsConnected(false);
    }
  }, [config]);

  const startListening = useCallback(async () => {
    if (!audioProcessorRef.current || !clientRef.current) return;

    await audioProcessorRef.current.startCapture((audioBase64) => {
      clientRef.current?.appendAudio(audioBase64);
    });
  }, []);

  const disconnect = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.disconnect();
      clientRef.current = null;
    }

    if (audioProcessorRef.current) {
      audioProcessorRef.current.cleanup();
      audioProcessorRef.current = null;
    }

    setIsConnected(false);
    setIsListening(false);
    setIsSpeaking(false);
  }, []);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    isConnected,
    isListening,
    isSpeaking,
    error,
    connect,
    disconnect,
  };
}
