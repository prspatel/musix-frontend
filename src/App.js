import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import Home from './components/pages/home';
import Login from './components/auth/login';
import Register from './components/auth/register';
import UserContext from "./components/misc/userContext";

import "./style.css";


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
    return (
        <>

            <BrowserRouter>
                <UserContext.Provider value={{ userData, setUserData }}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                    </Switch>
                </UserContext.Provider>
            </BrowserRouter>
        </>
    );
}