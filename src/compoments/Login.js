import { useEffect, useRef, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { Typography } from "@mui/material";


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
            <Typography variant="h4" component="h5">
                Sign In
            </Typography>
            <form onSubmit={ handleSubmit }>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={ userRef }
                    autoComplete="off"
                    onChange={ (e) => setUsername(e.target.value) }
                    value={ username }
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={ (e) => setPassword(e.target.value) }
                    value={ password }
                    required
                />
                <button>Sign In</button>
            </form>
            <p>
                Need an Account?<br/>
                <span className="line">
                    <Link to="/register">Sign Up</Link>
                </span>
            </p>
        </div>

    )
}

export default Login
