import React, {useState} from "react";
import "./MasterPlaylist.css";

// ----- import Material-UI -----
// import ICONs used
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
// import Tooltip and effect
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

// import components
import SongList from "./SongList";

function MasterPlaylist({
    playlistName,
    playlistSongs,
    onRemove,
    onNameChange,
    onClear,
    onSave,
    previewSong
}) {
    // ----- USESTATE -----
    const [nameForPlaylist, setNameForPlaylist] = useState('')

    // ----- METHODS -----
    // handle change from input
    const handleNameChange = (event) => {
        setNameForPlaylist(event.target.value);
        event.preventDefault();
    };

    // run updatePlaylistNmae in app.js
    const runupdatePlaylistName = () => {
        onNameChange(nameForPlaylist)
        document.getElementById('masterplaylist__input').value = ''
    }

    // run runupdatePlaylistName upon 'enter' key press
    const handleEnterPress = (event) => {
        if (event.key === "Enter") {
            runupdatePlaylistName()
            event.preventDefault();
        }
    };

    // counts numbers of songs in MasterPlaylist
    const playlistCount = () => {
        return playlistSongs.length
    }

    // counts total playtime in masterPlaylist in min rounded down
    const playtimeCount = () => {
        const totalDuration_ms = playlistSongs.reduce((Acc, CurrVal) => Acc + CurrVal.duration_ms,0);
        const totalMin = Math.round(totalDuration_ms / 60000)
        return totalMin
    }
    
    // ----- CONDITIONAL RENDERING -----
    // masterplaylist__info-details conditional rendering depending on if masterplaylist.length
    const infoDetails = () => {
        if (playlistSongs.length === 1) {
            return (`${playlistCount()} song | ${playtimeCount()} mins`) 
        } else if (playlistSongs.length > 1) {  
            return (`${playlistCount()} songs | ${playtimeCount()} mins`)
        } 
    }

    return (
        <div className="masterplaylist">
            <div className="masterplaylist__function">
                <div className="masterplaylist__input-section">
                    <input
                        autoComplete="off"
                        name="name"
                        className="masterplaylist__input"
                        type="text"
                        required
                        onChange={handleNameChange}
                        onKeyPress={handleEnterPress}
                        id="masterplaylist__input"
                    />
                    <label
                        htmlFor="name"
                        className="masterplaylist__label-name"
                    >
                        <span className="masterplaylist__content-name">
                            Add a playlist name...
                        </span>
                    </label>
                </div>
                {/* Icons for clear playlist and save to spotify with tooltip */}
                <div className="masterplaylist__icons">
                    <Tooltip
                        title="Clear Playlist"
                        arrow
                        TransitionComponent={Zoom}
                    >
                        <ClearIcon
                            className="masterplaylist__clear"
                            onClick={onClear}
                            style={{ fontSize: 30, color: "#457b9d" }}
                        ></ClearIcon>
                    </Tooltip>
                    <Tooltip
                        title="Save playlist to Spotify"
                        arrow
                        TransitionComponent={Zoom}
                    >
                        <CheckIcon
                            className="masterplaylist__save"
                            onClick={onSave}
                            style={{ fontSize: 30, color: "#457b9d" }}
                        ></CheckIcon>
                    </Tooltip>
                </div>
            </div>
            <div className="masterplaylist__info">
                <div className="masterplaylist__info-name">
                    {playlistName}
                </div>
                <div className="masterplaylist__info-details">
                    {infoDetails()}
                </div>
            </div>
            <SongList
                songs={playlistSongs}
                isRemovable={true}
                onRemove={onRemove}
                previewSong={previewSong}
            />
        </div>
    );
}

export default MasterPlaylist;
