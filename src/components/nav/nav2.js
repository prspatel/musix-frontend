import  React, { useContext } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";
import logo from "../../images/logo2.png";
import UserContext from "../misc/userContext";


export default function Nav1() {
    const history = useHistory();
    const { setUserData } = useContext(UserContext);

    const aboutUs = () => history.push('/aboutUs');
    const contactUs = () => history.push('/contactUs');

    //implement the logout function. Clear token and stuff.
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined,
        });
        localStorage.setItem("auth-token", "");
        history.push("/")
    };

    return (
        <>

            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/" style={{ marginLeft: "1.5%" }}>
                    <img
                        src={logo}
                        height="40"
                        className="d-inline-block align-top"
                        alt="Musix logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link style={{ margin:"0 15px 0 15px" }} href="/"><h6>Home</h6></Nav.Link>
                        <Nav.Link style={{ margin: "0 15px 0 15px" }} onClick ={aboutUs} className="navlink" href="#"><h6>About Us</h6></Nav.Link>
                        <Nav.Link style={{ margin: "0 15px 0 15px" }} onClick ={contactUs} className="navlink" href="#"><h6>Contact Us</h6></Nav.Link> 
                    </Nav>
                    
                    <Button className="rounded-pill" onClick={logout} style={{ margin: "0 2% 0 2%", padding: "7px 25px 5px 25px" }} variant="info"> <h6> Logout </h6></Button>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}