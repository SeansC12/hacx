export async function GET(req: Request) {
  const upgrade = req.headers.get("upgrade");
  if (!upgrade || upgrade.toLowerCase() !== "websocket") {
    return new Response("Expected WebSocket", { status: 426 });
  }

  const pair = new (globalThis as any).WebSocketPair();
  const client = pair[0];
  const server = pair[1];

  server.accept();

  let upstream: WebSocket | null = null;

  try {
    const azureUrl = buildAzureVoiceLiveWsUrl();
    upstream = new WebSocket(azureUrl);
  } catch (err: any) {
    server.send(
      JSON.stringify({
        type: "error",
        error: err?.message || "Failed to initialize upstream connection",
      }),
    );
    try {
      server.close(1011, "Initialization error");
    } catch {}
    return new Response(null, { status: 101, webSocket: client });
  }

  upstream.addEventListener("open", () => {
    // Optionally send a session.update to configure the session on connect.
    const session: any = {};
    if (process.env.VOICE_LIVE_VOICE) {
      session.voice = {
        name: process.env.VOICE_LIVE_VOICE,
        type: "azure-standard",
      };
    }
    if (process.env.VOICE_LIVE_INSTRUCTIONS) {
      session.instructions = process.env.VOICE_LIVE_INSTRUCTIONS;
    }
    // Sensible defaults for turn detection (can be overridden by the client later).
    session.turn_detection = {
      type: "azure_semantic_vad",
      threshold: 0.3,
      prefix_padding_ms: 200,
      silence_duration_ms: 200,
      end_of_utterance_detection: {
        model: "semantic_detection_v1",
        threshold_level: "default",
        timeout_ms: 1000,
      },
    };
    session.input_audio_noise_reduction = {
      type: "azure_deep_noise_suppression",
    };
    session.input_audio_echo_cancellation = {
      type: "server_echo_cancellation",
    };

    upstream!.send(JSON.stringify({ type: "session.update", session }));
  });

  // Pipe browser -> Azure
  server.addEventListener("message", (event: MessageEvent) => {
    if (upstream && upstream.readyState === upstream.OPEN) {
      upstream.send(event.data);
    }
  });

  // Pipe Azure -> browser
  upstream.addEventListener("message", (event: MessageEvent) => {
    try {
      server.send(event.data);
    } catch {}
  });

  const closeBoth = (code = 1000, reason?: string) => {
    try {
      server.close(code, reason);
    } catch {}
    try {
      upstream?.close(code, reason);
    } catch {}
  };

  server.addEventListener("close", () => closeBoth());
  server.addEventListener("error", () =>
    closeBoth(1011, "Client socket error"),
  );
  upstream.addEventListener("close", () => closeBoth());
  upstream.addEventListener("error", () =>
    closeBoth(1011, "Upstream socket error"),
  );

  // Complete the upgrade
  return new Response(null, { status: 101, webSocket: client });
}
