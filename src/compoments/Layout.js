import { Outlet } from "react-router-dom"
import NavBar from "./navbar/NavBar";
import React from "react";

const Layout = () => {

    return (
        <main className="App">
            <div className="App-Canvas">
                <NavBar className="App-NavBar"/>
                <Outlet/>
            </div>
        </main>
    )
}

export default Layout
