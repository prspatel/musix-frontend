import React from "react";
import Nav1 from "../nav/nav1";
import { Link } from "react-router-dom";


export default function Home() {
    return (
        <>
            <Nav1/>
            <div>Home</div> 
            <Link to="/login">Log in</Link>
        </>   
    ); 
}