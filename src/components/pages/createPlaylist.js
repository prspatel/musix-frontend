
import React from "react";
import "../../CSS/pages/createPlaylist.css"
import { Dropdown, DropdownButton, ListGroup } from "react-bootstrap";
import { AiOutlineCloseCircle } from "react-icons/ai"
import Nav from "../nav/nav2";
import Button from 'react-bootstrap/Button';
import Footer from "../nav/footer";


export default function CreatePlaylist() {
    return (
        <>
            <Nav/>
            <div className="createPlaylist-body">
                <div className="createPlaylist-header">
                    <h1 className="createPlaylist-title"> Create your playlist </h1>
                    <p style={{ textAlign: "left", fontStyle: "italic", fontFamily: "roboto, sans-serif" }}>Playlist is a collection of the songs you would love to hear now or later </p>
                    <hr className="solid-cp" />
                </div>
                <div className= "configs">
                    <p style={{ textAlign: "left", fontStyle: "italic", fontFamily: "roboto, sans-serif" }}>Lets configure it first.... </p>
                    <input type="search" placeholder="Playlist name..." />
                    
                    <DropdownButton variant= "secondary" style={{ marginLeft:"5px", display: "inline", float: "right"}} id="dropdown-basic-button" title="Public">
                        <Dropdown.Item href="#/action-1">Yes</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">No</Dropdown.Item>
                    </DropdownButton>
                    <p style={{ display: "inline", float: "right", fontStyle: "italic", fontFamily: "roboto, sans-serif", marginTop:"12px"}}> Public playlists are visible to other users. </p>
                </div>
                <div className="search-bar">
                    {/* this goes inside input value={this.state.value}
                            onChange={e => this.onChangeHandler(e)}*/}
                    <input
                        type="text"
                        placeholder="Type here to search a song to add it to the playlist"
                    />
                </div>
                <div className="added-songs">
                    <h2 style={{ fontFamily: "Turret Road, cursive" }}>
                        Added Songs
                    </h2>
                    <div className="added-songList">
                        <ListGroup>
                            <ListGroup.Item variant="success">POPSTAR (feat. Drake) by DJ Khaled <AiOutlineCloseCircle style={{ float:"right", color: "black", size: "30" }}/></ListGroup.Item>
                            <ListGroup.Item variant="success">Toosie Slide by Drake <AiOutlineCloseCircle style={{ float: "right", color: "black", size: "30" }} /></ListGroup.Item>
                            <ListGroup.Item variant="success">The Box by Roddy Rich <AiOutlineCloseCircle style={{ float: "right", color: "black", size: "30" }} /></ListGroup.Item>
                            <ListGroup.Item variant="success">Life is Good (feat. Drake) by Future <AiOutlineCloseCircle style={{ float: "right", color: "black", size: "30" }} /></ListGroup.Item>
                        </ListGroup>
                    </div>                   
                </div>
                <Button className="rounded-pill" onClick="" style={{ margin: "1% 0 1% 0", padding: "7px 25px 5px 25px" }} variant="info"> <h5> Save the playlist </h5></Button>
                <hr className="solid-cp" />
                <div className="collection-div">
                    <h2 style={{ fontFamily: "Turret Road, cursive" }}>
                        Add the Playlist to a collection?
                    </h2>
                    <h5> Save the playlist and visit the collection page by <a href="/collexDash"> clicking here! </a></h5>
                    <p style={{ textAlign: "left", fontStyle: "italic", fontFamily: "roboto, sans-serif" }}>*only public playlists can be added to the collection</p>
                </div>
            </div>
            <Footer/>
        </>
    );
}