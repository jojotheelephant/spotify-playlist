import React from "react";
import "./Song.css";

// import Material-UI
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

function Song({ songs, onAdd, isRemovable, onRemove, previewSong }) {
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

    // render Tooltip for songs with previews tracks
    const renderPreview = () => {
        if (songs.preview) {
            return (
                <Tooltip title="Preview Track" arrow TransitionComponent={Zoom}>
                <div className="song__info" onClick={playPause}>
                    <h3 className="song__name">{songs.name}</h3>
                    <p className="song__artist-album">
                        {songs.artist} | {songs.album}
                    </p>
                </div>
            </Tooltip>
            )
        } else {
            return (
                <Tooltip title="Spotify Preview Unavailable" arrow TransitionComponent={Zoom}>
                    <div className="song__info inactive">
                        <h3 className="song__name">{songs.name}</h3>
                        <p className="song__artist-album">
                            {songs.artist} | {songs.album}
                        </p>
                    </div>
                </Tooltip>
            )
        }
    }

    // convert duration_ms to mm:ss track length
    const songLength = () => {
        let duration = songs.duration_ms;
        const ms = duration % 1000;
        duration = (duration - ms) / 1000;
        let secs = duration % 60;
        duration = (duration - secs) / 60;
        const mins = duration % 60;
        if (secs < 10) {
            secs = `0${secs}`;
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

    // play pause sample
    const playPause = () => {
        previewSong(songs);
    };

    return (
        <div className="song">
            <audio id="song__player">
                <source src={songs.preview} />
            </audio>
            <img src={songs.url} alt="album" />
            {renderPreview()}
            <div className="song__end">
                <h3 className="song__duration">{songLength()}</h3>
                {renderAction()}
            </div>
        </div>
    );
}

export default Song;
