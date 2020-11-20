import React, { useState, useContext, useEffect } from "react";
import "../../CSS/pages/createPlaylist.css"
import {ListGroup } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

import { AiOutlineCloseCircle } from "react-icons/ai"
import Nav from "../nav/nav2";
import Button from 'react-bootstrap/Button';
import Footer from "../nav/footer";
import { Search } from "../misc/search";
import { GrAddCircle } from "react-icons/gr";
import UserContext from "../misc/userContext";
import ErrorNotice from "../misc/error";
import Axios from "axios";
import { AiFillPlayCircle } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditPlaylist() {

    const [searchResults, setResults] = useState({
        tracks: null,
        loading: false,
        value:""
    });

    const [data, setData] = useState();
    const [error, setError] = useState();
    const [cover, setCover] = useState();
    const history = useHistory();
    const [addedTracks, addTracks] = useState([]);
    const [playlistName, setName] = useState();
    const [isPublic, setPublic] = useState(true);
    const { userData, setUserData } = useContext(UserContext);
    const [playlistDesc, setDesc] = useState();

    let parameters = useParams();
    let isFork = window.location.pathname.startsWith("/forkPlaylist");

    useEffect(() => {

        const fetchData = async () => {
            const playlistId = parameters.playlistID;
            const result = await Axios.get(
                `http://localhost:5000/playlist/${playlistId}`               
            );
            console.log(result.data);
            setData(result.data);
            addTracks(result.data.songs);
            setPublic(result.data.public);
            setName(result.data.name);
            setDesc(result.data.description);
            setCover(result.data.cover);
        };
        fetchData();
    }, []);

    let searchHandler = async e => {
        search(e.target.value);
        setResults({ value: e.target.value });
    };

    let search = async val => {
        setResults({ loading: true });
        const res = await Search(
            `http://localhost:5000/spotify/${val}`
        );
        const tracks = res;
        setResults({ tracks, loading: false });

    };

    //displaying search result tracks
    function getTracks() { 
        const renderTracks = searchResults.tracks.data.map((track, id) => {
            return (
                < ListGroup.Item key={id} >
                    <div className="list-item">
                        <h5>{track.name}</h5> by {track.artists.join(", ")}
                    
                        <div className="list-icons" >
                            <a href={track.preview_url} target="_blank" title="Play the preview"><AiFillPlayCircle size="30px" /></a>
                            <a onClick={() => addToPlaylist(track)} style={{ cursor: "pointer" }} title="Add this track to playlist"><GrAddCircle size="30px" /></a>
                        </div>
                    </div>
                </ListGroup.Item >
            )
        });
        return renderTracks
    }


    function displayTracks() {
        let tracks = "";
        if (searchResults.tracks) {
            tracks = getTracks();
        }
        return tracks;
    }

    //add the track to current playlist
    function addToPlaylist(track) {
        var found = false;
        for (var song of addedTracks) {
            if (song.spotifyID === track.spotifyID) {
                found = true;
            }
        }
        if (!found) { 
            if (track) {
                addTracks(oldArray => [...oldArray, track]);
                toast.info("Added the song to the playlist. Scroll down.", {
                    position: "bottom-center"
                })
            }
        }
        else {
            toast.error("Already added this song to the playlist.", {
                position: "bottom-center"
            })
        }
    }

    function removeTrack(track){
        if (addedTracks.includes(track, 0)) {
            var removeIndex = addedTracks.map(function (item) { return item.spotifyID; }).indexOf(track.spotifyID);
            var copy = [...addedTracks];
            copy.splice(removeIndex, 1);
            addTracks(copy);
            console.log(addedTracks);
            toast.warning(`Removed ${track.name} from Playlist`, { position: "bottom-center" });
        }
    }

    //displaying added tracks
    function displayAddedTracks(){
        let tracks = <h2 style={{textAlign:"center", fontStyle: "italic", fontFamily: "roboto, sans-serif", marginTop:"12px" }}> No tracks added to this playlist </h2>;
        if (addedTracks) {
            tracks = getAddedTracks();
        }
        return tracks;
    }

    function getAddedTracks() {
        const renderTracks = addedTracks.map((track, id) => {
            return (
                < ListGroup.Item key={id} variant="success">
                    <div className="list-item">
                        <h5>{track.name}</h5> by {track.artists.join(", ")}

                        <div className="list-icons" >
                            <a onClick={() => removeTrack(track)} style={{ cursor: "pointer" }} title="Remove track from playlist"> <AiOutlineCloseCircle size="30" /></a>
                        </div>
                    </div>
                </ListGroup.Item >
            )
        });
        return renderTracks
    }

    const savePlaylist = async (e) => {
        e.preventDefault();
        try {
            const creator_id = userData.user.id;
            const playlistId = parameters.playlistID;
            const playlist = isFork ? { playlistName, creator_id, isPublic, tracks: [...addedTracks], playlistDesc } : { playlistId, playlistName, isPublic, tracks: [...addedTracks], playlistDesc }
            const loginRes = isFork ? 
                await Axios.post(
                    "http://localhost:5000/playlist/fork",
                    playlist
                ) :
                await Axios.post(
                    "http://localhost:5000/playlist/edit",
                    playlist
                );
            console.log(addedTracks);
            const id = loginRes.data.id;
            history.push(`/playlist/${id}`);
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };

    return (
        <>
            <Nav/>
            {data ?
            <div className="createPlaylist-body">
                <div className="createPlaylist-header">
                    <h1 className="createPlaylist-title"> {isFork ? "Fork this playlist" : "Edit your playlist" }</h1>
                    <p style={{ textAlign: "left", fontStyle: "italic", fontFamily: "roboto, sans-serif" }}>Playlist is a collection of the songs you would love to hear now or later </p>
                   
                </div>
                {error && (
                    <ErrorNotice message={error} clearError={() => setError(undefined)} />
                )}
                <hr className="solid-cp" />
                    
                <form onSubmit={savePlaylist}>
                    <div className="configs">
                    
                        <p style={{ textAlign: "left", fontStyle: "italic", fontFamily: "roboto, sans-serif" }}>Maybe a New Name? </p>
                        <input
                            type="search"
                            defaultValue={data.name}
                            placeholder="Playlist name..."
                            onChange={(e) => setName(e.target.value)}
                            required />

                    
                        <select
                            style={{ marginTop: "7px", marginLeft: "5px", display: "inline", float: "right", }}
                            name="Public"
                            onChange={(e) => setPublic(e.target.value)}
                                id="public">
                                <option value="true" selected={data.public ? true : false}>Yes</option>
                                <option value="false" selected={data.public ? false : true}>No</option>                       
                        </select>
                        <p style={{ display: "inline", float: "right", fontStyle: "italic", fontFamily: "roboto, sans-serif", marginTop:"12px"}}> Public playlists are visible to other users. Public?</p>
                    </div>
                     <div className="description">
                        <p style={{ textAlign: "left", fontStyle: "italic", fontFamily: "roboto, sans-serif" }}>Playlist Description</p>

                        <input
                            type="text"
                            defaultValue= {data.description}
                            placeholder="Description"
                            onChange={(e) => setDesc(e.target.value)}
                            required />
                    </div>
                    <div className="search-bar">
                        {/* this goes inside input value={this.state.value}
                                onChange={e => this.onChangeHandler(e)}*/}
                        <input
                            type="text"
                            placeholder="Type here to search a song to add it to the playlist"
                            onChange={e => searchHandler(e)}
                            value={setResults.value}
                        />
                        </div>
                        <ToastContainer />

                    <div className="search-result">
                        < ListGroup variant="flush">
                            {displayTracks()}
                        </ ListGroup>
                     </div>
                    <div className="added-songs">
                        <h2 style={{ fontFamily: "Turret Road, cursive" }}>
                            Added Songs
                        </h2>
                        <div className="added-songList">
                            {addedTracks.length!=0 ? <>
                                <ListGroup>
                                    {displayAddedTracks()}
                                </ListGroup>

                            </> : <h2 style={{ textAlign: "center", fontStyle: "italic", fontFamily: "roboto, sans-serif", marginTop: "12px" }}> No tracks added to this playlist </h2> }
                        </div>                   
                    </div>
                    <Button type="submit" className="rounded-pill" style={{ margin: "1% 0 1% 0", padding: "7px 25px 5px 25px" }} variant="info"> <h5> Save the playlist </h5></Button>
                 </form>
                <hr className="solid-cp" />
                <div className="collection-div">
                    <h2 style={{ fontFamily: "Turret Road, cursive" }}>
                        Add the Playlist to a collection?
                    </h2>
                    <h5> Save the playlist and visit the collection page by <a href="/collexDash"> clicking here! </a></h5>
                    <p style={{ textAlign: "left", fontStyle: "italic", fontFamily: "roboto, sans-serif" }}>*only public playlists can be added to the collection</p>
                </div>
            </div>
            : <h1> No playlist </h1>
            }
            <Footer/>
        </>
    );
}