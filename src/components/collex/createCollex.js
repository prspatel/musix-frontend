import { Button, Modal, Form } from "react-bootstrap";
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'
import React, { useState } from "react";
import "../../CSS/collex/createCollex.css"
import Axios from "axios";
import { useHistory } from "react-router-dom";
import ErrorNotice from "../misc/error";
import { ToastContainer, toast } from 'react-toastify';

const imageslinks = ["https://i.pinimg.com/564x/a5/be/c0/a5bec0a5b1c45b71c97cbd4b112e7f34.jpg", "https://i.pinimg.com/236x/8a/f8/d8/8af8d84492c442f6c35147e74ac5a66f.jpg", "https://i.pinimg.com/236x/6b/f1/95/6bf19514d6b2c19f23a345cd85a937eb.jpg",
    "https://i.pinimg.com/236x/47/0a/b6/470ab64e2c181bca6520e744d70da5f5.jpg", "https://i.pinimg.com/236x/10/52/69/105269e5cad0204f07a74b6c2b9ac364.jpg", "https://i.pinimg.com/236x/20/78/9f/20789f8bfa94b7a5e3958b8a114e7951.jpg"
    , "https://i.pinimg.com/236x/e9/e1/07/e9e107d58fd5e88f608c0aa249378c2f.jpg", "https://i.pinimg.com/236x/79/21/22/792122828c893ae7d5079509d147fc10.jpg"];


export default function MyVerticallyCenteredModal(props) {

    const [collexPic, setImage] = useState(null);
    const [collexName,setName] = useState(null);
    const [collexDesc,setDesc] = useState(null);

    const history = useHistory();
    const [error, setError] = useState();

    function onPick(image) {
        setImage(image.src);
    };
    const createCollex = async (e) => {
        e.preventDefault();
        try {
            const userId = props.userId;
            const collex = { collexName, collexDesc, collexPic, userId };
            console.log(collex);
            const loginRes = await Axios.post(
                "http://localhost:5000/collex/create",
                collex
            );
            const id = loginRes.data.id;
            toast.success("New Collex successfully created", { position: "bottom-center" });
            props.onHide();
            history.push(`/collex/${id}`);
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
                    Create Collex
                </Modal.Title>

            </Modal.Header>
            <Modal.Body>
                <p style={{ fontStyle: "italic" }}>Collex is a collection of playlists which will be publicly accesed by other user. Other users can add their playlist to the collex to extend collection on the topic.
                    The name can only be 19 character long.</p>
                {error && (
                    <ErrorNotice message={error} clearError={() => setError(undefined)} />
                )}
                <Form onSubmit={createCollex}>
                        <Form.Group>
                            <Form.Label>Collex Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name for collex" onChange={(e) => setName(e.target.value)} maxLength= "19" required/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Description" onChange={(e) => setDesc(e.target.value)} required/>
                        </Form.Group>
                        <Form.Label>Choose Your Collex Profile</Form.Label>
                        <div className= "imagePicker">
                            <ImagePicker
                                images={imageslinks.map((image, i) => ({ src: image, value: i }))}
                                onPick={onPick}
                            />
                        </div>
                        <Button type="submit">Create Collex</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}