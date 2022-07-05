import React from 'react';
import { Button } from '@mui/material'
import './App.css';

function App() {
  const [ showVideo, setVideoVisible ] = React.useState(false);
  const [socket, setSocket] = React.useState(null);
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
  }


  if (socket && showVideo) {
    socket.addEventListener('open', () => {
      console.log('connected successfully');
    });
    socket.addEventListener('error', function (event) {
      console.log('WebSocket error: ', event);
    });
    socket.addEventListener('message', (e) => {
      changeFrame(e)
    });
    socket.onclose = function (event) {
      console.log('The connection has been closed successfully.');
      setSocket(null)
    };
    socket.addEventListener('error', function (event) {
      console.log('WebSocket error: ', event);
    });
  }

  const handleButtonClick = () => {
    if(!showVideo){
      setSocket(new WebSocket("ws://10.0.0.156:9000/"))
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
            <canvas id="msg" width="960" height="720" ref={canvasRef} style={{display: "inline-block"}} /> 
          : null
        }
        <Button onClick={() => handleButtonClick()}>Toggle Video</Button>
      </header>
    </div>
  );
}

export default App;
