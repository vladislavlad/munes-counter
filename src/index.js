import React from 'react';
import { createRoot } from "react-dom/client"
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from "./context/AuthProvider";

const theme = createTheme({
    palette: {
        primary: {
            main: "#11BB88"
        }
    },
});

createRoot(
    document.getElementById('root')
).render(
    <React.Fragment>
        <BrowserRouter>
            <ThemeProvider theme={ theme }>
                <AuthProvider>
                    <Routes>
                        <Route path="/*" element={ <App/> }/>
                    </Routes>
                </AuthProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.Fragment>
);
