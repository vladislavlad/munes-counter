import { Outlet } from "react-router-dom"
import NavBar from "./navbar/NavBar";
import React from "react";
import ParticlesFooter from "./footer/ParticlesFooter";

const Layout = () => {

    return (
        <main className="App">
            <div className="App-Canvas">
                <NavBar className="App-NavBar"/>
                <Outlet/>
                <ParticlesFooter/>
            </div>
        </main>
    )
}

export default Layout
