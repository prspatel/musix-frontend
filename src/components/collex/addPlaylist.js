import React, { useState, useContext, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import 'react-image-picker/dist/index.css'
import "../../CSS/collex/addPlaylist.css"
import Axios from "axios";
import { useHistory } from "react-router-dom";
import ErrorNotice from "../misc/error";
import { ToastContainer, toast } from 'react-toastify';
import { Search } from "../misc/search";
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
            console.log(userId);
            const result = await Axios.get(
                `http://localhost:5000/playlist/public/${userId}`,
            );
            console.log(result.data);
            setUserPlaylists(result.data);
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
            `http://localhost:5000/playlist/search/${val}`
        );
        let playlists = [];
        if (res) {
            playlists = [...res.playlists];
            console.log(playlists);
            setResults({ playlists, loading: false });
        }

    };  

    function getPlaylists() {
        const renderPlaylists = playlists.map((item, id) => {
            return (
                < ListGroup.Item key={id} variant = "success">
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
                < ListGroup.Item key={item._id} variant="success">
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
    const addPlaylist = async (e) => {
        try {
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
                    Add a Playlist
                </Modal.Title>

            </Modal.Header>
            <Modal.Body>
                <p style={{ fontStyle: "italic" }}>Add a playlist to this collex by searching through your playlists. You cannot add private playlists to the collex</p>
                {error && (
                    <ErrorNotice message={error} clearError={() => setError(undefined)} />
                )}
                <Form onSubmit={addPlaylist}>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search your playlists here."
                            onChange={e => searchHandler(e)}    
                            value={setResults.value}
                        />
                    </div>
                    <p style={{ fontStyle: "italic" }}>Below are your public playlists</p>
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
                    <Button type="submit">Add Playlist</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}