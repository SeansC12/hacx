export class AudioProcessor {
  private audioContext: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private sourceNode: MediaStreamAudioSourceNode | null = null;
  private processorNode: ScriptProcessorNode | null = null;
  private isCapturing = false;
  private isPlaying = false;
  private audioQueue: AudioBuffer[] = [];
  private sampleRate = 24000;
  private nextPlayTime = 0;
  private activeSources: AudioBufferSourceNode[] = []; // Track all active audio sources

  async startCapture(
    onAudioData: (audioBase64: string) => void,
  ): Promise<void> {
    if (this.isCapturing) return;

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: this.sampleRate,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      this.audioContext = new AudioContext({ sampleRate: this.sampleRate });
      this.sourceNode = this.audioContext.createMediaStreamSource(
        this.mediaStream,
      );

      this.processorNode = this.audioContext.createScriptProcessor(4096, 1, 1);

      this.processorNode.onaudioprocess = (e) => {
        if (!this.isCapturing) return;

        const inputData = e.inputBuffer.getChannelData(0);

        // Convert Float32Array to Int16Array (PCM16)
        const pcm16 = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          const s = Math.max(-1, Math.min(1, inputData[i]));
          pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
        }

        const audioBase64 = this.arrayBufferToBase64(pcm16.buffer);
        onAudioData(audioBase64);
      };

      this.sourceNode.connect(this.processorNode);
      this.processorNode.connect(this.audioContext.destination);

      this.isCapturing = true;
      console.log("Audio capture started");
    } catch (error) {
      console.error("Failed to start audio capture:", error);
      throw error;
    }
  }

  stopCapture(): void {
    if (!this.isCapturing) return;

    this.isCapturing = false;

    if (this.processorNode) {
      this.processorNode.disconnect();
      this.processorNode = null;
    }

    if (this.sourceNode) {
      this.sourceNode.disconnect();
      this.sourceNode = null;
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }

    console.log("Audio capture stopped");
  }

  async startPlayback(): Promise<void> {
    if (this.isPlaying) return;

    if (!this.audioContext) {
      this.audioContext = new AudioContext({ sampleRate: this.sampleRate });
    }

    this.isPlaying = true;
    this.nextPlayTime = 0;
    console.log("Audio playback ready");
  }

  async queueAudio(audioBase64: string): Promise<void> {
    if (!this.isPlaying || !this.audioContext) return;

    try {
      // Decode base64 to ArrayBuffer
      const audioData = this.base64ToArrayBuffer(audioBase64);

      // Convert PCM16 to AudioBuffer
      const audioBuffer = await this.pcm16ToAudioBuffer(audioData);

      // Calculate when to play this audio chunk
      const currentTime = this.audioContext.currentTime;

      // If nextPlayTime is in the past or not set, start immediately
      if (this.nextPlayTime < currentTime) {
        this.nextPlayTime = currentTime;
      }

      // Play the audio at the scheduled time
      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.audioContext.destination);

      // Track this source
      this.activeSources.push(source);

      // Remove from active sources when it ends
      source.onended = () => {
        const index = this.activeSources.indexOf(source);
        if (index > -1) {
          this.activeSources.splice(index, 1);
        }
      };

      source.start(this.nextPlayTime);

      // Update next play time to be after this buffer finishes
      this.nextPlayTime += audioBuffer.duration;
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  }

  stopPlayback(): void {
    // Stop all active audio sources immediately
    this.activeSources.forEach((source) => {
      try {
        source.stop();
        source.disconnect();
      } catch (e) {
        // Source might already be stopped
      }
    });

    this.activeSources = [];
    this.isPlaying = false;
    this.audioQueue = [];
    this.nextPlayTime = 0;
    console.log("Audio playback stopped - all sources cleared");
  }

  cleanup(): void {
    this.stopCapture();
    this.stopPlayback();

    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  private async pcm16ToAudioBuffer(
    arrayBuffer: ArrayBuffer,
  ): Promise<AudioBuffer> {
    const int16Array = new Int16Array(arrayBuffer);
    const float32Array = new Float32Array(int16Array.length);

    // Convert Int16 to Float32
    for (let i = 0; i < int16Array.length; i++) {
      float32Array[i] = int16Array[i] / (int16Array[i] < 0 ? 0x8000 : 0x7fff);
    }

    const audioBuffer = this.audioContext!.createBuffer(
      1,
      float32Array.length,
      this.sampleRate,
    );
    audioBuffer.getChannelData(0).set(float32Array);

    return audioBuffer;
  }
}
