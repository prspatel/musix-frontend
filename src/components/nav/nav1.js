import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";



export default function Nav1() {
    const history = useHistory();
    const register = () => history.push("/register");

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">
                    <img
                        src="/logo2.png"
                        height="40"
                        className="d-inline-block align-top"
                        alt="Musix logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                       
                    </Nav>
                    <Button onClick={register} variant="info">Register</Button>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}