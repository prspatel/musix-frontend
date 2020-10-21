import React from "react";
import { Link } from "react-router-dom";

export default function Footer(){
    return (
        <>
            <div className="footer">
                <ul style={{ display: "inline" }}>
                    <li>
                        <Link to="/" className = "footerlink" >Home</Link>
                    </li>
                    <li>
                        <Link to="#" className="footerlink" >About Us</Link>
                    </li>
                    <li>
                        <Link to="#" className="footerlink" >Contact Us</Link>
                    </li>
                </ul>
                <span style={{ float: "right", display: "inline"}}>Copyright 2020. Radiant Developers </span>
            </div>

        </>
    )
 }
    

