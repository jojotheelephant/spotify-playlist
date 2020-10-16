import React from "react";
import "./Song.css";

// import Material-UI
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";


function Song({ songs, onAdd, isRemovable, onRemove }) {
    // ----- METHODS -----
    // render '-' if isRemoval is true and '+' if isRemoval is false
    const renderAction = () => {
        if (isRemovable) {
            return (
                <Tooltip
                    title="Remove from playlist"
                    arrow
                    TransitionComponent={Zoom}
                >
                    <button className="song-action" onClick={removeSong}>
                        -
                    </button>
                </Tooltip>
            );
        } else {
            return (
                <Tooltip
                    title="Add to playlist"
                    arrow
                    TransitionComponent={Zoom}
                >
                    <button className="song-action" onClick={addSong}>
                        +
                    </button>
                </Tooltip>
            );
        }
    };

    // convert duration_ms to mm:ss track length
    const songLength = () => {
        let duration = songs.duration_ms;
        const ms = duration % 1000;
        duration = (duration - ms) / 1000;
        let secs = duration % 60;
        duration = (duration - secs) / 60;
        const mins = duration % 60;
        if (secs < 10) {
            secs = `0${secs}`
        }
        return `${mins}:${secs}`;
    };

    // addSong to MasterPlaylist
    const addSong = () => {
        onAdd(songs);
    };

    // removeSong from MasterList
    const removeSong = () => {
        onRemove(songs);
    };

    return (
        <div className="song">
            <img src={songs.url} alt="album" />
            <div className="song__info">
                <h3 className="song__name">{songs.name}</h3>
                <p className="song__artist-album">
                    {songs.artist} | {songs.album}
                </p>
            </div>
            <div className="song__end">
                <h3 className="song__duration">{songLength()}</h3>
                {renderAction()}
            </div>
        </div>
    );
}

export default Song;
