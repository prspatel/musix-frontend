import React from "react";
import Nav2 from "../nav/nav2";

import Footer from "../nav/footer";
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import "../../CSS/pages/usrdash.css"
import { Card } from "react-bootstrap";

export default function UsrDash() {

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 4
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
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
            <div className="usrdash-title"> Your Playlists </div>
            <Carousel  className="carousel" responsive={responsive} itemClass="cards">
                <Card style={{ width: '10rem' }}>
                  <Card.Img variant="top" src="https://okayplayer-wpengine.netdna-ssl.com/wp-content/uploads/2013/09/Drake-NWTS-big-ghost-review2.jpg" />
                  <Card.Body>
                    <Card.Title>Playlist 1</Card.Title>
                  </Card.Body>
                </Card>
                <Card style={{ width: '10rem' }}>
                <Card.Img variant="top" src="https://media.pitchfork.com/photos/5d7285360db1d10008f1fa96/1:1/w_600/weloveyoutecca_tecca.jpeg" />
                  <Card.Body>
                    <Card.Title>Playlist 2</Card.Title>
                  </Card.Body>
                </Card>
                <Card style={{ width: '10rem' }}>
                <Card.Img variant="top" src="https://i.pinimg.com/originals/80/21/6c/80216c94ee1dc035d7b9ebebc4fa5bc9.jpg" />
                  <Card.Body>
                    <Card.Title>Playlist 3</Card.Title>
                  </Card.Body>
                </Card>
                <Card style={{ width: '10rem' }}>
                <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Taylor_Swift_-_1989.png/220px-Taylor_Swift_-_1989.png" />
                  <Card.Body>
                    <Card.Title>Playlist 4</Card.Title>
                  </Card.Body>
                </Card>
                <Card style={{ width: '10rem' }}>
                <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/en/5/51/Michael_Jackson_-_Bad.png" />
                  <Card.Body>
                    <Card.Title>Playlist 5</Card.Title>
                  </Card.Body>
                </Card>
            </Carousel>
            <div className="usrdash-title"> Liked Playlists </div>
            <Carousel  className="carousel" responsive={responsive} itemClass="cards">
                <Card style={{ width: '10rem' }}>
                  <Card.Img variant="top" src="https://okayplayer-wpengine.netdna-ssl.com/wp-content/uploads/2013/09/Drake-NWTS-big-ghost-review2.jpg" />
                  <Card.Body>
                    <Card.Title>Playlist 1</Card.Title>
                  </Card.Body>
                </Card>
                <Card style={{ width: '10rem' }}>
                <Card.Img variant="top" src="https://media.pitchfork.com/photos/5d7285360db1d10008f1fa96/1:1/w_600/weloveyoutecca_tecca.jpeg" />
                  <Card.Body>
                    <Card.Title>Playlist 2</Card.Title>
                  </Card.Body>
                </Card>
                <Card style={{ width: '10rem' }}>
                <Card.Img variant="top" src="https://i.pinimg.com/originals/80/21/6c/80216c94ee1dc035d7b9ebebc4fa5bc9.jpg" />
                  <Card.Body>
                    <Card.Title>Playlist 3</Card.Title>
                  </Card.Body>
                </Card>
                <Card style={{ width: '10rem' }}>
                <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Taylor_Swift_-_1989.png/220px-Taylor_Swift_-_1989.png" />
                  <Card.Body>
                    <Card.Title>Playlist 4</Card.Title>
                  </Card.Body>
                </Card>
                <Card style={{ width: '10rem' }}>
                <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/en/5/51/Michael_Jackson_-_Bad.png" />
                  <Card.Body>
                    <Card.Title>Playlist 5</Card.Title>
                  </Card.Body>
                </Card>
            </Carousel>
            <div className="usrdash-title"> Liked Collections </div>
            <Carousel  className="carousel" responsive={responsive} itemClass="cards">
                <Card style={{ width: '10rem' }}>
                  <Card.Img variant="top" src="https://okayplayer-wpengine.netdna-ssl.com/wp-content/uploads/2013/09/Drake-NWTS-big-ghost-review2.jpg" />
                  <Card.Body>
                    <Card.Title>Playlist 1</Card.Title>
                  </Card.Body>
                </Card>
                <Card style={{ width: '10rem' }}>
                <Card.Img variant="top" src="https://media.pitchfork.com/photos/5d7285360db1d10008f1fa96/1:1/w_600/weloveyoutecca_tecca.jpeg" />
                  <Card.Body>
                    <Card.Title>Playlist 2</Card.Title>
                  </Card.Body>
                </Card>
                <Card style={{ width: '10rem' }}>
                <Card.Img variant="top" src="https://i.pinimg.com/originals/80/21/6c/80216c94ee1dc035d7b9ebebc4fa5bc9.jpg" />
                  <Card.Body>
                    <Card.Title>Playlist 3</Card.Title>
                  </Card.Body>
                </Card>
                <Card style={{ width: '10rem' }}>
                <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Taylor_Swift_-_1989.png/220px-Taylor_Swift_-_1989.png" />
                  <Card.Body>
                    <Card.Title>Playlist 4</Card.Title>
                  </Card.Body>
                </Card>
                <Card style={{ width: '10rem' }}>
                <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/en/5/51/Michael_Jackson_-_Bad.png" />
                  <Card.Body>
                    <Card.Title>Playlist 5</Card.Title>
                  </Card.Body>
                </Card>
            </Carousel>
            <Footer/>
        </>   
    ); 
}

