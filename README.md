# sPyCam
An application for home security that allows users to manage webcams or other video capture devices that are connected to a Raspberry Pi server running a Python script. This data is then recorded locally (coming soon: S3 Storage) and can be accessed from a React web application by interacting with AWS infrastructure inlcuding DynamoDB, API Gateway, Lambda, and CodePipeline.

FRONT-END
React + Material UI with React-Router and Axios.
----------------------------------------------------------------
BACK-END
WebCam Server and WebSocket - 
Python application on a Raspberry Pi 4 8GB computer.
----------------------------------------------------------------
Logs Database - 
AWS DynamoDB table and CloudWatch logs.
----------------------------------------------------------------
Videos Archive - 
Storage on Raspberry Pi. Soon it will be available on an AWS S3 bucket.
----------------------------------------------------------------
API Backend - 
AWS Api Gateway, Lambda (written in Python). Considering migrating to NodeJs. Might just keep files for both languages.

Requirements:
You need to have an AWS account and Raspberry Pi. You can use other devices to connect to the video feed, but I can't help you with setting that up. Submit issues on GitHub and contribute documentation, pull requests so that we can continue to expand the available features.

AWS Services:
DynamoDB
S3 Storage
CloudWatch
API Gateway
Lambda
CodePipeline

Languages:
JavaScript, React, Python, Node

1. React Application 
2. API to connect the back-end.
3. Raspberry Pi server that records footage from an external webcam and is saved on in a database.
4. Web-socket server to enable live streaming from the Pi server to the client in a browser window.
5. REST API to access database to view video files in browser.
6. TODO/// allow for connection via SSH from terminal.