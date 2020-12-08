import React from "react";
import Nav1 from "../nav/nav1";

import Footer from "../nav/footer";
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";
import Background from '../../images/banner.jpg';
import cover1 from '../../images/homealbum1.jpg';
import cover2 from '../../images/homealbum2.jpg';
import cover3 from '../../images/homealbum3.jpg';
import cover4 from '../../images/homealbum4.png';

import "../../CSS/pages/home.css"


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
            <div className="home-body">
                <section style={backgroundStyle }>
                    <h1 className="slogan"> Play the moment. </h1> 
                    <Button className="rounded-pill" onClick={register} variant="info" style={{ background: "#5ab9ea", margin: "0 0 0 5%", padding: "7px 30px 5px 30px" }}> <h5>Create a free account</h5> </Button>
                    <p style={{ margin: "0 0 0 6%", color: "#696969", fontStyle: "italic" }}>Click above and register with us!  </p>
                </section >
                <div id="dummy-albums">
                    <img className="cover-images" src={ cover1 } alt="cover1"/>
                    <img className="cover-images" src={ cover2 } alt="cover2"/>
                    <img className="cover-images" src={cover3} alt="cover3" />
                    <img className="cover-images" src={cover4} alt="cover3" />

                </div>
            </div>
            <Footer/>
        </>   
    ); 
}