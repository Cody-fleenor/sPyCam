import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import React, { forwardRef } from 'react'

const VideoCard = forwardRef((props, ref) => {
    const { status  } = props;

    const handleStopVideo = () => {

    }
    
    const handleStartVideo = () => {

    }

    const handleDownloadVideo = () => {

    }

    return (
        <Card>
            <Typography variant="h5">{status}</Typography>
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