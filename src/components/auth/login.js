import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../misc/userContext";
import Axios from "axios";
import ErrorNotice from "../misc/error";
import logo from '../../images/logo2.png';


import "../../CSS/auth/login.css"
 

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try {
            console.log(email);
            console.log(password);
            const loginUser = { email, password };
            const loginRes = await Axios.post(
                "http://localhost:5000/users/login",
                loginUser
            );
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/");
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };
    return (
        <section id = "section">
            <form className="box" onSubmit={submit}>
                <img className="logo" src={logo} alt="logo" /> 
                <hr class="solid"/>
                <h2>Login</h2>
                {error && (
                    <ErrorNotice message={error} clearError={() => setError(undefined)} />
                )}
            
                <input
                    id="login-email"
                    type="email"
                    placeholder="email address"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    id="login-password"
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input type="submit" value="Log in" />
                <hr class="solid" />
                <a href="/register">Create an account? </a>
            </form>
        </section>
    );
}