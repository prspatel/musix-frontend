import React from "react";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'
import Nav2 from "../nav/nav2";
import Footer from "../nav/footer";

import { ReactComponent as PlayIcon } from '../../images/play.svg'

import "../../CSS/pages/playlist.scss"

export default function User () {
    const dataPlaylists = [
        {
          id: 101,
          category_id: 3,
          name: 'Home playlist 1',
          img:
            'https://images.unsplash.com/photo-1587201572498-2bc131fbf113?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=924&q=80',
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
            'https://images.unsplash.com/photo-1587165282385-fe9bbf5eb1a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
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
            'https://images.unsplash.com/photo-1587169544748-d21bd810f57e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
          desc: 'Lorem ipsum',
        },
      ]

        
    return(
        <>
        <Nav2/>
        <div className="playlistPage">
        <div className="mainInner">
          <div className="playlistPageInfo">
            <div className="playlistPageImage">
              <img
                src="https://images.unsplash.com/photo-1587201572498-2bc131fbf113?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=924&q=80"
                alt="pic"
              />
            </div>
            <div className="playlistPageContent">
              <p className="smallText uppercase bold">User</p>
              <h1>Jessica Guan</h1>

              <p className="tagline">
                Date of Birth: 01/01/2020
              </p>
              <div className="playlistPageDesc">
                <span>699,428 likes</span>
                <span>4hr 35 min</span>
              </div>
            </div>
          </div>
          </div>
            <div className="cardsWrap">
                <div className="cardsWrapInner">
                    {dataPlaylists.map((playlist, id) => (
                        <Link to={`/playlist/` + playlist.id} key={id}>
                        <Card className="card" key={id}>
                            <Card.Body>
                            <div className="cardImage">
                            <img src={playlist.img} alt="Pic 1" />
                            </div>
                            <div className="cardContent">
                            <h3>{playlist.name}</h3>
                            <span>{playlist.desc}</span>
                            </div>
                            <span className="playIcon">
                            <PlayIcon />
                            </span>
                            </Card.Body>
                        </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}