import React from "react";
import { Link } from "react-router-dom";
import "../../CSS/nav/footer.css"

export default function Footer(){
    return (
        <>
            <div className="footer">
                <ul style={{ display: "inline" }}>
                    <li>
                        <Link to="/" className = "footerlink" >HOME</Link>
                    </li>
                    <li>
                        <Link to="#" className="footerlink" >ABOUT US</Link>
                    </li>
                    <li>
                        <Link to="#" className="footerlink" >CONTACT US</Link>
                    </li>
                </ul>
                <span style={{ float: "right", display: "inline", fontFamily: "Roboto , sans-serif"}}>Copyright 2020. Radiant Developers. </span>
            </div>

        </>
    )
 }
    

