import { EventEmitter } from "events";

export enum ServerEventType {
  SESSION_UPDATED = "session.updated",
  INPUT_AUDIO_BUFFER_SPEECH_STARTED = "input_audio_buffer.speech_started",
  INPUT_AUDIO_BUFFER_SPEECH_STOPPED = "input_audio_buffer.speech_stopped",
  RESPONSE_CREATED = "response.created",
  RESPONSE_AUDIO_DELTA = "response.audio.delta",
  RESPONSE_AUDIO_DONE = "response.audio.done",
  RESPONSE_DONE = "response.done",
  ERROR = "error",
  CONVERSATION_ITEM_CREATED = "conversation.item.created",
}

export interface SessionConfig {
  modalities: string[];
  instructions: string;
  voice: {
    name: string;
    type: string;
    temperature: number;
  };
  input_audio_format: string;
  output_audio_format: string;
  turn_detection: {
    type: string;
    threshold: number;
    prefix_padding_ms: number;
    silence_duration_ms: number;
  };
  tools?: any[];
}

export class VoiceLiveClient extends EventEmitter {
  private ws: WebSocket | null = null;
  private endpoint: string;
  private apiKey: string;
  private model: string;
  private isConnected = false;

  constructor(endpoint: string, apiKey: string, model: string) {
    super();
    this.endpoint = endpoint;
    this.apiKey = apiKey;
    this.model = model;
  }

  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      const wsUrl = `${this.endpoint}&api-key=${this.apiKey}&model=${this.model}`;
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log("Connected to Voice Live API");
        this.isConnected = true;
        resolve();
      };

      this.ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        reject(error);
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleEvent(data);
        } catch (error) {
          console.error("Error parsing message:", error);
        }
      };

      this.ws.onclose = () => {
        console.log("Disconnected from Voice Live API");
        this.isConnected = false;
        this.emit("disconnected");
      };
    });
  }

  private handleEvent(event: any): void {
    this.emit("event", event);
    this.emit(event.type, event);
  }

  async updateSession(config: SessionConfig): Promise<void> {
    this.send({
      type: "session.update",
      session: config,
    });
  }

  async appendAudio(audioBase64: string): Promise<void> {
    this.send({
      type: "input_audio_buffer.append",
      audio: audioBase64,
    });
  }

  async cancelResponse(): Promise<void> {
    this.send({
      type: "response.cancel",
    });
  }

  async sendFunctionOutput(callId: string, output: any): Promise<void> {
    this.send({
      type: "conversation.item.create",
      item: {
        type: "function_call_output",
        call_id: callId,
        output: JSON.stringify(output),
      },
    });

    // Trigger response generation
    this.send({
      type: "response.create",
    });
  }

  private send(data: any): void {
    if (this.ws && this.isConnected) {
      this.ws.send(JSON.stringify(data));
    }
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}
