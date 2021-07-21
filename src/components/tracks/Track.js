import React from 'react'
import { Link } from 'react-router-dom';

const Track = (props) => {
    const { track } = props;
    return (
        <div className="col-md-6">
            <div className="card mb-4 shadow-sm" style={{backgroundColor:"#403D39"}}>
                <div className="card-body">
                    <h5 style={{color:"#EB5E28"}}>{track.artist_name}</h5>
                    <p className="card-text">
                        <strong><i className="fa fa-play" style={{marginRight:"2%", color: "#CCC5B9"}}></i> Track:</strong> {track.track_name} <br></br>
                        <strong><i className="fa fa-music" style={{marginRight:"2%", color: "#CCC5B9"}}></i> Album:</strong> {track.album_name}
                    </p>
                    <Link to={`lyrics/track/${track.track_id}`} className="btn btn-block btn-warning" style={{color: "black"}}>
                        <i className="fa fa-chevron-right"></i> View Lyrics
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Track;