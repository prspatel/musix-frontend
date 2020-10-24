
import React, { Component } from 'react';
import axios from 'axios';

import Nav from '../nav/nav2';

import "../../CSS/collex/collexDash.css"



class collexDash extends Component {
    /*state = {
        movies: null,
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
    */
    get collex() {
        let movies = <h1>No results. Please search</h1>;
        /*if (this.state.movies) {
            movies = <Movies list={this.state.movies} />;
        }*/

        return movies;
    }
    
    render() {
        return (
            <>
                <Nav />
                <h1 className="collex-heading"> Collex Gallery </h1>
                <p style={{ textAlign: "center", fontStyle: "italic", fontFamily: "roboto, sans-serif" }}>Collex is a collection of playlists grouped together to represent a certain topic or genre. </p>
                <hr class="solid" />

                <div className="search-bar">
                    {/* this goes inside input value={this.state.value}
                        onChange={e => this.onChangeHandler(e)}*/}
                    <input
                        type="text"
                        placeholder="Type here to search the collex gallery"
                    />
                    {this.collex}
                </div>

            </>
           
        );
    }
}

export default collexDash;