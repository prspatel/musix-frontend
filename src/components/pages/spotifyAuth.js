import React from 'react'
import { SpotifyApiContext } from 'react-spotify-api'
import Cookies from 'js-cookie'
import UsrDash from "../pages/usrdash";
import "../../CSS/pages/spotifyAuth.css"
import { SpotifyAuth } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css'
import logo from '../../images/logo2.png';

const spotifyAuth = (props) => {
    const token = Cookies.get('spotifyAuthToken');
    const prevPath = localStorage.getItem('prevPath');
    const content = "2; URL=https://musix-front.herokuapp.com" + prevPath
    return (
        <div className='app'>
            {token ? (
                <SpotifyApiContext.Provider value={token}>
                    <head>
                        <meta http-equiv="refresh" content={content} />
                    </head>
                    <body>
                        <p>If you are not redirected in 2 seconds, <a href={"https://musix-front.herokuapp.com" + prevPath}>click here</a>.</p>
                    </body>
                </SpotifyApiContext.Provider>
            ) : (
                    // Display the login page
                    <>
                        <div id="authpage-body">
                            <div id="auth-container">
                                <img className="logo" src={logo} alt="logo" />
                                <hr className="solid" />
                                <h3 style={{ marginBottom:"4%" }}>Login with Spotify below....</h3>
                                <SpotifyAuth
                                    redirectUri='https://musix-front.herokuapp.com/callback'
                                    clientID='6beaf72bdb304360abce3b366958de2d'
                                    scopes={['user-read-private', 'user-read-email', 'streaming', 'user-read-playback-state', 'user-modify-playback-state']} // either style will work
                                />
                           </div>
                        </div>
                    </>
                )}
        </div>
    )
}
export default spotifyAuth 

 