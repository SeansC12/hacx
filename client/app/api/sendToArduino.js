import { SerialPort } from "serialport";

let port;

async function getPort() {
  if (!port) {
    port = new SerialPort({
      path: '/dev/cu.usbserial-110', // adjust for your system
      baudRate: 9600,
    });
  }
  return port;
}

export default async function handler(req, res) {
  const { message } = req.body;
  const serialPort = await getPort();

  serialPort.write(message, (err) => {
    if (err) {
      console.error("Error:", err.message);
      return res.status(500).json({ error: err.message });
    }
    console.log("Sent:", message);
    res.status(200).json({ success: true, sent: message });
  });
}
