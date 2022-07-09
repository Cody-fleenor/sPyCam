import time, asyncio, websockets, socketserver, multiprocessing, cv2, sys, requests, os
import http.server as http
from datetime import datetime as dt
from dotenv import load_dotenv
from os.path import join, dirname

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

API_URL = os.environ.get("API_URL")
HOST=os.environ.get("HOST")
CAMERA_PORT=os.environ.get("CAMERA_PORT")
SOCKET_PORT=os.environ.get("SOCKET_PORT")

# Keep track of our processes
PROCESSES = []

def log(message):
    body = "[LOG] " + str(dt.now()) + " - " + message
    print("[LOG] " + str(dt.now()) + " - " + message)
    requests.post(API_URL, json = body)

def camera(man):
    log("Starting camera")
    vc = cv2.VideoCapture(0)
    face_cascade = cv2.CascadeClassifier( cv2.data.haarcascades + "haarcascade_frontalface_default.xml" )
    body_cascade = cv2.CascadeClassifier( cv2.data.haarcascades + "haarcascade_fullbody.xml" )
    detection = False
    detection_stopped_time = None
    timer_started = False
    SECONDS_TO_RECORD_AFTER_DETECTION = 5
    frame_size = (int(vc.get(3)), int(vc.get(4)))
    fourcc = cv2.VideoWriter_fourcc(*"mp4v")

    if vc.isOpened():
        r, f = vc.read()
    else:
        r = False
    while r:
        cv2.waitKey(20)
        r, f = vc.read()
        gray = cv2.cvtColor(f, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)
        bodies = body_cascade.detectMultiScale(gray, 1.3, 5)
        if len(faces) + len(bodies) > 0:
            for (x, y, width, height) in faces:
                cv2.rectangle(f, (x, y), (x + width, y + height), (255, 0, 0), 3)
            for (x, y, width, height) in bodies:
                cv2.rectangle(f, (x, y), (x + width, y + height), (0, 255, 0), 3)
            if detection:
                timer_started = False
            else:
                detection = True
                current_time = dt.now().strftime("%d-%m-%Y-%H-%M-%S")
                out = cv2.VideoWriter( f"server/videos/{current_time}.mp4", fourcc, 20, frame_size)
                log(f' Faces Detected: {len(faces)}. Bodies Detected: {len(bodies)}. Recording has started on file: {current_time}.mp4')
        elif detection:
            if timer_started:
                if time.time() - detection_stopped_time >= SECONDS_TO_RECORD_AFTER_DETECTION:
                    detection = False
                    timer_started = False
                    out.release()
                    log('No longer detecting faces or bodies. Recording stopped,')
                    print('Stop Recording!')
            else:
                timer_started = True
                detection_stopped_time = time.time()
        if detection:
            out.write(f)
        f = cv2.resize(f, (640, 480))
        encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 65]
        man[0] = cv2.imencode('.jpg', f, encode_param)[1]

# HTTP server handler
def server():
    server_address = (HOST, int(CAMERA_PORT))
    if sys.version_info[1] < 7:
        class ThreadingHTTPServer(socketserver.ThreadingMixIn, http.HTTPServer):
            pass
        httpd = ThreadingHTTPServer(server_address, http.SimpleHTTPRequestHandler)
    else:
        httpd = http.ThreadingHTTPServer(server_address, http.SimpleHTTPRequestHandler)
    log("Server started")
    httpd.serve_forever()

def socket(man):
    # Will handle our websocket connections
    async def handler(websocket, path):
        log("Socket opened")
        try:
            while True:
                await asyncio.sleep(0.033) # 30 fps
                await websocket.send(man[0].tobytes())
        except websockets.exceptions.ConnectionClosed:
            log("Socket closed")
    log("Starting socket handler")
    # Create the awaitable object
    start_server = websockets.serve(ws_handler=handler, host=HOST, port=int(SOCKET_PORT))
    # Start the server, add it to the event loop
    asyncio.get_event_loop().run_until_complete(start_server)
    # Registered our websocket connection handler, thus run event loop forever
    asyncio.get_event_loop().run_forever()


def main():
    # queue = multiprocessing.Queue()
    manager = multiprocessing.Manager()
    lst = manager.list()
    lst.append(None)
    # Host the page, creating the server
    http_server = multiprocessing.Process(target=server)
    # Set up our websocket handler
    socket_handler = multiprocessing.Process(target=socket, args=(lst,))
    # Set up our camera
    camera_handler = multiprocessing.Process(target=camera, args=(lst,))
    # Add 'em to our list
    PROCESSES.append(camera_handler)
    PROCESSES.append(http_server)
    PROCESSES.append(socket_handler)
    for p in PROCESSES:
        p.start()
    # Wait forever
    while True:
        pass

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        for p in PROCESSES:
            p.terminate()