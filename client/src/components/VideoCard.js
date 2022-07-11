import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import videoplacehoder from '../assets/tv-static.gif';
import React, { forwardRef } from 'react';
import './VideoCard.css';

const ActiveVideoFeed = forwardRef((props, ref) => {
    const { status } = props;
    return (
        <CardContent>
            <Typography variant="h5">{status}</Typography>
            <canvas id="msg" height="250px" className="canvas-video" ref={ref} style={{display: "inline-block"}} /> 
        </CardContent>
    )
});

const InActiveVideoFeed = (props) => {
    const { status } = props;
    return (
        <CardContent>
            <Typography variant="h5">{status}</Typography>
            <canvas id="msg" height="250px" className="canvas-video" style={{display: "inline-block", backgroundImage: `url(${videoplacehoder})`}} /> 
        </CardContent>
    )
};

const VideoCard = () => {
    const [ showVideo, setVideoVisible ] = React.useState(false);
    const [ socket, setSocket ] = React.useState(null);
    const [ status, setStatus ] = React.useState('Disconnected.');
    const canvasRef = React.useRef();
  
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
          setStatus('Connected.')
        });
        socket.addEventListener('error', (event) => {
          setStatus('Error: ' + event.message)
        });
        socket.addEventListener('message', (event) => {
          changeFrame(event)
        });
        socket.onclose = function (event) {
          setStatus('Disconnected.')
          setSocket(null)
        };
      }
    
      const establishConnectionToVideoFeed = () => {
        if(!showVideo){
            setSocket(new WebSocket(process.env.REACT_APP_WEBSOCKET_URL))
            setVideoVisible(true)
        } else {
            setVideoVisible(false)
            disconnectSocket()
        }
    }
    
    const handleStartVideo = () => {
        establishConnectionToVideoFeed()
    }

    return (
        <Card sx={{maxWidth: '500px', display: 'block', margin: '0 auto'}}>
            {
                showVideo ? <ActiveVideoFeed status={status} ref={canvasRef} /> : <InActiveVideoFeed status={status} />
            }
            <CardActions>
                <Button onClick={() => handleStartVideo()}>{ showVideo ? 'Stop Video' : 'Start Video' }</Button>
            </CardActions>
        </Card>
    )
}

export default VideoCard