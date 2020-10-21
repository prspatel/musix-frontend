import React from "react";
import Nav1 from "../nav/nav1";
import Footer from "../nav/footer";
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";

import Background from '../../images/banner.jpg';

var backgroundStyle = {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    height: "500px"
};

export default function Home() {
    const history = useHistory();
    const register = () => history.push("/register");
    return (
        <>
            <Nav1 />
            <section style={backgroundStyle }>
            <h1 className="slogan"> Play the moment. </h1> 
            <Button onClick={register} variant="info" style = {{ margin: "2% 0 0 5%" }}> Register </Button>
            </section >
            <Footer/>
        </>   
    ); 
}