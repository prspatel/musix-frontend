import { Button, Modal, Form } from "react-bootstrap";
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'
import React, { useState } from "react";

const imageslinks = ["https://i.pinimg.com/564x/a5/be/c0/a5bec0a5b1c45b71c97cbd4b112e7f34.jpg", "https://i.pinimg.com/564x/a5/be/c0/a5bec0a5b1c45b71c97cbd4b112e7f34.jpg", "https://i.pinimg.com/564x/a5/be/c0/a5bec0a5b1c45b71c97cbd4b112e7f34.jpg",
    "https://i.pinimg.com/564x/a5/be/c0/a5bec0a5b1c45b71c97cbd4b112e7f34.jpg", "https://i.pinimg.com/564x/a5/be/c0/a5bec0a5b1c45b71c97cbd4b112e7f34.jpg"];


export default function MyVerticallyCenteredModal(props) {

    const [selectedimage, setImage] = useState(null);

    function onPick(image) {
        setImage(image);
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
                <p style={{ fontStyle: "italic" }}>Collex is a collection of playlists which will be publicly accesed by other user. Other users can add their playlist to the collex to extend collection on the topic</p>
                <p>
                    <Form>
                        <Form.Group>
                            <Form.Label>Collex Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name for collex" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Description" />
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
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}