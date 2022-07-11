import React from 'react'
import { Badge } from '@mui/material'
import { Error, CheckCircle, Pending, Person, Storage, Power, PhotoCamera, Announcement  } from '@mui/icons-material';

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

export default StatusIcon