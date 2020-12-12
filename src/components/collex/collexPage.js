import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Nav from '../nav/nav2';
import "../../CSS/collex/collexPage.css"
import Footer from "../nav/footer";
import { Link } from 'react-router-dom';
import Card from "react-bootstrap/Card";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { AiFillPlusCircle } from 'react-icons/ai'
import MyVerticallyCenteredModal from "../collex/addPlaylist";
import { toast, ToastContainer } from 'react-toastify';
import UserContext from "../misc/userContext";
import { Button, Comment, Form } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import EditCollexModal from "./editCollex";
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from "react-bootstrap";


export default function CollexPage() {
    const [modalShow, setModalShow] = useState(false);
    const [editModal, seteditModal] = useState(false);
    const [data, setData] = useState();
    const [playlists, setPlaylists] = useState([]);
    const [likedbyUser, setlikedbyUser] = useState(false);
    const [likes, setLikes] = useState();

    const [likesBy, setLikesBy] = useState();
    const [userLike, setUserLike] = useState();
    const [likesModalShow, setLikesModalShow] = useState(false);

    const { userData } = useContext(UserContext);
    const [error, setError] = useState();
    const [comments, setComments] = useState([]);
    const [commentText, saveCommentText] = useState("");

    let parameters = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const collexId = parameters.collexId;
            const result = await axios.get(
<<<<<<< HEAD
                `/api/collex/${collexId}`               
=======
                `/collex/${collexId}`               
>>>>>>> 499ded228ee63902d1f8692e98c21d2a9d1b318d
            );
            setLikes(result.data.collex.likes);
            setData(result.data.collex);
            setLikesBy(result.data.collex.likedBy);
            console.log(result.data.collex);
            setPlaylists(result.data.playlists);
            setComments(result.data.comments);
            const userId = userData.user.id;
            const likeresult = await axios.get(
<<<<<<< HEAD
                `/api/collex/likedbyUser/${collexId}/${userId}`
=======
                `/collex/likedbyUser/${collexId}/${userId}`
>>>>>>> 499ded228ee63902d1f8692e98c21d2a9d1b318d
            );
            var x;
            let usersWhoLiked = {}
            for (x of result.data.collex.likedBy){
                const result = await axios.get(
<<<<<<< HEAD
                    `/api/users/${x}`
=======
                    `/users/${x}`
>>>>>>> 499ded228ee63902d1f8692e98c21d2a9d1b318d
                );
                usersWhoLiked[x] = result.data.name;
            }
            setUserLike(usersWhoLiked);
            console.log(likeresult.data);
            setlikedbyUser(likeresult.data);
        };

        fetchData();
    }, []);

    const likeCollex = async (e) => {
        e.preventDefault();
        try {
            const creator_id = userData.user.id;
            const collexId = parameters.collexId;

            var collexLikes = likes;
            collexLikes = collexLikes + 1;
            setLikes(collexLikes);

            var userLikes = likesBy;
            userLikes.push(creator_id);
            setLikesBy(userLikes);
            
            const info = { creator_id, collexId, collexLikes, userLikes } 

            const likeRes = await axios.post(
<<<<<<< HEAD
                "/api/collex/like",
                info
            );
            const result = await axios.get(
                `/api/users/${creator_id}`
=======
                "/collex/like",
                info
            );
            const result = await axios.get(
                `/users/${creator_id}`
>>>>>>> 499ded228ee63902d1f8692e98c21d2a9d1b318d
            );
            userLike[creator_id] = result.data.name;
            setUserLike(userLike);

            setlikedbyUser(true);
            toast.success("You liked this collex", {
                position: "bottom-center"
            })
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };
    const dislikeCollex = async (e) => {
        e.preventDefault();
        try {
            const creator_id = userData.user.id;
            const collexId = parameters.collexId;

            var collexLikes = likes;
            collexLikes = collexLikes - 1;
            setLikes(collexLikes);

            var userLikes = likesBy;
            userLikes.splice(userLikes.indexOf(creator_id), 1);
            setLikesBy(userLikes);

            const info = { creator_id, collexId, collexLikes, userLikes }

            const likeRes = await axios.post(
<<<<<<< HEAD
                "/api/collex/dislike",
=======
                "/collex/dislike",
>>>>>>> 499ded228ee63902d1f8692e98c21d2a9d1b318d
                info
            );

            delete userLike[creator_id]
            setUserLike(userLike)

            setlikedbyUser(false);
            toast.error("You disliked this collex", {
                position: "bottom-center"
            })
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };


    function getAddedComments() {
        const renderComments = comments.map((item, id) => {
            return (
                <>
                    <Comment key={item._id} style={{ margin: "1% 0 0.5% 0", backgroundColor: "lightblue" }}>
                        <Comment.Content>
                            <Comment.Author as='a' href={"/user/" +  item.comment.creatorId }>{item.username}</Comment.Author>
                            <Comment.Metadata>
                                <div>{item.comment.datetime}</div>
                            </Comment.Metadata>
                            <Comment.Text>{item.comment.comment}</Comment.Text>
                        </Comment.Content>
                    </Comment>
                    <hr/>
                </>
            )
        });
        return renderComments
    }
    const saveComment = async (e) => {
        e.preventDefault();
        try {
            const userid = userData.user.id;
            const collexid = parameters.collexId;
            console.log("userid: " + userid + " comment: " + commentText + " collexid: " + collexid);
            const comment = { userid, commentText, collexid }
            const commentRes = await axios.post(
                "/api/collex/saveComment",
                comment
            );
            let savedcomment = commentRes.data;
            setComments(oldArray => [savedcomment, ...oldArray]);
            saveCommentText("");
            console.log(comments);
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    }
    //{data && userData && userData.user && userData.user.id != data.creatorid ? <p>Edit this collex</p> : <></>}
    function editModalClose() {
        seteditModal(false);
        window.location.reload(false);
    }
    
    return (
        <>
            <Nav />
                <div>
                    <div className="header">
                        <div >
                        <h1 className="collex-topic">{data ? data.name : <></>}</h1>
                        <a onClick={() => setModalShow(true)} style={{ cursor: "pointer", display: "inline", float: "right", color: "#696969", fontFamily: "roboto, sans-serif", marginTop: "30px", fontSize: "20px" }}>
                                <AiFillPlusCircle style={{ color: "#69b1ec", size: "2em" }} />
                                Add a playlist
                        </a>
                        </div>
                        <div >
                            <p style={{ textAlign: "left", fontStyle: "italic", fontFamily: "roboto, sans-serif", display: "inline", fontSize: "20px" }}>{data ? data.description : <></>}</p>
                            
                            {
                            likedbyUser ?
                                <div style={{ cursor: "pointer", display: "inline", float: "right", color: "#696969", fontFamily: "roboto, sans-serif", fontSize: "20px", display: "flex" }}>
                                        <a onClick={dislikeCollex} title="Unlike this collex">
                                            <AiFillDislike style={{ color: "#69b1ec", size: "2em" }} onMouseOver={({ target }) => target.style.color = "black"} onMouseOut={({ target }) => target.style.color = "#69b1ec"} />
                                        </a>

                                        <div onClick={likes > 0 ? () => setLikesModalShow(true) : null}><MouseOverPopover likes={likes} userLike={userLike}/> </div>
                                    </div>
                                    :
                                <div style={{ cursor: "pointer", display: "inline", float: "right", color: "#696969", fontFamily: "roboto, sans-serif", fontSize: "20px", display: "flex" }}>
                                        <a onClick={likeCollex} title="Like the collex">
                                            <AiFillLike style={{ color: "#69b1ec", size: "2em" }} onMouseOver={({ target }) => target.style.color = "black"} onMouseOut={({ target }) => target.style.color = "#69b1ec"} />
                                        </a>
                                        <div onClick={likes > 0 ? () => setLikesModalShow(true) : null}><MouseOverPopover likes={likes} userLike={userLike}/> </div>
                                    </div>
                            }
                    </div>
                    {data && userData && userData.user && userData.user.id === data.creatorId ? <a onClick={() => seteditModal(true)} style={{ cursor: "pointer", color: "red" }}>Edit this collex</a> : <></>}

                </div>
                <hr className="solid" />    
                <div className = "cards-section">
                    <div className="playlist-cards">
                         {playlists && playlists.length!=0 ? 
                            playlists.map(item => (
                                <Card key={item._id} style={{ width: '13rem' }}>
                                    <Card.Img variant="top" src={item.cover} />
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>
                                            {item.likes} likes
                                        </Card.Text>
                                        <Link to={`/playlist/${item._id}`}>View this playlist</Link>
                                    </Card.Body>
                                </Card>     
                            ))
                            : <h5 style={{ textAlign: "center", marginTop: "10%", width: "100%"}}>No Playlists added to the Collex yet. Please click the '+' to add a playlist</h5>
                        }
                        
                    </div>
                </div>
                    <hr className="solid" />
                <div className="comment-section">
                    <h2 style={{ fontFamily: "Turret Road, cursive" }}>
                        Comments
                    </h2>
                    <hr />
                    <p style={{ fontStyle: "italic" }}> Interact with the collabrators below ...</p>

                    <Form onSubmit={saveComment} reply>
                        <Form.TextArea required value={commentText} onChange={(e) => saveCommentText(e.target.value)} />
                        <Button type="submit" content='Add Comment' labelPosition='left' icon='edit' primary />
                    </Form>
                    <Comment.Group style={{maxWidth: "none"}}>
                        {comments.length != 0 ? getAddedComments() : <h4 style={{ fontStyle: "italic", fontFamily: "roboto, sans-serif", marginTop: "12px" }}> No comments added to this collex </h4>}
                    </Comment.Group>
                </div>
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    collexid={parameters.collexId}
                />

                <EditCollexModal
                    show={editModal}
                    onHide={() => editModalClose()}
                    collexid={parameters.collexId}
                />
                <LikesModal
                    show={likesModalShow}
                    onHide={() => setLikesModalShow(false)}
                    userLike={userLike}
                    userId={userData.user.id}
                />
                <ToastContainer />
                </div>
            <Footer/>
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
          <span className="collexPageDesc" style={{ cursor: "pointer", display: "inline", float: "right", color: "#696969", fontFamily: "roboto, sans-serif", fontSize: "20px" }}><b>{props.likes} {props.likes == 1 ? "like" : "likes"}</b></span>
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
              Users Who Like This Collex
            </Modal.Title>
          </Modal.Header>
            <Modal.Body>{userIds ? userIds.map((users, index) => <p key={index}><a href={`/user/${users}`}>{usersWhoLiked[users]}{users == props.userId ? " (you!)" : ""}</a></p>) : ""}</Modal.Body>
        </Modal>
    );
  }