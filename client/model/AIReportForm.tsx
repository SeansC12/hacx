async function startRealtime() {
  const pc = new RTCPeerConnection();

  // Create <audio> element for model’s reply
  const audioEl = document.createElement("audio");
  audioEl.autoplay = true;
  document.body.appendChild(audioEl);

  // Handle model audio
  pc.ontrack = (event) => {
    audioEl.srcObject = event.streams[0];
  };

  // Create a data channel for events/text
  const dataChannel = pc.createDataChannel("oai-events");
  dataChannel.onmessage = (event) => {
    try {
      const msg = JSON.parse(event.data);
      // Model sends text outputs in events like these
      if (msg.type === "response.output_text.delta") {
        console.log("Model text (streaming):", msg.delta);
      } else if (msg.type === "response.completed") {
        console.log("✅ Model finished speaking");
      }
    } catch {
      // Sometimes model sends non-JSON system pings
    }
  };

  // Capture mic
  const localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  const resp = await fetch("/api/realtime", {
    method: "POST",
    body: offer.sdp,
  });

  const answer = await resp.text();
  await pc.setRemoteDescription({ type: "answer", sdp: answer });

  console.log("🎧 Realtime audio session established");
}
