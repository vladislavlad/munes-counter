import React from 'react';
import { createRoot } from "react-dom/client"
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from 'react-router-dom';
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
        <ThemeProvider theme={ theme }>
            <BrowserRouter>
                <AuthProvider>
                    <App/>
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    </React.Fragment>
);
