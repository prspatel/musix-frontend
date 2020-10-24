import React, { Component } from 'react'
import SpotifyPlayer from 'react-spotify-player';

export class Player extends Component {
    
    render() {
        const size = {
            width: '100%',
            height: 300,
          };
        const view = 'list'; // or 'coverart'
        const theme = 'black'; // or 'white'
        
        return (
            <div>
                <SpotifyPlayer
                    uri="spotify:track:11dFghVXANMlKmJXsNCbNl"
                    size={size}
                    view={view}
                    theme={theme}
                />
            </div>
        )
    }
}

export default Player
