import React, { useState } from "react";
//styling completed with animation
import "./SearchBar.css";


function SearchBar({ search }) {
    // STATES
    // search term state
    const [term, setTerm] = useState("");

    // METHODS
    // setTerm upon input value change
    const handleInput = (event) => {
        setTerm(event.target.value);
        event.preventDefault();
    };

    // run search method in app.js
    const runSearch = () => {
        search(term);
        document.getElementById('searchbar__input').value = ''
    };

    // runs search upon 'enter' key press
    const handleEnterPress = (event) => {
        if (event.key === "Enter") {
            runSearch();
            event.preventDefault();
        }
    };

    return (
        <div className="searchbar">
            <div className="searchbar__form">
                <input
                    autoComplete="off"
                    name="name"
                    className="searchbar__input"
                    type="text"
                    required
                    onChange={handleInput}
                    onKeyPress={handleEnterPress}
                    id='searchbar__input'
                />
                <label htmlFor="name" className="searchbar___label-name">
                    <span className="searchbar__content-name">
                        Search Artist, Songs, or Albums
                    </span>
                </label>
            </div>
        </div>
    );
}

export default SearchBar;
