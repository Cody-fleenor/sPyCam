import React from 'react'
import { Grid, Card, CardContent, CardActions, Typography, Button, List, ListItem, ListItemText, ListItemAvatar, Accordion, AccordionSummary, AccordionDetails, Badge, IconButton } from '@mui/material'
import { Error, CheckCircle, Pending, Person, ExpandMore, Storage, Power, PhotoCamera, Announcement, MoreVert  } from '@mui/icons-material';
import VideoCard from '../components/VideoCard'
import videoplacehoder from '../assets/tv-static.gif'
import axios from 'axios';

// Needed for debugging
// eslint-disable-next-line
const mock_logs = [
    {
        id: 'aszdgarseghrgb',
        timestamp: 'timestamp',
        status: 'active',
        message: 'message',
        type: 'server'
    },
    {
        id: 'fsdfasdf',
        timestamp: 'timestamp',
        status: 'active',
        message: 'message',
        type: 'server'
    },
    {
        id: 'asdfasghahweh',
        timestamp: 'timestamp',
        status: 'active',
        message: 'message',
        type: 'server'
    },
    {
        id: 'rhasgsxdcg',
        timestamp: 'timestamp',
        status: 'active',
        message: 'message',
        type: 'server'
    },
    {
        id: 'asdayehrg',
        timestamp: 'timestamp',
        status: 'active',
        message: 'message',
        type: 'server'
    },
    {
        id: 'retwehyadfhd',
        timestamp: 'timestamp',
        status: 'active',
        message: 'message',
        type: 'server'
    },
    {
        id: 'fahdfh4wsdf',
        timestamp: 'timestamp',
        status: 'active',
        message: 'message',
        type: 'server'
    },
    {
        id: 'sdfhse5ye3dfg',
        timestamp: 'timestamp',
        status: 'active',
        message: 'message',
        type: 'server'
    },
    {
        id: 'dfhaj5tjae5edrh',
        timestamp: 'timestamp',
        status: 'active',
        message: 'message',
        type: 'server'
    }
]
// Needed for debugging
// eslint-disable-next-line
const mock_files = [
    {
        id: "sgasrgsdvfvv",
        file_name: "fake_file.mp4",
        file_path: "database/path/to/video/file/",
        timestamp: "timestamp",
        description: "something happened on this video"
    },
    {
        id: "asdfgae5rthyedarfg",
        file_name: "fake_file.mp4",
        file_path: "database/path/to/video/file/",
        timestamp: "timestamp",
        description: "something happened on this video"
    },
    {
        id: "asdgfahr5herh",
        file_name: "fake_file.mp4",
        file_path: "database/path/to/video/file/",
        timestamp: "timestamp",
        description: "something happened on this video"
    },
    {
        id: "gggggfgadsfgadg",
        file_name: "fake_file.mp4",
        file_path: "database/path/to/video/file/",
        timestamp: "timestamp",
        description: "something happened on this video"
    },
    {
        id: "sgasrgsdvaasdfgafvv",
        file_name: "fake_file.mp4",
        file_path: "database/path/to/video/file/",
        timestamp: "timestamp",
        description: "something happened on this video"
    },
    {
        id: "asry543aerhdfh",
        file_name: "fake_file.mp4",
        file_path: "database/path/to/video/file/",
        timestamp: "timestamp",
        description: "something happened on this video"
    },
    {
        id: "sgasrgsdfsdfsdvfvv",
        file_name: "fake_file.mp4",
        file_path: "database/path/to/video/file/",
        timestamp: "timestamp",
        description: "something happened on this video"
    },
    {
        id: "hhhhhdearhrrfhdf",
        file_name: "fake_file.mp4",
        file_path: "database/path/to/video/file/",
        timestamp: "timestamp",
        description: "something happened on this video"
    }
]

const StatusIcon = (props) => {
    const { status, type } = props
    let icons = {
        default: <Pending />,
        person: status === 'active' ? 
        <Badge badgeContent={<Announcement sx={{color: 'red'}} />}>
            <Person />
        </Badge> : <Badge badgeContent={<CheckCircle sx={{color: 'green'}} />}>
            <Person />
        </Badge>,
        camera: status === 'active' ? 
        <Badge badgeContent={<CheckCircle sx={{color: 'green'}} />}>
            <PhotoCamera />
        </Badge> : <Badge badgeContent={<Error sx={{color: 'red'}} />}>
            <PhotoCamera />
        </Badge>,
        socket: status === 'active' ? 
        <Badge badgeContent={<CheckCircle sx={{color: 'green'}} />}>
            <Power />
        </Badge> : <Badge badgeContent={<Error sx={{color: 'red'}} />}>
            <Power />
        </Badge>,
        server: status === 'active' ? 
            <Badge badgeContent={<CheckCircle sx={{color: 'green'}} />}>
                <Storage />
            </Badge> : <Badge badgeContent={<Error sx={{color: 'red'}} />}>
                <Storage />
            </Badge>,
    }
    return icons[type] ? icons[type] : icons.default;
}

const LogItem = props => {
    const { log } = props
    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="delete">
                    <MoreVert />
                </IconButton>
            }
        >
            <ListItemAvatar>
                <StatusIcon status={log.status} type={log.type} />
            </ListItemAvatar>
            <ListItemText
                primary={log.message}
                secondary={log.timestamp}
            />
        </ListItem>
    )
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
                <List sx={{maxHeight: 250, overflowY: 'scroll'}} dense={true}>
                    {
                        logs && logs.map(log => {
                            return (
                                <LogItem log={log} key={log.id} />
                            )
                        })
                    }
                </List>
            </AccordionDetails>
        </Accordion>
    )
}

const FileItem = props => {
    const { file } = props
    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="delete">
                    <MoreVert />
                </IconButton>
            }
        >
            <ListItemText
                primary={file.description}
                secondary={file.timestamp}
            />
        </ListItem>
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
                <List sx={{maxHeight: 250, overflowY: 'scroll'}} dense={true}>
                    {
                        files && files.map(file => {
                            return (
                                <FileItem file={file} key={file.id} />
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
    const [status, setStatus] = React.useState('Disconnected.');
    const [logs, setLogs] = React.useState(null);
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

    React.useEffect(() => {
        axios.get(process.env.REACT_APP_DATABASE_GET_URL)
        .then((response) => {return response.data})
        .then((json) => setLogs(json))
        .catch((error) => console.log(error));
    }, [])

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
        //   console.log('WebSocket error: ', event);
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
    
      const handleButtonClick = () => {
        if(!showVideo){
            setSocket(new WebSocket(process.env.REACT_APP_WEBSOCKET_URL))
            setVideoVisible(true)
        } else {
            setVideoVisible(false)
            disconnectSocket()
        }
    }

    // Needed for debugging
    // eslint-disable-next-line
    const fetchDatabase = async() => {
        let response = await axios.get(process.env.REACT_APP_DATABASE_GET_URL)
        response = response.data;
        console.log(response)
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            sx={{padding: '50px'}}
        >
            <Grid item xs={4}>
                {/* <Button fullWidth onClick={() => fetchDatabase()}>Database</Button> */}
                <Logs logs={logs} />
                <Files files={mock_files} />
            </Grid>
            <Grid item xs={8}>
                {
                    showVideo ? <VideoCard ref={canvasRef} status={status} /> : 
                    <Card>
                        <Typography variant="h5">{status}</Typography>
                        <CardContent sx={{textAlign: 'center', boxSizing: 'border-box'}}>
                            <canvas id="msg" height="250px" style={{display: "inline-block", backgroundImage: `url(${videoplacehoder})`}} /> 
                        </CardContent>
                        <CardActions >
                            <Button onClick={() => handleButtonClick()}>Connect</Button>
                        </CardActions>
                    </Card>
                }
            </Grid>
        </Grid>
    )
}

export default Dashboard