import {AppBar, Toolbar, IconButton, Typography, Grid} from "@mui/material";
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import AccountMenu from "./AccountMenu";
import React from "react";

export const NavBar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Grid container justifyContent="flex-start" alignItems="center">
                    <IconButton>
                        <AccessibilityNewIcon/>
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
