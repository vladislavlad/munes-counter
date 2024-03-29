import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthProvider";

const theme = createTheme({
    palette: {
        primary: {
            main: "#11BB88"
        }
    },
});

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <ThemeProvider theme={ theme }>
                    <Routes>
                        <Route path="/*" element={ <App/> }/>
                    </Routes>
                </ThemeProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
