import React from "react";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'
import Nav2 from "../nav/nav2";
import Footer from "../nav/footer";

import jsonData from '../../jsonFiles/userdash.json';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import "../../CSS/pages/playlist.scss"
import "../../CSS/pages/usrdash.css"
import "../../CSS/collex/collexPage.css"

export default function User () {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7
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
    const dataPlaylist = jsonData.userPlaylists.map((playlist, id) => {
        return (
            <Link to={`/playlist/` + playlist.id} key={id}>
                <Card className="card" key={id} style={{ width: '13rem' }}>
                    <Card.Img variant="top" src={playlist.img} />
                    <Card.Body>
                        <Card.Title>{playlist.name}</Card.Title>
                        <Card.Text>{playlist.desc}</Card.Text>
                    </Card.Body>
                </Card>
            </Link >
        )
    });

        
    return(
        <>
        <Nav2/>
        <div className="playlistPage">
        <div className="mainInner">
          <div className="playlistPageInfo">
            <div className="userPageContent">
              <p className="largeText uppercase bold">User</p>
              <h1>Jessica Guan</h1>

              <p className="tagline">
                Date of Birth: 01/01/2020
              </p>
                 <div className="playlistPageDesc">
                   <p style={{ fontSize: "15px" }}>Joined Musix in 2020</p>
              </div>
                <div className="playlistPageDesc">               
                   <p style={{ fontSize: "15px" }}>Total Playlist Time: 4hr 35 min</p>
              </div>
            </div>
          </div>
                </div>
                <h2 style={{ fontStyle:"Roboto, sans-sarif", margin:"2% 0 2% 22%"}}>Public Playlists </h2>
                <Carousel className="carousel" responsive={responsive} itemClass="cards">
                    {dataPlaylist}
              </Carousel>
        </div>
        <Footer/>
        </>
    )
}