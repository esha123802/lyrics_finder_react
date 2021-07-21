import React, { Component } from 'react'
import axios from 'axios';
import { Consumer } from '../../context';

class Top extends Component {
    state = {
        button: 1,
        trackTitle: ' '
    };

    findTrack = (dispatch, e) => {
        e.preventDefault();
        if (this.state.button === 1) {
            axios.get(` https://thingproxy.freeboard.io/fetch/http://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=in&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`)
                .then(res => {
                    dispatch({
                        type: 'TOP_INDIA',
                        payload: res.data.message.body.track_list
                    });
                    this.setState({ trackTitle: '' });
                })
                .catch(err => console.log(err));
        } else if (this.state.button === 2) {
            axios.get(` https://thingproxy.freeboard.io/fetch/http://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`)
                .then(res => {
                    dispatch({
                        type: 'TOP_WORLD',
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
                        <div className="m-5">
                            <form onSubmit={this.findTrack.bind(this, dispatch)}>
                                <div className="row md-0 d-flex justify-content-center">
                                    <div className="col-md-4">
                                        <button className="btn btn-warning btn-lg btn-block p-3"
                                            type="submit" onClick={() => (this.state.button = 1)}>Top Tracks - India</button></div>
                                    <div className="col-md-4">
                                        <button className="btn btn-warning btn-lg btn-block p-3"
                                            type="submit" onClick={() => (this.state.button = 2)}>Top Tracks - World</button></div>
                                </div>
                            </form>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}

export default Top;