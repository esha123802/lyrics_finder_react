import React, { Component } from 'react'
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'SEARCH_TRACKS':
            return {
                ...state,
                track_list: action.payload,
                heading: 'Search Results'
            };
            case 'TOP_INDIA':
            return {
                ...state,
                track_list: action.payload,
                heading: 'Top 10 Tracks - India'
            };
            case 'TOP_WORLD':
            return {
                ...state,
                track_list: action.payload,
                heading: 'Top 10 Tracks - World'
            };
        default:
            return state;
    }
}

export class Provider extends Component {
    state = {
        track_list: [],
        heading: 'Top 10 Tracks - World',
        dispatch: action => this.setState(state => reducer(state, action))
    };

    componentDidMount() {
        axios.get(`https://thingproxy.freeboard.io/fetch/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res => {
                console.log(res.data);
                this.setState({ track_list: res.data.message.body.track_list });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;
