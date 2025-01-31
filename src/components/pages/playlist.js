import React, { useEffect, useState, useContext } from "react";
import Nav from "../nav/nav2";
import Footer from "../nav/footer";
import { useParams } from "react-router-dom";
import Axios from "axios";
import ErrorNotice from "../misc/error";
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { useHistory } from "react-router-dom";

import { Button, Modal, Form } from "react-bootstrap";
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
import Cookies from 'js-cookie'

import SpotifyWebPlayer from 'react-spotify-web-playback';
import { ErrorBoundary } from 'react-error-boundary'


export default function Playlist() {
    const { userData, setUserData } = useContext(UserContext);
    const [modalShow, setModalShow] = useState(false);
    const [likesModalShow, setLikesModalShow] = useState(false);
    const [playlist, setPlaylist] = useState();
    let parameters = useParams();
    const [error, setError] = useState();
    const [likes, setLikes] = useState();
    const [likesBy, setLikesBy] = useState();
    // const [likeShow, setLikeShow] = useState(false);
    const [track, setTrack] = useState(0);
    const [likedbyUser, setlikedbyUser] = useState(false);
    const [play, setPlayStatus] = useState(false);
    const history = useHistory();
    const [premium, setPremium] = useState(false);
    const token = Cookies.get('spotifyAuthToken');
    const [userLike, setUserLike] = useState();



    useEffect(() => {
        const fetchData = async () => {
            const playlistId = parameters.playlistId;
            const result = await Axios.get(
                `/api/playlist/${playlistId}`
            );
            setPlaylist(result.data);
            console.log(userData.user);
            setLikes(result.data.likes);
            setLikesBy(result.data.likedBy);
            const userId = userData.user.id;
            const likeresult = await Axios.get(
                `/api/playlist/likedbyUser/${playlistId}/${userId}`
            );
            console.log(result.data);
            setlikedbyUser(likeresult.data);
            var x;
            let usersWhoLiked = {}
            for (x of result.data.likedBy) {
                const result = await Axios.get(
                    `/api/users/${x}`
                );
                usersWhoLiked[x] = result.data.name;
            }
            setUserLike(usersWhoLiked);

            if (token) {
                const res = await Axios.get("https://api.spotify.com/v1/me", {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })
                console.log(res.data.product);
                if (res.data.product === "premium") {
                    setPremium(true);
                }
            }

        };
        fetchData();
    }, []);

    
    const callback = () => {

        localStorage.setItem("prevPath", window.location.pathname);
        history.push("/callback")
    };

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
                "/api/playlist/like",
                info
            );

            const result = await Axios.get(
                `/api/users/${creator_id}`
            );
            userLike[creator_id] = result.data.name;
            setUserLike(userLike);

            setlikedbyUser(true);
            toast.success("You liked this playlist", {
                position: "bottom-center"
            });
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };

    function ErrorFallback({ error, resetErrorBoundary }) {
        return (
            <div role="alert">
                <p>Something went wrong:</p>
                <pre>{error.message}</pre>
                <button onClick={resetErrorBoundary}>Try again</button>
            </div>
        )
    }
    function signinPremium() {
        Cookies.remove('spotifyAuthToken');
        history.push('/callback')
    }
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
                "/api/playlist/dislike",
                info
            );

            delete userLike[creator_id];
            setUserLike(userLike);

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
                                        src={playlist.cover}
                                        alt="pic"
                                    />
                                </div>
                                <div className="playlistPageContent" >
                                    <p className="largeText uppercase bold"><a style={{color: "black"}}href={"/user/" + playlist.creatorId}><b>{playlist.username}'s</b></a> creation</p> 
                                    <h1>{playlist.name}</h1>

                                    <p className="tagline">
                                        {playlist.description}
                                    </p>
                                    <div className="playlistPageDesc">
                                        {/* <span style={{ fontStyle: "italic" }}> {likes} likes</span>  */}
                                        <div style={likes > 0 ? { cursor: "pointer" } : {cursor: "default"}} onClick={likes > 0 ? () => setLikesModalShow(true) : null}><MouseOverPopover likes={likes} userLike={userLike} /></div>
                                        <span style={{ fontStyle: "italic" }}>Duration: {playlist.duration ? playlist.duration : <></>}</span>
                                    </div>
                                    {error && (
                                        <ErrorNotice message={error} clearError={() => setError(undefined)} />
                                    )}
                                </div>
                            </div>
                            <div className="playlistPageSongs">
                                <div className="playlistButtons">
                                    <span className="playIcon">
                                        <PlayIcon onClick={() => setPlayStatus(true)} />
                                    </span>
                                    <div className="icons">
                                        {userData && userData.user && userData.user.id === playlist.creatorId ? (<div className="icon iconsEdit">
                                            <a href={`/editPlaylist/${parameters.playlistId}`} title="edit this playlist"><EditIcon /></a>
                                        </div>) : <></>}
                                        <div className="icon iconsFork">
                                            <a href={`/forkPlaylist/${parameters.playlistId}`} title="fork this playlist"><ForkIcon /></a>
                                        </div>
                                        {userData && userData.user && userData.user.id === playlist.creatorId ? (<div className="icon iconsDelete" title="delete this playlist" onClick={() => setModalShow(true)}>
                                            <DeleteIcon />
                                        </div>) : <></>}
                                    </div>
                                    {
                                        likedbyUser ?
                                            <div className="likeDislike">
                                                <a onClick={dislikePlaylist} title="Unlike this playlist">
                                                    <AiFillDislike size="32" onMouseOver={({ target }) => target.style.color = "white"} onMouseOut={({ target }) => target.style.color = "black"} /></a>
                                            </div>
                                            :
                                            <div className="likeDislike">
                                                <a onClick={likePlaylist} title="Like the playlist">
                                                    <AiFillLike size="32" onMouseOver={({ target }) => target.style.color = "white"} onMouseOut={({ target }) => target.style.color = "black"} /></a>
                                            </div>
                                    }

                                </div>



                                <ul className="songList">
                                    {
                                        playlist.songs.map(track => (
                                            <li key={track._id} onClick={() => { setTrack(playlist.songs.map(track => track._id).indexOf(track._id)); setPlayStatus(true); }}>
                                                <div className="songIcon">
                                                    <NoteIcon className="noteI" />
                                                    <PlayIcon className="playI" />
                                                </div>
                                                <div className="songDetails">
                                                    <h3>{track.name}</h3>
                                                    <span>by {track.artists.join(", ")}</span>
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
                            playlistid={parameters.playlistId}
                        />
                        <LikesModal
                            show={likesModalShow}
                            onHide={() => setLikesModalShow(false)}
                            userLike={userLike}
                            userId={userData.user.id}
                            />

                           
                            <ToastContainer />
                        </div>
                        {token ? (
                            premium ?
                                <>
                                    < ErrorBoundary
                                        ErrorFallback={ErrorFallback}
                                    >
                                        <SpotifyWebPlayer
                                            styles={{
                                                color: '#ffa500',
                                                sliderColor: '#5680e9',
                                                sliderTrackColor: '#1b03a3',
                                                trackNameColor: "white",
                                                height: '11vh',
                                                bgColor: "black"

                                            }}
                                            //syncExternalDevice={false}
                                            magnifySliderOnHover={true}
                                            //callback={( error) => console.log(error)}
                                            callback={({ isPlaying }) => isPlaying.valueOf() ? true : setPlayStatus(false)}
                                            play={play}
                                            offset={track}
                                            autoPlay={true}
                                            token={token}
                                            uris={playlist ? playlist.songs.map(track => "spotify:track:" + track.spotifyID) : []} />
                                    </ErrorBoundary>

                                </> : (<><div className="playerdiv"><h5 style={{ paddingTop: "2%", color: "lightgreen", textAlign: "center" }}>You need to sign in with Spotify Premium to load the player <a style={{ color: "blue", cursor: "pointer" }} onClick={() => signinPremium()}>Sign in with Premium</a></h5></div></>))
                        : (<><div className="playerdiv"><h5 style={{ paddingTop: "2%", color: "lightgreen", textAlign: "center", bottom: "0px" }}>Please click to
                            <a style={{ color: "blue", cursor: "pointer" }} onClick={callback}> login </a> with Spotify Premium to load the player.</h5></div></>)}
                </>

                : <><h1 style={{ textAlign:"center" }}> This playlist doesn't exist or might be loading</h1></>
            }
            <Footer />
        </>
    );

}


const useStyles = makeStyles((theme) => ({
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),
    },
  }));
  
function MouseOverPopover(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    
    const userLikes = props.userLike;

    var popup = "Loading...";
    let less = false;
    if (userLikes){
        let likesInList = Object.keys(userLikes)
        if (likesInList.length <= 4){
            popup = likesInList.map((users, index) => (<Typography key={ index }>{userLikes[users]}</Typography>))
        }
        else{
            popup = likesInList.slice(0, 4).map((users, index) => (<Typography key={index}>{userLikes[users]}</Typography>))
            less = true;
        }
    }

    return (
      <div>
        <Typography
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          <span className="playlistPageDesc" style ={{ color: "black" }}><b>{props.likes} {props.likes == 1 ? "like" : "likes"}</b></span>
        </Typography>
        {props.likes > 0 ? 
        <Popover
          id="mouse-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
            {popup}
            {less ? <Typography>...and {Object.keys(userLikes).length - 4} more.</Typography>: null }
        </Popover> : null}
      </div>
    );
}

function LikesModal(props) {
    let usersWhoLiked = props.userLike;
    let userIds = usersWhoLiked ? Object.keys(usersWhoLiked) : null;

    return (
        <Modal
          {...props}
          size="sm"
          aria-labelledby="example-modal-sizes-title-sm"
          centered
          scrollable = {true}
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
              Users Who Like This Playlist
            </Modal.Title>
          </Modal.Header>
            <Modal.Body>{userIds ? userIds.map((users, index) => <p key={index}><a href={`/user/${users}`}>{usersWhoLiked[users]}{users == props.userId ? " (you!)" : ""}</a></p>) : ""}</Modal.Body>
        </Modal>
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
                `/api/playlist/delete/${playlistId}`                
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