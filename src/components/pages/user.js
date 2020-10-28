import React from "react";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'
import Nav2 from "../nav/nav2";
import Footer from "../nav/footer";


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
    const dataPlaylists = [
        {
          id: 101,
          category_id: 3,
          name: 'Home playlist 1',
          img:
            'https://images.unsplash.com/photo-1587151711096-23c51f92c920?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
          desc: 'Lorem ipsum',
        },
        {
          id: 102,
          category_id: 3,
          name: 'Home playlist 2',
          img:
            'https://images.unsplash.com/photo-1587151711096-23c51f92c920?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
          desc: 'Lorem ipsum',
        },
        {
          id: 103,
          category_id: 3,
          name: 'Home playlist 3',
          img:
            'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
          desc: 'Lorem ipsum',
        },
        {
          id: 103,
          category_id: 3,
          name: 'Home playlist 3',
          img:
            'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
          desc: 'Lorem ipsum',
        },
        {
          id: 103,
          category_id: 3,
          name: 'Home playlist 3',
          img:
            'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
          desc: 'Lorem ipsum',
        },
        {
          id: 103,
          category_id: 3,
          name: 'Home playlist 3',
          img:
            'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
          desc: 'Lorem ipsum',
        },
        {
          id: 103,
          category_id: 3,
          name: 'Home playlist 3',
          img:
            'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
          desc: 'Lorem ipsum',
        },
        {
          id: 103,
          category_id: 3,
          name: 'Home playlist 3',
          img:
            'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
          desc: 'Lorem ipsum',
        },
        {
          id: 103,
          category_id: 3,
          name: 'Home playlist 3',
          img:
            'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
          desc: 'Lorem ipsum',
        },
        {
          id: 103,
          category_id: 3,
          name: 'Home playlist 3',
          img:
            'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
          desc: 'Lorem ipsum',
        },
        {
          id: 103,
          category_id: 3,
          name: 'Home playlist 3',
          img:
            'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
          desc: 'Lorem ipsum',
        },
        {
          id: 103,
          category_id: 3,
          name: 'Home playlist 3',
          img:
            'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
          desc: 'Lorem ipsum',
        },
        {
          id: 103,
          category_id: 3,
          name: 'Home playlist 3',
          img:
            'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
          desc: 'Lorem ipsum',
        },
        {
          id: 104,
          category_id: 1,
          name: 'Focus playlist 1',
          img:
            'https://images.unsplash.com/photo-1587151711096-23c51f92c920?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
          desc: 'Lorem ipsum',
        },
        {
          id: 105,
          category_id: 4,
          name: 'Sunday playist',
          img:
            'https://images.unsplash.com/photo-1587143602695-c980e283be9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2702&q=80',
          desc: 'Lorem ipsum',
        },
        {
          id: 106,
          category_id: 2,
          name: 'Mood playist 1 ',
          img:
            'https://images.unsplash.com/photo-1587220111918-7a5c0f0c46f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
          desc: 'Lorem ipsum',
        },
        {
          id: 107,
          category_id: 2,
          name: 'Mood playist 2',
          img:
            'https://images.unsplash.com/photo-1587151711096-23c51f92c920?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
          desc: 'Lorem ipsum',
        },
      ]

        
    return(
        <>
        <Nav2/>
        <div className="playlistPage">
        <div className="mainInner">
          <div className="playlistPageInfo">
            <div className="playlistPageContent">
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
                <h2 style={{ fontStyle:"Roboto, sans-sarif", margin:"2% 0 2% 10%"}}>Public Playlists </h2>
              <Carousel className="carousel" responsive={responsive} itemClass="cards">
                    {dataPlaylists.map((playlist, id) => (
                        <Link to={`/playlist/` + playlist.id} key={id}>
                        <Card className="card" key={id} style={{ width: '13rem'}}>
                            <Card.Img variant="top" src={playlist.img} />
                              <Card.Body>
                                <Card.Title>{playlist.name}</Card.Title>
                                <Card.Text>{playlist.desc}</Card.Text>
                              </Card.Body>
                        </Card>
                        </Link>
                    ))}
              </Carousel>
        </div>
        <Footer/>
        </>
    )
}