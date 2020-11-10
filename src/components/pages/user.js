import React, {  useState, useEffect, useContext } from "react";
import Card from 'react-bootstrap/Card';
import { Link,  useParams }  from 'react-router-dom'
import Nav2 from "../nav/nav2";
import Footer from "../nav/footer";
import { Button, Modal, Form } from "react-bootstrap";
import ErrorNotice from "../misc/error";
import Axios from "axios";
import UserContext from "../misc/userContext";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "../../CSS/pages/playlist.scss"
import "../../CSS/pages/usrdash.css"
import "../../CSS/collex/collexPage.css"

export default function User() {
    const  parameters = useParams();
    const [modalShow, setModalShow] = useState(false);
    const { userData } = useContext(UserContext);
    const [sameUser, setSameUser] = useState(true);
    const [user, setUser] = useState();
    const [playlists, setPlaylist] = useState([]);

    const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
    };

    useEffect(() => {
        const fetchData = async () => {
           
            const userId = parameters.userId;
            const result = await Axios.get(
                `http://localhost:5000/users/${userId}`
            );
            console.log(result.data);
            setUser(result.data);

            const resPlaylist = await Axios.get(
                `http://localhost:5000/playlist/public/${userId}`
            );
            console.log(resPlaylist.data);
            setPlaylist(resPlaylist.data);

        };

        fetchData();
    }, []);


        
    return(
        <>
        <Nav2/>
        <div className="playlistPage">
                <div className="mainInner">
                      <div className="playlistPageInfo">
                            <div className="userPageContent">
                                <p className="largeText uppercase bold">User</p>
                                <div className="userHeader">
                                <h1 style={{ display: "inline" }}>{user ? (user.name) : (<></>)}</h1>
                                {userData && userData.user && userData.user.id === parameters.userId ? 
                                    <a title="Click to Change Password" onClick={() => setModalShow(true)} style={{ cursor: "pointer", color: "black" }}>
                                        <h5 style={{ fontFamily: "circular-black", display: "inline", float: "right" }}> Change password</h5> </a>
                                    :<></>
                                }
                                    
                                </div>
                                <p className="tagline">
                                    Date of Birth: {user ? (user.dob) : (<></>)}    
                                </p>
                                <p className="tagline">
                                    Email: {user ? (user.email  ) : (<></>)}
                                </p>
                                 <div className="playlistPageDesc">
                                    <p style={{ fontSize: "15px" }}>Joined Musix in 2020</p>
                                 </div>
                                 <div className="playlistPageDesc">
                                   <p style={{ fontSize: "15px" }}>Total Playlist Time: 4hr 35 min</p>
                                </div>
                                <h2 style={{ fontStyle: "Roboto, sans-sarif", margin: "2% 0 2% 0%" }}>Public Playlists </h2>

                                {playlists.length !== 0 ?
                                    <Carousel className="carousel" responsive={responsive} itemClass="cards">
                                        {playlists.map(playlist => (
                                            <Card style={{ width: '13rem' }} key={playlist._id} >
                                                <Card.Img variant="top" src={playlist.cover} />
                                                <Card.Body>
                                                    <Card.Title><Link to={`/playlist/${playlist._id}`}>{playlist.name}</Link></Card.Title>
                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </Carousel>
                                    : <h5 style={{ textAlign: "center", marginTop: "3%" }}>You haven't created any publicplaylists.</h5>}
                            </div>
                      </div>
                </div>
                
           
                <ChangePasswordModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    userid={parameters.userId}
                />
        </div>
        <Footer/>
        </>
    )
}

function ChangePasswordModal(props) {
    const [error, setError] = useState();
    const [currentPassword, setCurrentPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [callbackMsg, setCallbackMsg] = useState({ msg: undefined });
    const passwordSubmit = async (e) => {
        e.preventDefault();
        try {
            let userId = props.userid; 
            const passwordChange = { userId, currentPassword, newPassword, confirmPassword };
            const passwordRes = await Axios.post(
                "http://localhost:5000/users/changePassword",
                passwordChange
            );
            setCallbackMsg({ msg: passwordRes.data.msg });
           

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
                    Change Password
                </Modal.Title>

            </Modal.Header>
            {callbackMsg.msg ? (<h5 style={{ padding: "2%", color: "green" }}>{callbackMsg.msg}</h5>) : (
                <Modal.Body>
                    <p style={{ fontStyle: "italic" }}>You can change your password by putting in your current password and create new one which has to be atleast 5 characters</p>
                    {error && (
                        <ErrorNotice message={error} clearError={() => setError(undefined)} />
                    )}

                    <Form onSubmit={passwordSubmit}>
                        <Form.Group>
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control name="currentPassword" type="password" placeholder="Enter your current password" onChange={(e) => setCurrentPassword(e.target.value)} required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>New Password</Form.Label>
                            <Form.Control name="newPassword" type="password" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control name="confirmPassword" type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} required />
                        </Form.Group>
                        <Button type="submit">Change Password</Button>
                    </Form>

                </Modal.Body>
            )}
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}