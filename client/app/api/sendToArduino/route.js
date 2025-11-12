import { SerialPort } from "serialport";

let port;

async function getPort() {
  if (!port) {
    port = new SerialPort({
      path: "/dev/cu.usbserial-110", // replace with your Arduino port
      baudRate: 9600,
    });

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
      serialPort.write(message, (err) => (err ? reject(err) : resolve()));
    });

    console.log("✅ Sent:", message);
    return new Response(JSON.stringify({ success: true, sent: message }), { status: 200 });
  } catch (err) {
    console.error("❌ API error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
