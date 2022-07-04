# sPyCam
A client to connect a Raspberry Pi Python Server using OpenCV to interact with a webcam, that streams to a browser client.

FRONT-END
React + Material UI

BACK-END
Flask

The architecture is as follows.
1. React Application 
2. API to connect the back-end.
3. Raspberry Pi server that records footage from an external webcam and is saved on in a database.
4. Web-socket server to enable live streaming from the Pi server to the client in a browser window.
5. REST API to access database to view video files in browser.
6. TODO/// allow for connection via SSH from terminal.