import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css'
import moment from "moment"
import TextField from '@mui/material/TextField';
import Counter from './counter/Counter.js'
import {Button, Grid, Typography} from "@mui/material";


function App() {

    const [startTime, setStartTime] = useState(moment());
    // TODO perSecond field
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <Typography variant="h3" component="h3">
                    Today is {moment().format(`ddd DD.MM.YYYY`)}
                </Typography>
                <InputTime startTime={startTime} onClick={newVal => setStartTime(newVal)}/>
                <Counter startTime={startTime} perSecond={0.640}/>
            </header>
        </div>
    );
}

function InputTime(props) {
    const [varStartTime, setVerStartTime] = useState(moment());

    if (props.startTime != null) {
        return (
            <Grid container style={{gap: 18}}>
                <Grid item xs={12}>
                    <Typography variant="h4" component="h4">
                        You started working at {props.startTime.format(`HH:mm`)}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="outlined" onClick={() => props.onClick(null)}>Reset</Button>
                </Grid>
            </Grid>
        )
    } else {
        return (
            <Grid container style={{gap: 18}}>
                <Grid item xs={12}>
                    <Typography variant="h4" component="h4">
                        When did you start working?
                    </Typography>
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
                            step: 300, // 5 min
                        }}
                        sx={{width: 150}}
                        onChange={e => {
                            setVerStartTime(moment().startOf('day').add(moment.duration(e.target.value)));
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="outlined" onClick={() => props.onClick(varStartTime)}>Set</Button>
                </Grid>
            </Grid>
        )
    }
}

export default App;
