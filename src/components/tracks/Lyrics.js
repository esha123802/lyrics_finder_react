import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

class Lyrics extends Component {
    state = {
        track: {},
        lyrics: {}
    };

    componentDidMount() {
        axios.get(`https://thingproxy.freeboard.io/fetch/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res => {
                console.log(res.data);
                this.setState({ lyrics: res.data.message.body.lyrics });
                return axios.get(`https://thingproxy.freeboard.io/fetch/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
            })
            .then(res => {
                // console.log(res.data);
                this.setState({ track: res.data.message.body.track });
            })
            .catch(err => console.log(err));
    }

    render() {
        const { track, lyrics } = this.state;
        if (track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(lyrics).length === 0) {
            return <Spinner></Spinner>
        } else {
            return (
                <React.Fragment>
                    <Link to="/" className="btn btn-warning btn-sm mb-4 p-2">Go back!</Link>
                    <div className="card" style={{backgroundColor: "#403D39"}}>
                        <h3 className="card-header">
                            {track.track_name}  <span className="text-secondary"> - {' '} {track.artist_name}</span>
                        </h3>
                        <div className="card-body">
                             <p className="card-text">{lyrics.lyrics_body}</p>
                        </div>
                    </div>
                    <ul className="Link-group mt-3">
                        <li className="list-group-item" style={{backgroundColor:"#CCC5B9"}}>
                            <h4 style={{color: "#403D39", display: "inline"}}>Album: </h4> {track.album_name}
                        </li>
                        <li className="list-group-item" style={{backgroundColor:"#CCC5B9"}}>
                            <h4 style={{color: "#403D39", display: "inline"}}>Genre: </h4> {track.primary_genres.music_genre_list[0].music_genre.music_genre_name}
                        </li>
                        <li className="list-group-item" style={{backgroundColor:"#CCC5B9"}}>
                            <h4 style={{color: "#403D39", display: "inline"}}>Explicit words: </h4> 
                            {track.explicit === 0 ? 'No' : 'Yes'}
                        </li>
                    </ul>

                </React.Fragment>
            )
        }
    }
}

export default Lyrics;