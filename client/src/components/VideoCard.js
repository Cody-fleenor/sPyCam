import { Card, CardContent, CardActions, Button } from '@mui/material';
import React, { forwardRef } from 'react'

const VideoCard = forwardRef((props, ref) => {
    // const { canvasRef  } = props;
    const handleStopVideo = () => {

    }
    
    const handleStartVideo = () => {

    }

    const handleDownloadVideo = () => {

    }

    return (
        <Card>
            <CardContent>
                <canvas id="msg" height="250px" ref={ref} style={{display: "inline-block"}} /> 
            </CardContent>
            <CardActions>
                <Button onClick={() => handleStopVideo}>Start Video</Button>
                <Button onClick={() => handleStartVideo}>Stop Video</Button>
                <Button onClick={() => handleDownloadVideo}>Download Video</Button>
            </CardActions>
        </Card>
    )
})

export default VideoCard