import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";
import logo from "../../images/logo2.png";


export default function Nav1() {
    const history = useHistory();
    const login = () => history.push("/login");

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home" style={{ marginLeft: "1.5%" }}>
                    <img
                        src= { logo }
                        height="40"
                        className="d-inline-block align-top"
                        alt="Musix logo"
                        
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                       
                    </Nav>
                    <Button className="rounded-pill" onClick={login} style={{ margin: "0 2% 0 0", padding: "7px 25px 5px 25px" }} variant="info"> <h6> Login </h6></Button>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}