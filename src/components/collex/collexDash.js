
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from "react-bootstrap/Card";
import Nav from '../nav/nav2';
import Footer from "../nav/footer";
import { SearchFunction } from "../misc/search";
import Carousel from 'react-multi-carousel';



import { ReactComponent as CreateIcon } from '../../images/pen.svg'

import "../../CSS/collex/collexDash.css"
import { GrAddCircle } from "react-icons/gr";

import "../../CSS/pages/playlist.scss"



export default function CollexDash() {
    const [data, setData] = useState();

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
    const [searchResults, setResults] = useState({
        collexs: null,
        loading: false,
        value: ""
    });
    
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                '/api/collex/all',
            );
            console.log(result.data.collexs);
            setData(result.data.collexs);
        };

        fetchData();
    }, []);
    let searchHandler = async e => {
        if (e.target.value)
            search(e.target.value);
        setResults({ value: e.target.value });
    };

    let search = async val => {
        setResults({ loading: true });
        const res = await SearchFunction(
            `/api/collex/search/${val}`
        );  
        if (res && res.collexs) {
            const collexs = res.collexs;
            setResults({ collexs, loading: false });
        }
    };

    function displayCollexs() {
        let collexs = <h1 >No Search Results matches the text above!</h1>;

        if (searchResults.collexs.length === 0) {
            return collexs;
        }
        if (searchResults.collexs) {
            collexs = searchResults.collexs.map(item => (

                <Card key={item._id} style={{ width: '14rem', border: "1px solid  #69b1ec", borderRadius: "24px", backgroundColor: "white" }}>
                    <Card.Body>
                        <Card.Img variant="top" src={item.cover} height="200" width="150" />
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>
                            {item.likes} Likes
                        </Card.Text>
                        <Link to={`collex/${item._id}`}>View this collex</Link>
                    </Card.Body>
                </Card>))
        }
        return collexs;
    }
    
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
                            onChange={e => searchHandler(e)}
                            value={setResults.value}
                        />
                    </div>
                    <div className="carousel-container">
                        {
                            searchResults.collexs ? 
                                <Carousel className="carousel" responsive={responsive}>
                                    {displayCollexs()}
                                 </Carousel>
                                    
                                : data ?
                                    <>
                                        <Carousel className="collexDash-carousel" responsive={responsive} >
                                            {data.map(item => (
                                                <Card style={{ width: '14rem' }} key={item._id} >
                                                    <Card.Img variant="top" src={item.cover} height="200" width="150" />
                                                    <Card.Body>
                                                        <Card.Title>{item.name}</Card.Title>
                                                        <Card.Text>
                                                            {item.likes} Likes
                                                        </Card.Text>
                                                        <Link to={`/collex/${item._id}`}>View this collex</Link>
                                                    </Card.Body>
                                                </Card>
                                                ))}
                                        </Carousel>
                                        <a href="/allCollex/viewAll" style={{ float: "right" }}> View All Collex >>></a>
                                    </>
                            : <h1>No collex in the database</h1>
                        }

                    </div>
                </section>
                <Footer/>
            </>
           
     );
    
}
