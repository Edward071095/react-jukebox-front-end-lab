import React, { useState } from "react";
import NowPlaying from "../NowPlaying/NowPlaying";

const TrackList = (props) => {
  const [currentTrack, setCurrentTrack] = useState(null);

  const handlePlay = (track) => {
    setCurrentTrack(track);
  };



    return (
       <div>
        <h1>Track List</h1>
        <div>
            {!props.tracks.length ? (
                <h2>No Tracks</h2>
            ) : (
           <ul>
             {props.tracks.map((track) => (
              <li 
                key={track._id}
                style={{ cursor: 'pointer', color: "#646CFF" }}
                onClick={() => props.handleSelect(track)}
              >
                  {track.title}
                  <button 
                  onClick={() => handlePlay(track)}
                  style={{
                    marginTop: "5px",
                    backgroundColor: "#646CFF",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Play
                  </button>
                </li>
             ))}
           </ul>
            )}
        </div>

      {currentTrack && <NowPlaying track={currentTrack} />}


        <button onClick={props.handleFormView}>
            {props.isFormOpen ? 'Close Form' : 'New Track'}
        </button>
       </div>
    );
};

export default TrackList;