import { Outlet } from "react-router-dom"
import NavBar from "./navbar/NavBar";
import React from "react";

export default function Layout() {
    return (
        <main className="App">
            <div className="App-Canvas">
                <NavBar className="App-NavBar"/>
                <Outlet/>
            </div>
        </main>
    )
}
