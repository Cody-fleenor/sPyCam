import React from 'react';
import { Card, CardContent, CardActions } from '@mui/material';
import { Link } from "react-router-dom";
function Login() {
  return (
    <Card>
        <CardContent>
            Login Page
        </CardContent>
        <CardActions>
            <Link to="/dashboard">Dashboard</Link>
        </CardActions>
    </Card>
  )
}

export default Login