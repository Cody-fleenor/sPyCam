import React from 'react'
import { Tooltip, Menu, MenuItem, Typography, List, ListItem, ListItemText, ListItemIcon, Accordion, AccordionSummary, AccordionDetails, IconButton } from '@mui/material'
import { ExpandMore, MoreVert, PlayArrow, CloudDownload  } from '@mui/icons-material';

const FileItem = props => {
    const { file } = props
    const [ anchorEl, setAnchorEl ] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
        <ListItem
            secondaryAction={
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={(e) => handleClick(e)}
                        edge="end" aria-label="delete"
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <MoreVert />
                    </IconButton>
                </Tooltip>
            }
        >
            <ListItemText
                primary={file.message}
                secondary={file.timestamp}
            />
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
            <ListItemIcon>
                <PlayArrow fontSize="small" />
            </ListItemIcon>
            Watch
        </MenuItem>
        <MenuItem>
            <ListItemIcon>
                <CloudDownload fontSize="small" />
            </ListItemIcon>
            Download
        </MenuItem>
    </Menu>
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
                        files && files.filter(file => file.type === 'person' && file.status === 'active').map(file => {
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