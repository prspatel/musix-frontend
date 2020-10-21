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
                <Navbar.Brand href="#home">
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
                    <Button onClick={login} variant="info">Login</Button>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}