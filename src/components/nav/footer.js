import React, { useContext }  from "react";
import { Link } from "react-router-dom";
import "../../CSS/nav/footer.css"
import UserContext from "../misc/userContext";

export default function Footer() {
    const { userData } = useContext(UserContext);

    return (
        <>
            <div className="footer">
                {userData.user ? (
                    <span style={{ width: "30%", margin: "0 auto", display: "block", fontFamily: "Roboto , sans-serif", textAlign:"center" }}>Copyright 2020. Radiant Developers. </span>
                ) : (
                        <>
                            <ul style={{ display: "inline" }}>
                                <li>
                                    <Link to="/" className="footerlink" >HOME</Link>
                                </li>
                                <li>
                                    <Link to="#" className="footerlink" >ABOUT US</Link>
                                </li>
                                <li>
                                    <Link to="#" className="footerlink" >CONTACT US</Link>
                                </li>
                            </ul>
                            <span style={{ float: "right", display: "inline", fontFamily: "Roboto , sans-serif" }}>Copyright 2020. Radiant Developers. </span>
                        </>
                    )}
   
                
               
            </div>

        </>
    )
 }
    

