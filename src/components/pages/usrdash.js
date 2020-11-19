import React, { useState, useContext, useEffect }from "react";
import Nav2 from "../nav/nav2";
import { Button, Modal, Form } from "react-bootstrap";
import Footer from "../nav/footer";
import UserContext from "../misc/userContext";
import axios from "axios"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { GrAddCircle } from "react-icons/gr";
import { BsFillMusicPlayerFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import MyVerticallyCenteredModal from "../collex/createCollex";
import "../../CSS/pages/usrdash.css"
import { Card } from "react-bootstrap";

import jsonData from '../../jsonFiles/userdash.json';

export default function UsrDash() {
    const [modalShow, setModalShow] = useState(false);
    const [playlists, setUserPlaylists] = useState([]);
    const { userData, setUserData } = useContext(UserContext);
    const [likedPlaylists, setLikedPlaylists] = useState([]);
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

    useEffect(() => {
        const fetchData = async () => {
            const userId = userData.user.id ;
            console.log(userId);
            const result = await axios.get(
                `http://localhost:5000/playlist/playlists/${userId}`,
            ); 
            setUserPlaylists(result.data);
            const likedRes = await axios.get(
                `http://localhost:5000/playlist/likedPlaylists/${userId}`,
            );
            console.log(likedRes.data);
            setLikedPlaylists(likedRes.data);
        };

        fetchData();
    }, []);


    const loadCollex = jsonData.collex.map((jsonData) =>{
      return (
          <Card style={{ width: '15rem' }} id={jsonData.id} creatorId={jsonData.creatorID}>
              <Card.Img variant="top" src={jsonData.cover} height="200" width = "200" />
          <Card.Body>
            <Card.Title><a href= "#">{jsonData.name}</a></Card.Title>
          </Card.Body>
        </Card>
      )
    });

    return (
        <>
            <Nav2 />       
            <div className="dash-body">
                <h2 className="usrdash-title"> Your Playlists <a href="/createPlaylist" title="Create your own playlist"><GrAddCircle size="20px" /></a></h2>

                {playlists.length!==0 ? 
                    <Carousel className="carousel" responsive={responsive} itemClass="cards">
                        {playlists.map(playlist => (
                            <Card style={{ width: '14rem' }} key={playlist._id} >
                                <Card.Img variant="top" src={playlist.cover} height="200" width="150" />
                                <Card.Body>
                                        <Card.Title><Link to={`playlist/${playlist._id}`}>{playlist.name}</Link></Card.Title>
                                </Card.Body>
                            </Card>
                        ))}
                    </Carousel>
                    : <h5 style={{ textAlign: "center", marginTop: "3%" }}>You haven't created any playlists. Please click on the add button and create one</h5>}
                
                {playlists.length > 0 ? <a href="#" style={{ float: "right" }}> View All Playlists >>></a> : <></> }
                <hr className="solid-divider" />
                <h2 className="usrdash-title"> Liked Playlists</h2>
                {likedPlaylists.length !== 0 ?
                    <Carousel className="carousel" responsive={responsive} itemClass="cards">
                        {likedPlaylists.map(playlist => (
                            <Card style={{ width: '14rem' }} key={playlist._id} >
                                <Card.Img variant="top" src={playlist.cover} height="200" width="150"/>
                                <Card.Body>
                                    <Card.Title><Link to={`playlist/${playlist._id}`}>{playlist.name}</Link></Card.Title>
                                </Card.Body>
                            </Card>
                        ))}
                    </Carousel>
                    : <h5 style={{ textAlign: "center", marginTop: "3%" }}>You haven't liked any playlists. Please click on the like button when you view a playlist page</h5>}
                {playlists.length > 0 ? <a href="#" style={{ float: "right" }}> View Liked Playlists >>></a> : <></>}

                <hr className="solid-divider" />
                <h2 className="usrdash-title"> Liked Collections <a title="Create Collex" href="#" onClick={() => setModalShow(true)}><GrAddCircle size="20px" /></a>
                    <a title="Explore Collex Gallery" href="/collexDash"><BsFillMusicPlayerFill size="20px" /></a></h2>
                <Carousel  className="carousel" responsive={responsive} itemClass="cards">
                    {loadCollex}
                </Carousel>
                {playlists.length > 0 ? <a href="#" style={{ float: "right" }}> View Liked Collex >>></a> : <></>}

                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>
            <Footer/>
        </>   
    ); 
}
