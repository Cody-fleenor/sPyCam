#!/usr/bin/env python
import cv2, socket, threading

HEADER = 64
PORT = 9000
SERVER = "localhost"
ADDR = (SERVER, PORT)
FORMAT = 'utf-8'
DISCONNECT_MESSAGE = "!DISCONNECT"
START_CAM_MESSAGE= "Start Camera"

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(ADDR)

async def handle_video_capture(client):
    while True:
        camera = True
        if camera == True:
            video_capture = cv2.VideoCapture(0)
        else:
            video_capture = cv2.VideoCapture('videos/video1.mp4')
        try:
            while(video_capture.isOpened()):
                img, frame = video_capture.read() # read camera frame
                frame = cv2.resize(frame, (640, 480))
                encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 65]
                packet = cv2.imencode('.jpg', frame, encode_param)[1]
                await client.send(packet.tobytes())
        except :
            pass


def handle_client(conn, addr):
    print(f"[NEW CONNECTION] {addr} connected.")
    connected = True
    while connected:
        msg_length = conn.recv(HEADER).decode(FORMAT)
        print(msg_length, ' ---- recveiced')
        if msg_length:
            msg_length = int(msg_length)
            msg = conn.recv(msg_length).decode(FORMAT)
            if msg == START_CAM_MESSAGE:
                activeCamera = True
            elif msg == DISCONNECT_MESSAGE:
                connected = False
                activeCamera = False
    conn.close()


def start():
    print("[STARTING] server is starting...")
    server.listen()
    print(f"[LISTENING] Server is listening on {SERVER}")
    while True:
        conn, addr = server.accept()
        thread = threading.Thread(target=handle_client, args=(conn, addr))
        thread.start()
        print(f"[ACTIVE CONNECTIONS] {threading.active_count() - 1}")

if __name__ == "__main__":
    start()