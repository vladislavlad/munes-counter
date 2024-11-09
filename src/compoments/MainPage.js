import React, { useState } from 'react';
import logo from '../img/rub.png';
import '../App.css'
import moment from "moment"
import TextField from '@mui/material/TextField';
import Counter from './Counter.js'
import { Button, Container, Grid, MenuItem, Select, Typography } from "@mui/material";
import { Currency } from "./Currency";

function MainPage() {

    const [startTime, setStartTime] = useState(null);
    const [perHour, setPerHour] = useState(null);
    const [currency, setCurrency] = useState(() => Currency.RUB);

    return (
        <Container maxWidth="xs">
            <Grid container spacing={ 2 } className={ "App-Content" }>
                <Grid item xs={ 12 }>
                    <img src={ logo } className="App-logo" alt="logo_rub"/>
                </Grid>

                <Grid item xs={ 12 }>
                    <Typography variant="h5" component="h5">
                        Today is { moment().format(`ddd DD.MM.YYYY`) }
                    </Typography>
                </Grid>

                <Grid item xs={ 12 }>
                    <MainInput
                        startTime={ startTime }
                        perHour={ perHour }
                        onSetClick={ (newStartTime, newPerHour) => {
                            setStartTime(newStartTime);
                            setPerHour(newPerHour);
                        } }
                        onResetClick={ () => {
                            setStartTime(null);
                            setPerHour(null);
                        } }
                        currency={ currency }
                        setCurrency={ setCurrency }
                    />
                </Grid>

                <Grid item xs={ 12 }>
                    <Counter startTime={ startTime } perHour={ perHour } currency={ currency }/>
                </Grid>
            </Grid>
        </Container>
    );
}

function MainInput(props) {
    const [varStartTime, setVarStartTime] = useState(moment());
    const [varPerHour, setVarPerHour] = useState(1000);

    if (props.startTime != null && props.perHour != null) {
        return <Container maxWidth="xs">
            <Grid container spacing={ 2 }>

                <Grid item xs={ 12 }>
                    <Typography variant="h5" component="h5">
                        You started working in { props.startTime.format(`HH:mm`) }
                    </Typography>
                </Grid>

                <Grid item xs={ 12 }>
                    <Button variant="outlined" fullWidth onClick={ () => props.onResetClick() }>
                        Reset
                    </Button>
                </Grid>

            </Grid>
        </Container>
    } else {
        return <Container maxWidth="xs">
            <Grid container rowSpacing={ 2 } columnSpacing={ 2 }>

                <Grid item xs={ 12 }>
                    <Typography variant="h5" component="h4">
                        Start your work
                    </Typography>
                </Grid>

                <Grid item xs={ 8 }>
                    <TextField
                        id="rate"
                        label={ "Your rate per hour" }
                        type="number"
                        defaultValue={ varPerHour }
                        InputLabelProps={ {
                            shrink: true,
                        } }
                        fullWidth
                        onChange={ e => {
                            setVarPerHour(Number(e.target.value));
                        } }
                    />
                </Grid>
                <Grid item xs={ 4 }>
                    <Select
                        size="medium"
                        id="change-currency"
                        value={ props.currency }
                        fullWidth
                        onChange={ e => props.setCurrency(e.target.value) }
                    >
                        <MenuItem value={ Currency.RUB }>RUB</MenuItem>
                        <MenuItem value={ Currency.USD }>USD</MenuItem>
                        <MenuItem value={ Currency.EUR }>EUR</MenuItem>
                    </Select>
                </Grid>

                <Grid item xs={ 12 }>
                    <TextField
                        id="time"
                        label="Start time"
                        type="time"
                        defaultValue={ varStartTime.format("HH:mm") }
                        InputLabelProps={ {
                            shrink: true,
                        } }
                        inputProps={ {
                            step: 300,
                        } }
                        fullWidth
                        onChange={ e => {
                            setVarStartTime(moment().startOf('day').add(moment.duration(e.target.value)));
                        } }
                    />
                </Grid>

                <Grid item xs={ 12 }>
                    <Button
                        variant="outlined"
                        size="large"
                        type="submit"
                        fullWidth
                        onClick={ () => props.onSetClick(varStartTime, varPerHour) }
                    >
                        WORK!
                    </Button>
                </Grid>
            </Grid>
        </Container>
    }
}

export default MainPage;
