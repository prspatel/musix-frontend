
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom'
import Card from "react-bootstrap/Card"
import Nav from '../nav/nav2';

import "../../CSS/collex/collexDash.css"



export default function CollexDash() {
    const [data, setData] = useState();
    /*state = {
        collex: null,
        loading: false,
        value: ''
    };
    
    search = async val => {
        this.setState({ loading: true });
        const res = await axios(
            `https://api.themoviedb.org/3/search/movie?query=${val}&api_key=dbc0a6d62448554c27b6167ef7dabb1b`
        );
        const movies = await res.data.results;

        this.setState({ movies, loading: false });
    };

    onChangeHandler = async e => {
        this.search(e.target.value);
        this.setState({ value: e.target.value });
    };
    
    get collex() {
        let movies = <h1>No results. Please search</h1>;
        if (this.state.movies) {
            movies = <Movies list={this.state.movies} />;
        }

        return movies;
    }
    */


    /*async loadCollex() {
        this.setState({ loading: true });
        const res =  await axios(
            `http://localhost:5000/collex/all`
          );            

        const collection = await res.data.results;   
        this.setState({ movies, loading: false });
        console.log(collection)            
        if (collection) {
            collex = <Collex list={collection}>
        }
        
    }*/
    
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
                <h1 className="collex-heading"> Collex Gallery </h1>
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
                        <Card key={ item._id} style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>
                                    {item.description}
                                    </Card.Text>
                                <Link to={`collexDash/${item._id}`}>View this collex</Link>
                            </Card.Body>
                        </Card>
                    )) : <h1>No data</h1>}
                </div>
            </>
           
     );
    
}
