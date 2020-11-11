import React, { useEffect, useState } from "react";
import Nav from "../nav/nav2";
import Footer from "../nav/footer";
import { useParams } from "react-router-dom";
import axios from "axios";

import ReactJkMusicPlayer from 'react-jinke-music-player'
import "../../CSS/pages/index.css"

import { ReactComponent as PlayIcon } from '../../images/play.svg'
import { ReactComponent as NoteIcon } from '../../images/note.svg';
import { ReactComponent as HeartIcon } from '../../images/heart.svg';

import { ReactComponent as ForkIcon } from '../../images/fork.svg';
import { ReactComponent as EditIcon } from '../../images/edit.svg';

import "../../CSS/pages/playlist.scss"

export default function Playlist() {

    const [playlist, setPlaylist] = useState();
    let parameters = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const playlistId = parameters.playlistId;
            const result = await axios.get(
                `http://localhost:5000/playlist/${playlistId}`
            );
            setPlaylist(result.data);
        };

        fetchData();
    }, []);
    return (
        <>
            <Nav />
            {playlist ?
                <>
                    <div className="playlistPage">
                        <div className="mainInner">
                            <div className="playlistPageInfo">
                                <div className="playlistPageImage">
                                    <img
                                        src={ playlist.cover }
                                        alt="pic"
                                    />
                                </div>
                                <div className="playlistPageContent" >
                                    <p className="largeText uppercase bold">Playlist</p>
                                    <h1>{ playlist.name }</h1>

                                    <p className="tagline">
                                        Minimalism, electronica and modern classical to concentrate to.
                                    </p>
                                    <div className="playlistPageDesc">
                                        <span>{ playlist.likes} likes</span>
                                        <span>4hr 35 min</span>
                                    </div>
                                </div>
                            </div>
                            <div className="playlistPageSongs">
                                <div className="playlistButtons">
                                    <span className="playIcon">
                                        <PlayIcon />
                                    </span>
                                    <div className="icons">
                                        <div className="icon iconsHeart">
                                            <HeartIcon />
                                        </div>
                                        <div className="icon iconsEdit">
                                            <EditIcon />
                                        </div>
                                        <div className="icon iconsFork">
                                            <ForkIcon />
                                        </div>
                                        <div className="icon iconsDots"></div>
                                    </div>
                                </div>

                                <ul className="songList">
                                    {
                                        playlist.songs.map(track => (
                                            <li key={ track._id}>
                                                <div className="songIcon">
                                                    <NoteIcon className="noteI" />
                                                    <PlayIcon className="playI" />
                                                </div>
                                                <div className="songDetails">
                                                    <h3>{ track.name }</h3>
                                                    <span>by { track.artists.join(", ")}</span>
                                                </div>
                                                <div className="songTime">
                                                    <span>4:07</span>
                                                </div>
                                            </li>  
                                        ))
                                    }                                 
                                </ul>
                            </div>
                        </div>
                        <ReactJkMusicPlayer background-color="white" theme="light" />,
                    </div>
                </>

                :<></>}
            <Footer />
        </>
    )

}