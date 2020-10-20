import React from "react";
import "./SongList.css";

// import components
import Song from "./Song";

function SongList({ songs, onAdd, isRemovable, onRemove, previewSong }) {
    return (
        <div className="songlist">
            {songs.map((song) => {
                return (
                    <Song
                        key={song.id}
                        songs={song}
                        onAdd={onAdd}
                        isRemovable={isRemovable}
                        onRemove={onRemove}
                        previewSong={previewSong}
                    />
                );
            })}
        </div>
    );
}

export default SongList;
