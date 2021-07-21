import React, { Component } from 'react'
import axios from 'axios';
import { Consumer } from '../../context';

class Search extends Component {
    state = {
        button: 1,
        trackTitle: ' '
    };

    findTrack = (dispatch, e) => {
        e.preventDefault();
        if (this.state.button === 1) {
            axios.get(` https://thingproxy.freeboard.io/fetch/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=4&page=2&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
                .then(res => {
                    dispatch({
                        type: 'SEARCH_TRACKS',
                        payload: res.data.message.body.track_list

                    });
                    this.setState({ trackTitle: '' });
                })
                .catch(err => console.log(err));
        } else if
            (this.state.button === 2) {
            axios.get(` https://thingproxy.freeboard.io/fetch/http://api.musixmatch.com/ws/1.1/track.search?q_artist=${this.state.trackTitle}&page_size=4&page=2&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
                .then(res => {
                    dispatch({
                        type: 'SEARCH_TRACKS',
                        payload: res.data.message.body.track_list

                    });
                    this.setState({ trackTitle: '' });
                })
                .catch(err => console.log(err));
        };


    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card card-body mb-4 p-4">
                            <h1 className="display-4 text-center"><i className="fa fa-music" style={{marginRight: "3%"}}></i>Search for a Song/Artist</h1>
                            <p className="lead text-center">Get the lyrics for any song</p>
                            <form onSubmit={this.findTrack.bind(this, dispatch)}>
                                <div className="form-group">
                                    <input type="text"
                                        className="form-control form-control-lg"
                                        style={{height: "40px"}}
                                        placeholder="Song title..."
                                        name="trackTitle"
                                        value={this.state.trackTitle}
                                        onChange={this.onChange}>
                                    </input>
                                </div>
                                <div className="row m-0 d-flex justify-content-center">
                                    <div className="col-md-3">
                                        <button className="btn btn-primary btn-lg btn-block"
                                            type="submit" onClick={() => (this.state.button = 1)} >Search Track</button></div>
                                    <div className="col-md-3">
                                        <button className="btn btn-primary btn-lg btn-block"
                                            type="submit" onClick={() => (this.state.button = 2)}>Search Artist</button></div>
                                </div>
                            </form>


                        </div>
                    )
                }}
            </Consumer>
        )
    }
}

export default Search;