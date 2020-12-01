import React, { useEffect, useState, useContext } from "react";
import Nav from "../nav/nav2";
import Footer from "../nav/footer";
import { useParams } from "react-router-dom";
import Axios from "axios";
import ErrorNotice from "../misc/error";

import { useHistory } from "react-router-dom";

import { Button, Modal, Form } from "react-bootstrap";
import ReactJkMusicPlayer from 'react-jinke-music-player'
import "../../CSS/pages/index.css"

import 'react-multi-carousel/lib/styles.css';
import UserContext from "../misc/userContext";

import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";

import { ReactComponent as PlayIcon } from '../../images/play.svg'
import { ReactComponent as NoteIcon } from '../../images/note.svg';

import { ReactComponent as ForkIcon } from '../../images/fork.svg';
import { ReactComponent as EditIcon } from '../../images/edit.svg';
import { ReactComponent as DeleteIcon } from '../../images/delete.svg';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../CSS/pages/playlist.scss"

import SpotifyWebPlayer from 'react-spotify-web-playback';

export default function Playlist() {
    const { userData, setUserData } = useContext(UserContext);
    const [modalShow, setModalShow] = useState(false);
    const [playlist, setPlaylist] = useState();
    let parameters = useParams();
    const [error, setError] = useState();
    const [likes, setLikes] = useState();
    const [track, setTrack] = useState(0);
    const [likedbyUser, setlikedbyUser] = useState(false);
    const [play, setPlayStatus] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            const playlistId = parameters.playlistId;
            const result = await Axios.get(
                `http://localhost:5000/playlist/${playlistId}`
            );
            setPlaylist(result.data);
            console.log(playlist);
            setLikes(result.data.likes);
            setLikesBy(result.data.likedBy);
            const userId = userData.user.id;
            const likeresult = await Axios.get(
                `http://localhost:5000/playlist/likedbyUser/${playlistId}/${userId}`
            );
            console.log(result.data);
            setlikedbyUser(likeresult.data);
            };
        fetchData();
    }, []);

    const likePlaylist = async (e) => {
        e.preventDefault();
        try {
            const creator_id = userData.user.id;
            const playlistId = parameters.playlistId;

            var playlistLikes = likes;
            playlistLikes = playlistLikes + 1;
            setLikes(playlistLikes);
            
            var userLikes = likesBy;
            userLikes.push(creator_id);
            setLikesBy(userLikes);

            const info = { creator_id, playlistId, playlistLikes, userLikes }

            const likeRes = await Axios.post(
                "http://localhost:5000/playlist/like",
                info
            );

            setlikedbyUser(true);
            toast.success("You liked this playlist", {
                position: "bottom-center"
            })
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };

    function convertTominutes(totalduration) {
        var minutes = Math.floor(totalduration / 60000);
        var seconds = ((totalduration % 60000) / 1000).toFixed(0);
        var duration = minutes + "m " + (seconds < 10 ? '0' : '') + seconds + "s";

        return duration;
    }
    const dislikePlaylist = async (e) => {
        e.preventDefault();
        try {
            const creator_id = userData.user.id;
            const playlistId = parameters.playlistId;

            var playlistLikes = likes;
            playlistLikes = playlistLikes - 1; 
            setLikes(playlistLikes);

            var userLikes = likesBy;
            userLikes.splice(userLikes.indexOf(creator_id), 1);
            setLikesBy(userLikes);

            const info = { creator_id, playlistId, playlistLikes, userLikes }

            const likeRes = await Axios.post(
                "http://localhost:5000/playlist/dislike",
                info
            );

            setlikedbyUser(false);
            toast.error("You disliked this playlist", {
                position: "bottom-center"
            })
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };
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
                                        { playlist.description}
                                    </p>
                                    <div className="playlistPageDesc">
                                        <span style={{ fontStyle: "italic" }}>{likes} likes</span>
                                        <span style ={{ fontStyle: "italic" }}>Duration: {playlist.duration ? playlist.duration : <></> }</span>
                                    </div>
                                    {error && (
                                        <ErrorNotice message={error} clearError={() => setError(undefined)} />
                                    )}
                                </div>
                            </div>
                            <div className="playlistPageSongs">
                                <div className="playlistButtons">
                                    <span className="playIcon">
                                        <PlayIcon onClick={() => setPlayStatus(true)}/>
                                    </span>
                                    <div className="icons">
                                        {/*<div className="icon iconsHeart">
                                            <a onClick={ likePlaylist }><HeartIcon /></a>
                                        </div>
                                        */}
                                        <div className="icon iconsEdit">
                                            <a href={`/editPlaylist/${parameters.playlistId}`} title="edit this playlist"><EditIcon /></a>
                                        </div>
                                        <div className="icon iconsFork">
                                            <a href={`/forkPlaylist/${parameters.playlistId}`} title="fork this playlist"><ForkIcon /></a>
                                        </div>
                                        <div className="icon iconsDelete" title= "delete this playlist" onClick={() => setModalShow(true)}>
                                            <DeleteIcon />
                                        </div>                                      
                                    </div>
                                    {
                                        likedbyUser ?
                                            <div className="likeDislike">
                                                <a onClick={dislikePlaylist} title="Unlike this playlist">
                                                    <AiFillDislike size="32" onMouseOver={({ target }) => target.style.color = "white"} onMouseOut={({ target }) => target.style.color = "black"}/></a>
                                            </div>
                                            :
                                            <div className="likeDislike">
                                                <a onClick={likePlaylist} title="Like the playlist">
                                                    <AiFillLike size="32" onMouseOver={({ target }) => target.style.color = "white"} onMouseOut={({ target }) => target.style.color = "black"}/></a>
                                            </div>
                                    }
                                    
                                </div>

                                

                                <ul className="songList">
                                    {
                                        playlist.songs.map(track => (
                                            <li key={ track._id} onClick={() => {setTrack(playlist.songs.map(track =>track._id).indexOf(track._id)); setPlayStatus(true);}}>
                                                <div className="songIcon">
                                                    <NoteIcon className="noteI" />
                                                    <PlayIcon className="playI" />
                                                </div>
                                                <div className="songDetails">
                                                    <h3>{ track.name }</h3>
                                                    <span>by { track.artists.join(", ")}</span>
                                                </div>
                                                <div className="songTime">
                                                    <span>{convertTominutes(track.duration)}</span>
                                                </div>
                                            </li>  
                                        ))
                                    }                                 
                                </ul>
                            </div>
                        </div>
                        <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            playlistid = {parameters.playlistId}
                        />
                    </div>
                </>

                : <></>
                }
            <SpotifyWebPlayer
                    styles={{color:'#5680e9',
                            sliderColor:'#5680e9',
                            sliderTrackColor:'#c1c8e4'}}
                    //syncExternalDevice={false}
                    magnifySliderOnHover={true}
                    callback={({isPlaying}) => isPlaying.valueOf()? true: setPlayStatus(false)}
                    play={play}
                    offset={track}
                    autoPlay={true}
                    token='BQBkywADGWJrv9lsqzBQO9bk62JlkPnKclEhkeEuDpH2fISllOSUpzFOUekZATEg7owRnN4-FRPcZ5ulSU1Fs98vwRXkrWvdRoN3GyQLyh4hU2MbOV9JBDVWk_ZxIwGLZkNPq2dIKC6tCBdNyjYcTo5FLiIvTXztE3C089fh5UqjCasXPxA_tqZtENIh-DOls_8Xh0Au3Ald' 
                    uris={playlist? playlist.songs.map(track => "spotify:track:"+track.spotifyID):[]}/> 
            <ToastContainer/>
            <Footer />
        </>
    );

}

function MyVerticallyCenteredModal(props) {
    const history = useHistory();
        const [error, setError] = useState();

    const deletePlaylist = async (e) => {
        e.preventDefault();
        try {
            let playlistId = props.playlistid;
           
            const deletRes = await Axios.post(
                `http://localhost:5000/playlist/delete/${playlistId}`                
            );
            history.push("/usrDash");

        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete Playlist
                </Modal.Title>
                
            </Modal.Header>

                <Modal.Body>
                    <p style={{ fontStyle: "italic", fontSize: '20px' }}>Are you sure you want to delete this playlist? Once deleted, the playlist is unretrievable.</p>
                    {error && (
                        <ErrorNotice message={error} clearError={() => setError(undefined)} />
                    )}

                   <Form>
                        <Button type="submit" onClick={deletePlaylist}>Yes</Button>
                   </Form>
                </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}