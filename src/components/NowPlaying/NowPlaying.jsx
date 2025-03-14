import React from "react";

const NowPlaying = ({ track }) => {
    if (!track) return null;


    return (
        <div className="p-4 border rounded-lg shadow-md bg-gray-100 mt-4">
        <h2 className="text-xl font-bold">Now Playing</h2>
        <p> {track.title} </p>
        <p> {track.artist} </p>
        </div>
    );
};

export default NowPlaying;
