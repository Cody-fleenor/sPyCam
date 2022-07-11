import React from 'react'
import {Typography, List, ListItem, ListItemText, Accordion, AccordionSummary, AccordionDetails, IconButton } from '@mui/material'
import { ExpandMore, MoreVert  } from '@mui/icons-material';

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

export default Files