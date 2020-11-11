
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from "react-bootstrap/Card";
import Nav from '../nav/nav2';
import Footer from "../nav/footer";



import { ReactComponent as CreateIcon } from '../../images/pen.svg'

import "../../CSS/collex/collexDash.css"
import { GrAddCircle } from "react-icons/gr";

import "../../CSS/pages/playlist.scss"



export default function CollexDash() {
    const [data, setData] = useState();
   
    
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:5000/collex/all',
            );
            console.log(result.data.results);
            setData(result.data.results);
        };

        fetchData();
    }, []);

    
        return (
            <>
                <Nav />
                <section className="collexDash-Back">
                    <h1 className="collex-header"> Collex Gallery </h1>
                    <p style={{ textAlign: "center", fontStyle: "italic", fontFamily: "roboto, sans-serif" }}>Collex is a collection of playlists grouped together to represent a certain topic or genre. </p>
                    <hr className="solid" />
                    
                    <div className="search-bar">
                        {/* this goes inside input value={this.state.value}
                            onChange={e => this.onChangeHandler(e)}*/}
                        <input
                            type="text"
                            placeholder="Type here to search the collex gallery"
                        />
                    </div>
                    <div className= "collex-cards">
                        {data ? data.map(item => (
                            <Card key={item._id} style={{ width: '18rem', border: "1px solid  #69b1ec", borderRadius: "24px", backgroundColor:"white" }}>
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text>
                                        {item.description}
                                        </Card.Text>
                                    <Link to={`collexDash/${item._id}`}>View this collex</Link>
                                </Card.Body>
                            </Card>
                        )) : <h1>No collex in the database</h1>}
                    </div>
                </section>
                <Footer/>
            </>
           
     );
    
}
