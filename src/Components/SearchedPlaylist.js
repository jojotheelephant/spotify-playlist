import React from "react";
import "./SearchedPlaylist.css";

// import components
import SongList from "./SongList";
import PageIndex from "./PageIndex";
import SearchBar from './SearchBar';

function SearchedPlaylist({
    search,
    searchResults,
    onAdd,
    searchedTerm,
    index,
    nextPage,
    prevPage,
    limit,
    previewSong
}) {
    const playlistCount = () => {
        return searchResults.length
    }

    // counts total playtime in masterPlaylist in min rounded down
    const playtimeCount = () => {
        const totalDuration_ms = searchResults.reduce((Acc, CurrVal) => Acc + CurrVal.duration_ms,0);
        const totalMin = Math.round(totalDuration_ms / 60000)
        return totalMin
    }
    
    // ----- CONDITIONAL RENDERING -----
    // masterplaylist__info-details conditional rendering depending on if masterplaylist.length
    const infoDetails = () => {
        if (searchResults.length === 1) {
            return (`${playlistCount()} song | ${playtimeCount()} mins`) 
        } else if (searchResults.length > 1) {  
            return (`${playlistCount()} songs | ${playtimeCount()} mins`)
        } 
    }


    return (
        <div className="searchedplaylist">
            <div className="searchedplaylist__searchbar">
                <SearchBar search={search} />
            </div>
            <h1 className="searchedplaylist__info">
            <div className="searchedplaylist__info-name">
                    {searchedTerm}
                </div>
                <div className="searchedplaylist__info-details">
                    {infoDetails()}
                </div>
                
                
            </h1>
            <SongList songs={searchResults} onAdd={onAdd} isRemovable={false} previewSong={previewSong}/>
            <PageIndex index={index} prevPage={prevPage} nextPage={nextPage} limit={limit}/>
        </div>
    );
}

export default SearchedPlaylist;
