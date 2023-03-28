import React, {useState} from 'react';
import logo from './rub.png';
import './App.css'
import moment from "moment"
import TextField from '@mui/material/TextField';
import Counter from './counter/Counter.js'
import {Button, Grid, Typography} from "@mui/material";

function App() {

    const [startTime, setStartTime] = useState(null);
    const [perHour, setPerHour] = useState(null);

    return <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo_rub"/>
        </header>
        <div>
            <Typography variant="h4" component="h3">
                Today is {moment().format(`ddd DD.MM.YYYY`)}
            </Typography>
            <MainInput
                startTime={startTime}
                perHour={perHour}
                onSetClick={(newStartTime, newPerHour) => {
                    setStartTime(newStartTime);
                    setPerHour(newPerHour);
                }}
                onResetClick={() => {
                    setStartTime(null);
                    setPerHour(null);
                }}
            />
            <Counter startTime={startTime} perHour={perHour}/>
        </div>
    </div>;
}

function MainInput(props) {
    const [varStartTime, setVarStartTime] = useState(moment());
    const [varPerHour, setVarPerHour] = useState(1000);

    if (props.startTime != null && props.perHour != null) {
        return <Grid container style={{gap: 18}}>
            <Grid item xs={12}>
                <Typography variant="h5" component="h4">
                    You started working at {props.startTime.format(`HH:mm`)}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Button variant="outlined" onClick={() => props.onResetClick()}>
                    Reset
                </Button>
            </Grid>
        </Grid>
    } else {
        return <Grid container style={{gap: 18}}>
            <Grid item xs={12}>
                <Typography variant="h5" component="h4">
                    Start your work
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="rate"
                    label="Your ₽ rate per hour"
                    type="number"
                    defaultValue={varPerHour}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{width: 150}}
                    onChange={e => {
                        setVarPerHour(Number(e.target.value));
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="time"
                    label="Start time"
                    type="time"
                    defaultValue={varStartTime.format("HH:mm")}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 300,
                    }}
                    sx={{width: 150}}
                    onChange={e => {
                        setVarStartTime(moment().startOf('day').add(moment.duration(e.target.value)));
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="outlined" size="large" onClick={() => props.onSetClick(varStartTime, varPerHour)}>
                    WORK!
                </Button>
            </Grid>
        </Grid>
    }
}

export default App;
