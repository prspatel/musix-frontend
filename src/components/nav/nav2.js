import  React, { useContext, useState } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";
import logo from "../../images/logo2.png";
import UserContext from "../misc/userContext";
import { FaUserCircle } from "react-icons/fa";
import { Search } from "semantic-ui-react";
import Axios from "axios";
import { SearchFunction } from "../misc/search";
import Cookies from 'js-cookie'

export default function Nav1() {
    const history = useHistory();
    const { userData, setUserData } = useContext(UserContext);

    const aboutUs = () => history.push('/aboutUs');
    const contactUs = () => history.push('/contactUs');
    const usrDash = () => history.push('/usrDash');
    const userPage = () => history.push(`/user/${userData.user.id}`);


    const [ searchState, setSearchState ] = useState({
        isLoading: false,
        results: [],
        value: ''
    })
    //implement the logout function. Clear token and stuff.
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined,
        });
          Cookies.remove('spotifyAuthToken');
        localStorage.setItem("auth-token", "");
        history.push("/")
    };

    let searchHandler = async e => {
        if (e.target.value)
            search(e.target.value);
        setSearchState({ value: e.target.value });
    };



    let search = async val => {
        setSearchState({ isLoading: true });
        const res = await SearchFunction(
            `/api/users/search/${val}`
        );
        if (res) {
            const playlists = res.playlists;
            const playlistsResult = playlists.map((item) => {
                return {
                    "title": item.name,
                    "description": item.description,
                    "type": "playlist",
                    "key": item._id
                }
            })
            const users = res.users;
            const usersResult = users.map((item) => {
                return {
                    "title": item.fname + " " + item.lname,
                    "description": item.email,
                    "type": "user",
                    "key": item._id
                }
            })
            const collexs = res.collexs;
            const collexResult = collexs.map((item) => {
                return {
                    "title": item.name,
                    "description": item.description,
                    "type": "collex",
                    "key": item._id
                }
            })
            const result = {
                "Playlists": {
                    name: "Playlists",
                    results: playlistsResult
                },    
                 "Users": {
                    name: "Users",
                    results: usersResult
                },
                "Collex": {
                    name: "Collex",
                    results: collexResult
                }    
            }
            console.log(result)
            setSearchState({ results: result, isLoading: false });
        }
    };


    const handleResultSelect = (e, { result }) => {
        if (result.type === "user") {
            history.push(`/user/${result.key}`);
            window.location.reload(false);
        }
        else if (result.type === "playlist") {
            history.push(`/playlist/${result.key}`)
            window.location.reload(false);
        }
        else {
            history.push(`/collex/${result.key}`)
            window.location.reload(false);
        }
    }


    return (
        <>

            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/usrDash" style={{ marginLeft: "1.5%" }}>
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
                        <Search
                            category
                            placeholder="User, playlists & Collex"
                            loading={searchState.isLoading}
                            onSearchChange={e => searchHandler(e)}
                            onResultSelect={handleResultSelect}
                            results={searchState.results}
                            value={searchState.value}
                            style={{marginTop:"0.6%"}}
                        />
                        <Nav.Link style={{ margin: "2px 15px 0 15px" }} onClick={usrDash}><h6>Home</h6></Nav.Link>
                        <Nav.Link style={{ margin: "2px 15px 0 15px" }} onClick ={aboutUs} className="navlink" href="#"><h6>About Us</h6></Nav.Link>
                        <Nav.Link style={{ margin: "2px 15px 0 15px" }} onClick={contactUs} className="navlink" href="#"><h6>Contact Us</h6></Nav.Link>
                        <Nav.Link style={{ margin: "0.6% 15px 0.6% 15px" }} title="User Info" onClick={userPage}><FaUserCircle size={24} /></Nav.Link>
                    </Nav>
                    
                    <Button className="rounded-pill" onClick={logout} style={{ margin: "0.6% 2% 0.6% 2%", padding: "7px 25px 5px 25px" }} variant="info"> <h6> Logout </h6></Button>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}