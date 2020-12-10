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
import { remove } from "js-cookie";


export default function EditCollexModal(props) {
    const [error, setError] = useState();
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const collexId = props.collexid;
            console.log(collexId);
            const playlistRes = await Axios.get(
                `http://localhost:5000/collex/playlists/${collexId}`
            );
            setPlaylists(playlistRes.data.playlists);
        };

        fetchData();
    }, []);

    const removePlaylist = async (playlist) => {
        try {        
            if (window.confirm("Are you sure you want to remove this playlist?")) {
                if (playlists.includes(playlist, 0)) {
                    console.log(playlist);

                    var removeIndex = playlists.map(function (item) { return item._id; }).indexOf(playlist._id);
                    console.log(removeIndex);
                    var copy = [...playlists];
                    copy.splice(removeIndex, 1);
                    setPlaylists(copy);

                    const collexId = props.collexid;
                    const info = { playlist, collexId}
                    const removePlaylist = await Axios.post(
                        `http://localhost:5000/collex/removePlaylist/`,
                        info
                    );
                    
                    toast.warning(`Removed ${playlist.name} from Collex`, { position: "bottom-center" });
                }
            }
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    }
    function getPlaylists() {
        const renderPlaylists = playlists.map((item, id) => {
            return (
                < ListGroup.Item key={item._id} variant="danger" action onClick={() => removePlaylist(item) }>
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
                       Edit Collex
                </Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <p style={{ fontStyle: "italic" }}>You are the owner of this Collex so have the privilege to edit this Collex.<b> People have contributed to the this so please edit wisely. </b></p>
                    {error && (
                        <ErrorNotice message={error} clearError={() => setError(undefined)} />
                    )}
                    <p style={{ fontStyle: "italic" }}>Below are your collex playlists. <b>Click on the playlist to remove it from the collex</b></p>
                    <div className="user-playlists">
                        {playlists.length != 0 ? <>
                            <ListGroup>
                                {getPlaylists()}
                            </ListGroup>

                        </> : <h2 style={{ textAlign: "center", fontStyle: "italic", fontFamily: "roboto, sans-serif", marginTop: "12px" }}> No playlists are added to this collex</h2>}
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