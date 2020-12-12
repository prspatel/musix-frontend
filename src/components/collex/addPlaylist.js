import React, { useState, useContext, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import 'react-image-picker/dist/index.css'
import "../../CSS/collex/addPlaylist.css"
import Axios from "axios";
import { useHistory } from "react-router-dom";
import ErrorNotice from "../misc/error";
import { ToastContainer, toast } from 'react-toastify';
import { SearchFunction } from "../misc/search";
import UserContext from "../misc/userContext";
import { ListGroup } from "react-bootstrap";


export default function MyVerticallyCenteredModal(props) {

    const history = useHistory();
    const [error, setError] = useState();
    const [playlists, setUserPlaylists] = useState([]);
    const { userData } = useContext(UserContext);

    const [searchResults, setResults] = useState({
        playlists: null,
        loading: false,
        value: ""
    });


    useEffect(() => {
        const fetchData = async () => {
            const userId = userData.user.id;
            const result = await Axios.get(
                `/api//playlist/public/${userId}`,
            );
            setUserPlaylists(result.data.playlists);
        };

        fetchData();
    }, []);

 
    let searchHandler = async e => {
        if (e.target.value) 
            search(e.target.value);
        setResults({ value: e.target.value });
    };

    let search = async val => {
        setResults({ loading: true });
        const userId = userData.user.id;

        const res = await SearchFunction(
            `/api/playlist/search/${userId}/${val}`

        );
        let playlists = [];
        if (res) {
            playlists = [...res.playlists];
            setResults({ playlists, loading: false });
        }

    };  

    const addPlaylistToCollex = async (playlist) => {
        try {
            console.log(playlist)
            const collexId = props.collexid
            console.log(collexId)

            const  addRes= await Axios.post(
                "/api/collex/addPlaylist",
                { playlist, collexId }
            );
            toast.success(" Playlist was added successfully to this Collex", { position: "bottom-center" });
            props.onHide();
            window.location.reload(false)

        } catch (err) {
            toast.error(" Playlist is already added to the collex", { position: "bottom-center" });
            err.response.data.msg && setError(err.response.data.msg);
        }
    };

    function getPlaylists() {
        const renderPlaylists = playlists.map((item, id) => {
            return (
                < ListGroup.Item key={id} variant="success" action onClick={()=>addPlaylistToCollex(item) }>
                    <div className="list-item">
                        <h5>{item.name}</h5>
                        <div className="list-icons" >
                            <p>{item.likes} likes</p>
                        </div>
                        <p>{item.description}</p>
                    </div>
                </ListGroup.Item >
            )
        });
        return renderPlaylists;
    }


    function displaySearchResults() {
        let collexs = <h1 style={{ textAlign: "center" }}>No Search Results matches the text above!</h1>;

        if (searchResults.playlists.length === 0) {
            return collexs;
        }
        if (searchResults.playlists) {
            collexs = searchResults.playlists.map(item => (
                < ListGroup.Item key={item._id} variant="success" action onClick={() => addPlaylistToCollex(item)}>
                    <div className="list-item">
                        <h5>{item.name}</h5>
                        <div className="list-icons" >
                            <p>{item.likes} likes</p>
                        </div>
                        <p>{item.description}</p>
                    </div>
                </ListGroup.Item>))
        }
        return collexs;
    }
    
    return (
        <>
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add a Playlist
                </Modal.Title>

            </Modal.Header>
            <Modal.Body>
                <p style={{ fontStyle: "italic" }}>Add a playlist to this collex by searching through your playlists. You cannot add private playlists to the collex</p>
                {error && (
                    <ErrorNotice message={error} clearError={() => setError(undefined)} />
                )}
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search your playlists here."
                            onChange={e => searchHandler(e)}    
                            value={setResults.value}
                        />
                    </div>
                    <p style={{ fontStyle: "italic" }}>Below are your public playlists. <b>Click on the playlist to add it to the Collex.</b></p>
                    <div className="user-playlists">
                        {
                            searchResults.playlists ?
                                <ListGroup>
                                    {displaySearchResults()}
                                </ListGroup>
                            :
                            playlists.length != 0 ? <>
                            <ListGroup>
                                {getPlaylists()}
                            </ListGroup>

                        </> : <h2 style={{ textAlign: "center", fontStyle: "italic", fontFamily: "roboto, sans-serif", marginTop: "12px" }}> You haven't created any playlists </h2>}
                    </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
        <ToastContainer />
        </>
    );
}