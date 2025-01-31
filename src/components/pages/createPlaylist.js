
import React, { useState, useContext } from "react";
import "../../CSS/pages/createPlaylist.css"
import {ListGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { AiOutlineCloseCircle } from "react-icons/ai"
import Nav from "../nav/nav2";
import Button from 'react-bootstrap/Button';
import Footer from "../nav/footer";
import { SearchFunction } from "../misc/search";
import { GrAddCircle } from "react-icons/gr";
import UserContext from "../misc/userContext";
import ErrorNotice from "../misc/error";
import Axios from "axios";
import { AiFillPlayCircle } from "react-icons/ai";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function CreatePlaylist() {

    const [searchResults, setResults] = useState({
        tracks: null,
        loading: false,
        value:""
    });

    const [error, setError] = useState();
    const history = useHistory();
    const [addedTracks, addTracks] = useState([]);
    const [playlistName, setName] = useState();
    const [playlistDesc, setDesc] = useState();

    const [isPublic, setPublic] = useState(true);
    const { userData, setUserData } = useContext(UserContext);

    let searchHandler = async e => {
        if (e.target.value)
            search(e.target.value);
        setResults({ value: e.target.value });
    };

    let search = async val => {
        setResults({ loading: true });
        const res = await SearchFunction(
            `/api/spotify/${val}`
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
                            <a onClick={() => addToPlaylist(track)} style={{ cursor: "pointer" }} title="Add this track tol playlist"><GrAddCircle size="30px" /></a>
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
        if (!addedTracks.includes(track, 0)) {
            if (track) {
                addTracks(oldArray => [...oldArray, track]);
                toast.info("Added the song to the playlist. Scroll down.", {
                    position: "bottom-center"})
            }
        }
        else {
            toast.error("Already added this song to the playlist.", {
                position: "bottom-center"})
        }
    }

    function removeTrack(track){
        if (addedTracks.includes(track, 0)) {
            var removeIndex = addedTracks.map(function (item) { return item.spotifyID; }).indexOf(track.spotifyID);
            var copy = [...addedTracks];
            copy.splice(removeIndex, 1);
            addTracks(copy);
            console.log(addedTracks);
            toast.warning(`Removed ${track.name} from Playlist`, { position: "bottom-center"});
        }
    }

    //displaying added tracks
    function displayAddedTracks(){
        let tracks = <h2 style={{textAlign:"center", fontStyle: "italic", fontFamily: "roboto, sans-serif", marginTop:"12px" }}> No tracks added to this playlist </h2>;
        if (addedTracks) {
            console.log(addedTracks)
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

            const playlist = { playlistName, creator_id, isPublic, tracks: [...addedTracks], playlistDesc }
            const loginRes = await Axios.post(
                "/api/playlist/create",
                playlist
            );
            const id = loginRes.data.id;
            console.log(id);
            history.push(`/playlist/${id}`);
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };
    return (
        <>
            <Nav/>
            <div className="createPlaylist-body">
                <div className="createPlaylist-header">
                    <h1 className="createPlaylist-title"> Create your playlist </h1>
                    <p style={{ textAlign: "left", fontStyle: "italic", fontFamily: "roboto, sans-serif" }}>Playlist is a collection of the songs you would love to hear now or later </p>
                   
                </div>
                {error && (
                    <ErrorNotice message={error} clearError={() => setError(undefined)} />
                )}
                <hr className="solid-cp" />
                    
                <form onSubmit={savePlaylist}>
                    <div className="configs">
                    
                        <p style={{ textAlign: "left", fontStyle: "italic", fontFamily: "roboto, sans-serif" }}>Lets configure it first.... </p>
                        <input
                            type="search"
                            placeholder="Playlist name..."
                            onChange={(e) => setName(e.target.value)}
                            maxLength="19"
                            required />

                    
                        <select
                            style={{ marginTop: "7px", marginLeft: "5px", display: "inline", float: "right", }}
                            name="Public"
                            onChange={(e) => setPublic(e.target.value)}
                            id="public">
                            <option value="true">Yes</option>
                            <option value="false">No</option>                       
                        </select>
                        <p style={{ display: "inline", float: "right", fontStyle: "italic", fontFamily: "roboto, sans-serif", marginTop:"12px"}}> Public playlists are visible to other users. Public?</p>
                    </div>
                    <div className="description">
                        <p style={{ textAlign: "left", fontStyle: "italic", fontFamily: "roboto, sans-serif" }}>Playlist Description</p>

                        <input
                            type="text"
                            placeholder="Description"
                            onChange={(e) => setDesc(e.target.value)}
                            maxLength="70"
                            required />
                    </div>
                    <div className="search-bar">
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
                        Add the Playlist to a Collex?
                    </h2>
                    <h5> Save the playlist and visit the Collex Dashboard</h5>
                    <p style={{ textAlign: "left", fontStyle: "italic", fontFamily: "roboto, sans-serif" }}>*only public playlists can be added to the Collex</p>
                </div>
            </div>
            <Footer/>
        </>
    );
}