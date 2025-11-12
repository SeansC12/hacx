let port, parser;

async function getPort() {
  if (!port) {
    // Only import on the server at runtime
    const { SerialPortStream } = await import("@serialport/stream");
    const Bindings = (await import("@serialport/bindings")).default;
    const { ReadlineParser } = await import("@serialport/parser-readline");

    port = new SerialPortStream({
      path: "/dev/cu.usbserial-110",
      baudRate: 9600,
      binding: Bindings, // required for stream to work
    });

    parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));
    parser.on("data", (data) => console.log("Arduino:", data));

    port.on("open", () => console.log("✅ Serial port opened"));
    port.on("error", (err) => console.error("❌ Serial port error:", err));
  }
  return port;
}

export async function POST(req) {
  try {
    const { message } = await req.json();
    if (!message) return new Response(JSON.stringify({ error: "Missing message" }), { status: 400 });

    const serialPort = await getPort();
    await new Promise((resolve, reject) => {
      serialPort.write(message + "\n", (err) => (err ? reject(err) : resolve()));
    });

    console.log("✅ Sent:", message);
    return new Response(JSON.stringify({ success: true, sent: message }), { status: 200 });
  } catch (err) {
    console.error("❌ API error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
