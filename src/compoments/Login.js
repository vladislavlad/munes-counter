import React, { useEffect, useRef, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { Button, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";


const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                '/authentication',
                { username: username, password: password },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            setAuth({ username: username, accessToken: response?.data?.accessToken });
            localStorage.setItem('refreshToken', response?.data?.refreshToken);

            setUsername('');
            setPassword('');

            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (

        <div>
            <p ref={ errRef } className={ errMsg ? "errmsg" : "offscreen" } aria-live="assertive">{ errMsg }</p>
            <Grid container style={ { gap: 18 } }>
                <Grid item xs={ 12 }>
                    <Typography variant="h4" component="h5">
                        Sign In
                    </Typography>
                </Grid>
                <Grid item xs={ 12 }>
                    <TextField
                        id="username"
                        label={ "Username" }
                        type="text"
                        required
                        autoComplete="off"
                        ref={ userRef }
                        value={ username }
                        onChange={ e => {
                            setUsername(e.target.value);
                        } }
                        sx={ { width: 300 } }
                    />
                </Grid>
                <Grid item xs={ 12 }>
                    <TextField
                        id="password"
                        label={ "Password" }
                        type="password"
                        required
                        value={ password }
                        onChange={ e => {
                            setPassword(e.target.value);
                        } }
                        sx={ { width: 300 } }
                    />
                </Grid>
                <Grid item xs={ 12 }>
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={ handleSubmit }
                        sx={ { width: 300 } }
                    >
                        Sign In
                    </Button>
                </Grid>
            </Grid>
            <div>
                <br/>
                Need an Account?<br/>
                <Link to="/register">Sign Up</Link>
            </div>
        </div>

    )
}

export default Login
