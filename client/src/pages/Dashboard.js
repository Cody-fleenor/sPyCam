import React from 'react'
import { Grid, Card, CardContent, CardActions, Typography, Button, List, ListItem, ListItemText, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { ErrorOutline, CheckCircleOutline, Pending, PersonSearch, ExpandMore  } from '@mui/icons-material';
import VideoCard from '../components/VideoCard'
import videoplacehoder from '../assets/tv-static.gif'
import "../App.css";

const logs = [
    {
        id: '234235235235',
        timestamp: '111111111111',
        status: 'connected'
    },
    {
        id: '23534654364324523',
        timestamp: '111111111111',
        status: 'personDetected'
    },
    {
        id: '546457457457',
        timestamp: '111111111111',
        status: 'disconnected'
    },
    {
        id: '2334234234',
        timestamp: '111111111111',
        status: 'connected'
    },
    {
        id: '2342352352584835',
        timestamp: '111111111111',
        status: 'disconnected'
    },
    {
        id: '34534537737',
        timestamp: '111111111111',
        status: 'connected'
    },
    {
        id: '876544363737',
        timestamp: '111111111111',
        status: 'disconnected'
    },
    {
        id: '978067868567845',
        timestamp: '111111111111',
        status: 'connected'
    },
    {
        id: '2342764253466',
        timestamp: '111111111111',
        status: 'personDetected'
    },
    {
        id: '67549574579221',
        timestamp: '111111111111',
        status: 'disconnected'
    }
]

const StatusIcon = (props) => {
    const { status } = props
    let icons = {
        default: <Pending />,
        connected: <CheckCircleOutline sx={{color: 'green'}} />,
        disconnected: <ErrorOutline sx={{color: 'red'}} />,
        personDetected: <PersonSearch sx={{color: '#61DBFB'}} />
    }
    return icons[status]
}

const Logs = (props) => {
    const { logs } = props
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Stream Logs</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List sx={{maxHeight: 250, overflowY: 'scroll'}}>
                    {
                        logs && logs.map(log => {
                            return (
                                <ListItem key={log.id}>
                                    <StatusIcon status={log.status} />
                                    <ListItemText sx={{textAlign: 'right'}}>
                                        {log.timestamp}
                                    </ListItemText>
                                </ListItem>
                            )
                        })
                    }
                </List>
            </AccordionDetails>
        </Accordion>
    )
}

const Files = (props) => {
    const { files } = props
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Archive Files</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List sx={{maxHeight: 250, overflowY: 'scroll'}}>
                    {
                        files && files.map(file => {
                            return (
                                <ListItem key={file.id}>
                                    <StatusIcon status={file.status} />
                                    <ListItemText sx={{textAlign: 'right'}}>
                                        {file.timestamp}
                                    </ListItemText>
                                </ListItem>
                            )
                        })
                    }
                </List>
            </AccordionDetails>
        </Accordion>
    )
}

function Dashboard() {
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
    
    //   const sendMessageToSocket = (socket) => {
    //     socket.send('hello world')
    //   }
    
      const handleButtonClick = () => {
        if(!showVideo){
            //   setSocket(new WebSocket("ws://localhost:8585/"))
            setVideoVisible(true)
        } else {
            setVideoVisible(false)
            disconnectSocket()
        }
      }

    // const handleRefresh = () => {
    //     console.log('Refreshing...')
    // }

    return (
        <Grid container >
            <Grid item xs={2}>
                <Typography variant="body">
                    Menu
                </Typography>
                <List>
                    <ListItem>
                        <Button fullWidth variant="text" color="primary">Click</Button>
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={10}>
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={4}>
                                <Logs logs={logs} />
                                <Files files={logs} />
                            </Grid>
                            <Grid item xs={8}>
                                {
                                    showVideo ? <VideoCard ref={canvasRef} status={status} /> : 
                                    <Card>
                                        <Typography variant="h5">{status}</Typography>
                                        <CardContent>
                                            <canvas id="msg" height="250px" style={{display: "inline-block", backgroundImage: `url(${videoplacehoder})`}} /> 
                                        </CardContent>
                                        <CardActions>
                                            <Button onClick={() => handleButtonClick()}>Connect</Button>
                                        </CardActions>
                                    </Card>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Dashboard