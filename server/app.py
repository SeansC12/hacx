from flask import Flask, request, jsonify
from flask_cors import CORS
import serial
import subprocess


app = Flask(__name__)
CORS(app)

usbport =  '/dev/cu.usbserial-110'
ser = serial.Serial(usbport, 9600, timeout = 1)
#actual function
def led_control(state):
    ser.write(state.encode("utf-8"))
    print("Message received")


@app.route("/api/healthcheck/", methods=["GET"])
def healthcheck():
    return "OK"


@app.route("/send", methods=["POST"])
def send():
    data = request.json
    value = data.get("value")  # expecting "1" or "0"

    if value not in ("0", "1"):
        return jsonify({"error": "Invalid value"}), 400

    try:
        led_control(value)
        print(f"Sent to Arduino: {value}")  # for debugging
        return jsonify({"status": "ok", "value": value})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=8080)
