import React from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import { mock_files } from '../data/mock_data';
import { Logs, Files, VideoCard} from '../components';

function Dashboard() {
    const [ logs, setLogs ] = React.useState(null);

    React.useEffect(() => {
        axios.get(process.env.REACT_APP_DATABASE_GET_URL)
        .then((response) => {return response.data})
        .then((json) => setLogs(json))
        .catch((error) => console.log(error));
    }, [])

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
                <Logs logs={logs} />
                <Files files={mock_files} />
            </Grid>
            <Grid item xs={8}>
                <VideoCard />
            </Grid>
        </Grid>
    )
}

export default Dashboard