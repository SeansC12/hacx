import serial
ascii_values = [72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33]
usbport =  '/dev/cu.usbserial-110'
ser = serial.Serial(usbport, 9600, timeout = 1)
while True:
    ser.write(input("enter").encode("utf-8"))
    print(ser.read(100))