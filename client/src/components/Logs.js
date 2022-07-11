import React from 'react'
import { Typography, List, ListItem, ListItemText, ListItemAvatar, Accordion, AccordionSummary, AccordionDetails, IconButton } from '@mui/material'
import { ExpandMore, MoreVert  } from '@mui/icons-material';
import StatusIcon from './StatusIcon'

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

export default Logs 