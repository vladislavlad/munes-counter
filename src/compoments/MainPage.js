import React, { useState } from 'react';
import logo from '../img/rub.png';
import '../App.css'
import moment from "moment"
import TextField from '@mui/material/TextField';
import Counter from './Counter.js'
import { Button, Grid, MenuItem, Select, Typography } from "@mui/material";
import { Currency } from "./Currency";

function MainPage() {

    const [startTime, setStartTime] = useState(null);
    const [perHour, setPerHour] = useState(null);
    const [currency, setCurrency] = useState(() => Currency.RUB);

    return (
        <div>
            <div className={ "App-Content" }>
                <img src={ logo } className="App-logo" alt="logo_rub"/>
                <Typography variant="h5" component="h5">
                    Today is { moment().format(`ddd DD.MM.YYYY`) }
                </Typography>
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
                />
                <br/>
                <Counter startTime={ startTime } perHour={ perHour } currency={ currency }/>
                <div className="Bottom-Buttons">
                    <Select
                        size="small"
                        id="change-currency"
                        value={ currency }
                        label={ "Change currency" }
                        sx={ { width: 100 } }
                        onChange={ e => setCurrency(e.target.value) }
                    >
                        <MenuItem value={ Currency.RUB }>RUB</MenuItem>
                        <MenuItem value={ Currency.USD }>USD</MenuItem>
                        <MenuItem value={ Currency.EUR }>EUR</MenuItem>
                    </Select>
                </div>
            </div>
        </div>
    );
}

function MainInput(props) {
    const [varStartTime, setVarStartTime] = useState(moment());
    const [varPerHour, setVarPerHour] = useState(1000);

    if (props.startTime != null && props.perHour != null) {
        return <Grid container style={ { gap: 18 } }>
            <Grid item xs={ 12 }>
                <Typography variant="h5" component="h5">
                    You started working in { props.startTime.format(`HH:mm`) }
                </Typography>
            </Grid>
            <Grid item xs={ 12 }>
                <Button variant="outlined" sx={ { width: 300 } } onClick={ () => props.onResetClick() }>
                    Reset
                </Button>
            </Grid>
        </Grid>
    } else {
        return <Grid container style={ { gap: 18 } }>
            <Grid item xs={ 12 }>
                <Typography variant="h5" component="h4">
                    Start your work
                </Typography>
            </Grid>
            <Grid item xs={ 12 }>
                <TextField
                    id="rate"
                    label={ "Your " + props.currency.symbol + " rate per hour" }
                    type="number"
                    defaultValue={ varPerHour }
                    InputLabelProps={ {
                        shrink: true,
                    } }
                    sx={ { width: 300 } }
                    onChange={ e => {
                        setVarPerHour(Number(e.target.value));
                    } }
                />
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
                    sx={ { width: 300 } }
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
                    sx={ { width: 300 } }
                    onClick={ () => props.onSetClick(varStartTime, varPerHour) }
                >
                    WORK!
                </Button>
            </Grid>
        </Grid>
    }
}

export default MainPage;
