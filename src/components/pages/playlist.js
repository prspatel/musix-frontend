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
    const [likedbyUser, setlikedbyUser] = useState(false);
    const [play, setPlayStatus] = useState(false);
    const [trackList, setTrackList] = useState([]);

    /*const getTrack = async () => {
        if(playlist && trackList!=[]){
            let tempList=[];
            playlist.songs.map(track =>(tempList.push("spotify:track:"+track.spotifyID)));
            setTrackList(tempList);  
        }  
    }*/

    useEffect(() => {
        const fetchData = async () => {
            const playlistId = parameters.playlistId;
            const result = await Axios.get(
                `http://localhost:5000/playlist/${playlistId}`
            );
            setPlaylist(result.data);
            console.log(playlist);
            setLikes(result.data.likes);
            const userId = userData.user.id;
            const likeresult = await Axios.get(
                `http://localhost:5000/playlist/likedbyUser/${playlistId}/${userId}`
            );
            console.log(likeresult.data);
            setlikedbyUser(likeresult.data);
            };
        fetchData();
    }, []);

    console.log(playlist?playlist.songs:"xxxxxxx");
    

    const likePlaylist = async (e) => {
        e.preventDefault();
        try {
            const creator_id = userData.user.id;
            const playlistId = parameters.playlistId;
            const info = { creator_id, playlistId }
            const likeRes = await Axios.post(
                "http://localhost:5000/playlist/like",
                info
            );
            var playlistLikes = likes;
            playlistLikes = playlistLikes + 1;
            setLikes(playlistLikes);
            setlikedbyUser(true);
            toast.success("You liked this playlist", {
                position: "bottom-center"
            })
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };

    const dislikePlaylist = async (e) => {
        e.preventDefault();
        try {
            const creator_id = userData.user.id;
            const playlistId = parameters.playlistId;
            const info = { creator_id, playlistId }
            const likeRes = await Axios.post(
                "http://localhost:5000/playlist/dislike",
                info
            );
            var playlistLikes = likes;
            playlistLikes = playlistLikes - 1; 
            setLikes(playlistLikes);
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
                                        <span>{likes} likes</span>
                                        <span>4hr 35 min</span>
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
                                                    <span>{ track.duration}</span>
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
                    token='BQBb-9OI3oDVUG86gNfFE9J6Nodxm1OT6BcP_yeHsrOJqMgN7eMlQtCs_80HA6CNnS2PpojSmTZgrjRBLbCM-tK3kp8athJz-TQrFaQ_x5aGOx-hsapPRkb6MwKWIBp7CPstkjunkJb09ws9Pz6y504zEq1iZgAJ_TWePpfIsfV064ONoNKpvJHelUz3V0qscGZUcEH-0VMT' 
                    uris={playlist?playlist.songs.map(track => "spotify:track:"+track.spotifyID):[]}/> 
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