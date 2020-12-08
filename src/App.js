import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import Home from './components/pages/home';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Playlist from './components/pages/playlist';
import User from './components/pages/user';
import UserContext from "./components/misc/userContext";
import "./style.css";
import collexDash from "./components/collex/collexDash";
import collexPage from "./components/collex/collexPage";
import UsrDash from "./components/pages/usrdash";
import CreatePlaylist from './components/pages/createPlaylist';
import AboutUs from './components/pages/aboutUs';
import ContactUs from './components/pages/contactUs';
import EditPlaylist from './components/pages/editPlaylist';
import viewAll from "./components/pages/viewAll";
import spotifyAuth from "./components/pages/spotifyAuth";

    

export default function App() {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    });

    //checking auth token in local storage
    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem("auth-token");
            if (token === null) {
                localStorage.setItem("auth-token", "");
                token = "";
            }
            const tokenRes = await Axios.post(
                "http://localhost:5000/users/tokenIsValid",
                null,
                { headers: { "x-auth-token": token } }
            );
            if (tokenRes.data) {
                const userRes = await Axios.get("http://localhost:5000/users/", {
                    headers: { "x-auth-token": token },
                });
                setUserData({
                    token,
                    user: userRes.data,
                });
            }
        };

        checkLoggedIn();
    }, []);
/* Need to figure out the protected path*/
    return (
        <>
            <BrowserRouter>
                <UserContext.Provider value={{ userData, setUserData }}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/aboutUs" component={AboutUs} />
                        <Route path="/contactUs" component={ContactUs} />
                        <Route path="/usrDash" component={userData.user ? UsrDash : Login} />
                        <Route path="/user/:userId" component={User}/>
                        <Route exact path="/collexDash" component={ userData.user ? collexDash :  Login }  />
                        <Route path="/collex/:collexId" component={userData.user ? collexPage : Login} />
                        <Route path="/playlist/:playlistId" component={userData.user ? Playlist : Login} />
                        <Route path="/likedPlaylists/viewAll" component={userData.user ? viewAll : Login} /> 
                        <Route path="/allPlaylists/viewAll" component={userData.user ? viewAll : Login} /> 
                        <Route path="/likedCollex/viewAll" component={userData.user ? viewAll : Login} /> 
                        <Route path="/allCollex/viewAll" component={userData.user ? viewAll : Login} />
                        <Route path="/callback" component={spotifyAuth} /> 

                        <Route path="/editPlaylist/:playlistID" component={userData.user ? EditPlaylist : Login} />
                        <Route path="/forkPlaylist/:playlistID" component={userData.user ? EditPlaylist : Login} />
                        <Route path="/createPlaylist" component={CreatePlaylist} />

                    </Switch>
                </UserContext.Provider> 
            </BrowserRouter>
        </>
    );
}