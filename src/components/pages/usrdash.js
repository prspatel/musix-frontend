import React, { useState }from "react";
import Nav2 from "../nav/nav2";
import { Button, Modal, Form } from "react-bootstrap";
import Footer from "../nav/footer";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { GrAddCircle } from "react-icons/gr";
import { BsFillMusicPlayerFill } from "react-icons/bs";

import "../../CSS/pages/usrdash.css"
import { Card } from "react-bootstrap";

export default function UsrDash() {
    const [modalShow, setModalShow] = useState(false);
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 7
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

    return (
        <>
            <Nav2 />
            <h2 className="usrdash-title"> Your Playlists <a href="/createPlaylist" title="Create your own playlist"><GrAddCircle size="20px" /></a></h2>
            <div className="dash-body">
                <Carousel  className="carousel" responsive={responsive} itemClass="cards">
                    <Card style={{ width: '13rem' }}>
                      <Card.Img variant="top" src="https://okayplayer-wpengine.netdna-ssl.com/wp-content/uploads/2013/09/Drake-NWTS-big-ghost-review2.jpg" />
                      <Card.Body>
                        <Card.Title>Playlist 1</Card.Title>
                      </Card.Body>
                    </Card>
                    <Card style={{ width: '13rem' }}>
                    <Card.Img variant="top" src="https://media.pitchfork.com/photos/5d7285360db1d10008f1fa96/1:1/w_600/weloveyoutecca_tecca.jpeg" />
                      <Card.Body>
                        <Card.Title>Playlist 2</Card.Title>
                      </Card.Body>
                    </Card>
                    <Card style={{ width: '13rem' }}>
                    <Card.Img variant="top" src="https://i.pinimg.com/originals/80/21/6c/80216c94ee1dc035d7b9ebebc4fa5bc9.jpg" />
                      <Card.Body>
                        <Card.Title>Playlist 3</Card.Title>
                      </Card.Body>
                    </Card>
                    <Card style={{ width: '13rem' }}>
                    <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Taylor_Swift_-_1989.png/220px-Taylor_Swift_-_1989.png" />
                      <Card.Body>
                        <Card.Title>Playlist 4</Card.Title>
                      </Card.Body>
                    </Card>
                    <Card style={{ width: '13rem' }}>
                    <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/en/5/51/Michael_Jackson_-_Bad.png" />
                      <Card.Body>
                        <Card.Title>Playlist 5</Card.Title>
                      </Card.Body>
                    </Card>
                    <Card style={{ width: '13rem' }}>
                        <Card.Img variant="top" src="https://okayplayer-wpengine.netdna-ssl.com/wp-content/uploads/2013/09/Drake-NWTS-big-ghost-review2.jpg" />
                        <Card.Body>
                            <Card.Title>Playlist 1</Card.Title>
                        </Card.Body>
                    </Card>
                </Carousel>
                <hr className="solid" />
                <h2 className="usrdash-title"> Liked Playlists</h2>
                <Carousel  className="carousel" responsive={responsive} itemClass="cards">
                    <Card style={{ width: '13rem' }}>
                      <Card.Img variant="top" src="https://okayplayer-wpengine.netdna-ssl.com/wp-content/uploads/2013/09/Drake-NWTS-big-ghost-review2.jpg" />
                      <Card.Body>
                        <Card.Title>Playlist 1</Card.Title>
                      </Card.Body>
                    </Card>
                    <Card style={{ width: '13rem' }}>
                    <Card.Img variant="top" src="https://media.pitchfork.com/photos/5d7285360db1d10008f1fa96/1:1/w_600/weloveyoutecca_tecca.jpeg" />
                      <Card.Body>
                        <Card.Title>Playlist 2</Card.Title>
                      </Card.Body>
                    </Card>
                    <Card style={{ width: '13rem' }}>
                    <Card.Img variant="top" src="https://i.pinimg.com/originals/80/21/6c/80216c94ee1dc035d7b9ebebc4fa5bc9.jpg" />
                      <Card.Body>
                        <Card.Title>Playlist 3</Card.Title>
                      </Card.Body>
                    </Card>
                    <Card style={{ width: '13rem' }}>
                    <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Taylor_Swift_-_1989.png/220px-Taylor_Swift_-_1989.png" />
                      <Card.Body>
                        <Card.Title>Playlist 4</Card.Title>
                      </Card.Body>
                    </Card>
                    <Card style={{ width: '13rem' }}>
                    <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/en/5/51/Michael_Jackson_-_Bad.png" />
                      <Card.Body>
                        <Card.Title>Playlist 5</Card.Title>
                      </Card.Body>
                    </Card>
                    <Card style={{ width: '13rem' }}>
                        <Card.Img variant="top" src="https://okayplayer-wpengine.netdna-ssl.com/wp-content/uploads/2013/09/Drake-NWTS-big-ghost-review2.jpg" />
                        <Card.Body>
                            <Card.Title>Playlist 1</Card.Title>
                        </Card.Body>
                    </Card>
                </Carousel>
                <hr className="solid" />
                <h2 className="usrdash-title"> Liked Collections <a title="Create Collex" href="#" onClick={() => setModalShow(true)}><GrAddCircle size="20px" /></a>
                    <a title="Explore Collex Gallery" href="/collexDash"><BsFillMusicPlayerFill size="20px" /></a></h2>
                <Carousel  className="carousel" responsive={responsive} itemClass="cards">
                    <Card style={{ width: '13rem' }}>
                      <Card.Img variant="top" src="https://okayplayer-wpengine.netdna-ssl.com/wp-content/uploads/2013/09/Drake-NWTS-big-ghost-review2.jpg" />
                      <Card.Body>
                        <Card.Title>Playlist 1</Card.Title>
                      </Card.Body>
                    </Card>
                    <Card style={{ width: '13rem' }}>
                    <Card.Img variant="top" src="https://media.pitchfork.com/photos/5d7285360db1d10008f1fa96/1:1/w_600/weloveyoutecca_tecca.jpeg" />
                      <Card.Body>
                        <Card.Title>Playlist 2</Card.Title>
                      </Card.Body>
                    </Card>
                    <Card style={{ width: '13rem' }}>
                    <Card.Img variant="top" src="https://i.pinimg.com/originals/80/21/6c/80216c94ee1dc035d7b9ebebc4fa5bc9.jpg" />
                      <Card.Body>
                        <Card.Title>Playlist 3</Card.Title>
                      </Card.Body>
                    </Card>
                    <Card style={{ width: '13rem' }}>
                    <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Taylor_Swift_-_1989.png/220px-Taylor_Swift_-_1989.png" />
                      <Card.Body>
                        <Card.Title>Playlist 4</Card.Title>
                      </Card.Body>
                    </Card>
                    <Card style={{ width: '13rem' }}>
                    <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/en/5/51/Michael_Jackson_-_Bad.png" />
                      <Card.Body>
                        <Card.Title>Playlist 5</Card.Title>
                      </Card.Body>
                    </Card>
                    <Card style={{ width: '13rem' }}>
                        <Card.Img variant="top" src="https://okayplayer-wpengine.netdna-ssl.com/wp-content/uploads/2013/09/Drake-NWTS-big-ghost-review2.jpg" />
                        <Card.Body>
                            <Card.Title>Playlist 1</Card.Title>
                        </Card.Body>
                    </Card>
                </Carousel>
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>
            <Footer/>
        </>   
    ); 
}

function MyVerticallyCenteredModal(props) {
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
                        <Form.Group>
                            <Form.Label>Upload an image for your collex</Form.Label>
                            <Form.File
                                id="custom-file"
                                label="Custom file input"
                                custom
                            />
                        </Form.Group>
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