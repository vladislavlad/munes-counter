import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import AccountMenu from "./AccountMenu";
import HomeIcon from '@mui/icons-material/Home';
import React from "react";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

export default function NavBar() {

    const navigate = useNavigate();

    function handleHome() {
        navigate('/');
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Grid container justifyContent="flex-start" alignItems="center">

                    <IconButton onClick={ handleHome }>
                        <HomeIcon fontSize={ "large" }/>
                    </IconButton>
                    <Typography variant="h5" component="div">
                        Munes Counter
                    </Typography>

                    <Grid item xs/>
                    <AccountMenu/>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
