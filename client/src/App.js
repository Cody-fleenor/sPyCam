import React from 'react';
import { Button, Typography } from '@mui/material'
import './App.css';
import VideoCard from './components/VideoCard';

function App() {
  const [ showVideo, setVideoVisible ] = React.useState(false);
  const [socket, setSocket] = React.useState(null);
  const [status, setStatus] = React.useState('Disconnected.')
  const canvasRef = React.useRef()

  const changeFrame = function (e) {
    let image = new Image();
    image.src = URL.createObjectURL(e.data);
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    image.src = URL.createObjectURL(e.data);
    image.addEventListener("load", (e) => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    });
  }

  const disconnectSocket =  () => {
    socket.send('!DISCONNECT')
    socket.close()
    setStatus('Disconnected.')
  }

  if (socket && showVideo) {
    socket.addEventListener('open', () => {
      console.log('connected successfully');
      setStatus('Connected.')
    });
    socket.addEventListener('error', (event) => {
      console.log('WebSocket error: ', event);
      setStatus('Error : ' + event.message)
    });
    socket.addEventListener('message', (event) => {
      changeFrame(event)
    });
    socket.onclose = function (event) {
      setStatus('Disconnected.')
      console.log('The connection has been closed successfully.');
      setSocket(null)
    };
  }

  const sendMessageToSocket = (socket) => {
    socket.send('hello world')
  }

  const handleButtonClick = () => {
    if(!showVideo){
      setSocket(new WebSocket("ws://localhost:8585/"))
      setVideoVisible(true)
    } else {
      setVideoVisible(false)
      disconnectSocket()
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {
          showVideo ?
            <VideoCard ref={canvasRef} />
          : null
        }
        <Typography variant="h3">Status: {status}</Typography>
        <Button onClick={() => handleButtonClick()}>Toggle Video</Button>
        <Button onClick={() => sendMessageToSocket(socket)}>Send Message</Button>
      </header>
    </div>
  );
}

export default App;
