import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import AccountMenu from "./AccountMenu";
import React from "react";

export const NavBar = () => (
    <AppBar position="static">
        <Toolbar>
            <Grid container justifyContent="flex-start" alignItems="center">
                <Typography variant="h5" component="div">
                    Munes Counter
                </Typography>

                <Grid item xs/>
                <AccountMenu/>
            </Grid>
        </Toolbar>
    </AppBar>
)
