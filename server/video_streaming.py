#!/usr/bin/env python
import asyncio
import websockets
import cv2

async def time(websocket, path):
    while True:
        camera = True
        if camera == True:
            vid = cv2.VideoCapture(0)
        else:
            vid = cv2.VideoCapture('videos/video1.mp4')
        try:
            while(vid.isOpened()):
                img, frame = vid.read() # read camera frame
                frame = cv2.resize(frame, (640, 480))
                encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 65]
                man = cv2.imencode('.jpg', frame, encode_param)[1]
                await websocket.send(man.tobytes())
        except :
            pass
            vid.release()

if __name__ == "__main__":
    start_server = websockets.serve(time, "localhost", 9000)    
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()