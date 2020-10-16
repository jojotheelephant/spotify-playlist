import React, { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import "./../node_modules/react-confirm-alert/src/react-confirm-alert.css";
import "./App.css";

// import components
import Navbar from "./Components/Navbar";
import SearchedPlaylist from "./Components/SearchedPlaylist";
import SearchBar from './Components/SearchBar';
import MasterPlaylist from "./Components/MasterPlaylist";

// import SPOTIFYAPI
import SpotifyAPI from "./utility/Spotify";

// searchResults data
const fakeSearchResults = [
    {
        id: "3bH4HzoZZFq8UpZmI2AMgV",
        name: "New Light",
        artist: "John Mayer",
        album: "New Light",
        URI: "spotify:track:3bH4HzoZZFq8UpZmI2AMgV",
        url: "https://i.scdn.co/image/ab67616d00001e0221f02a52720857a42bba5417",
        duration_ms: 207959,
    },
    {
        id: "7vFv0yFGMJW3qVXbAd9BK9",
        name: "Your Body Is a Wonderland",
        artist: "John Mayer",
        album: "Room For Squares",
        URI: "spotify:track:7vFv0yFGMJW3qVXbAd9BK9",
        url: "https://i.scdn.co/image/ab67616d00001e028848d57cbfa7751e028f4dc9",
        duration_ms: 207959,
    },
    {
        id: "2jdAk8ATWIL3dwT47XpRfu",
        name: "Slow Dancing in a Burning Room",
        artist: "John Mayer",
        album: "Continuum",
        URI: "spotify:track:2jdAk8ATWIL3dwT47XpRfu",
        url: "https://i.scdn.co/image/ab67616d00001e027af5fdc5ef048a68db62b85f",
        duration_ms: 207959,
    },
    {
        id: "5imShWWzwqfAJ9gXFpGAQh",
        name: "Waiting On the World to Change",
        artist: "John Mayer",
        album: "Continuum",
        URI: "spotify:track:5imShWWzwqfAJ9gXFpGAQh",
        url: "https://i.scdn.co/image/ab67616d00001e027af5fdc5ef048a68db62b85f",
        duration_ms: 207959,
    },
    {
        id: "3SktMqZmo3M9zbB7oKMIF7",
        name: "Gravity",
        artist: "John Mayer",
        album: "Continuum",
        URI: "spotify:track:3SktMqZmo3M9zbB7oKMIF7",
        url: "https://i.scdn.co/image/ab67616d00001e027af5fdc5ef048a68db62b85f",
        duration_ms: 207959,
    },
    {
        id: "4LloVtxNZpeh7q7xdi1DQc",
        name:
            "Free Fallin' - Live at the Nokia Theatre, Los Angeles, CA - December 2007",
        artist: "John Mayer",
        album: "Where the Light Is: John Mayer Live In Los Angeles",
        URI: "spotify:track:4LloVtxNZpeh7q7xdi1DQc",
        url: "https://i.scdn.co/image/ab67616d00001e025b9c332f9f76cabc137e400f",
        duration_ms: 207959,
    },
    {
        id: "09oZ9eXQ2fo6YDrPzJqAoP",
        name: "Outta My Head (with John Mayer)",
        artist: "Khalid",
        album: "Free Spirit",
        URI: "spotify:track:09oZ9eXQ2fo6YDrPzJqAoP",
        url: "https://i.scdn.co/image/ab67616d00001e02b361ce46dbadbf8a11081b60",
        duration_ms: 207959,
    },
    {
        id: "7cpCU3Denug5NGZsSpQl8v",
        name: "XO",
        artist: "John Mayer",
        album: "XO",
        URI: "spotify:track:7cpCU3Denug5NGZsSpQl8v",
        url: "https://i.scdn.co/image/ab67616d00001e02924db37163c8c94430c689fc",
        duration_ms: 207959,
    },
    {
        id: "6TL3MOcVW8i1UiJkvhpDbR",
        name: "Carry Me Away",
        artist: "John Mayer",
        album: "Carry Me Away",
        URI: "spotify:track:6TL3MOcVW8i1UiJkvhpDbR",
        url: "https://i.scdn.co/image/ab67616d00001e020e0f646a1fb0fb177e78bf18",
        duration_ms: 207959,
    },
];

const fakeUserInfo = {
    display_name: "Kenny Hsieh",
    country: "USA",
    email: "hsiehme@gmail.com",
    userID: 1253452628,
    image:
        "https://scontent-atl3-2.xx.fbcdn.net/v/t1.0-1/p320x320/15826263_10101393355661032_1761970459627088481_n.jpg?_nc_cat=100&_nc_sid=0c64ff&_nc_ohc=TyA5oQOGnYoAX8sqqW4&_nc_ht=scontent-atl3-2.xx&tp=6&oh=de3e0da802fd5ca32a09532c1f6c142c&oe=5FA57A7B",
    userURI: "spotify:user:1253452628",
};

function App() {
    // ----- STATES -----
    // setstate for window innerwith to test if mobile
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
    // setState for login state
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    // logged in userInfo
    const [userInfo, setUserInfo] = useState(fakeUserInfo);
    // searchTerm input from user
    const [searchTerm, setSearchTerm] = useState("");
    // list of songs from Spotify search in object format
    const [searchResults, setSearchResults] = useState(fakeSearchResults);
    // index page of search result
    const [index, setIndex] = useState(0);
    // number of songs to return upon search
    const [limit, setLimit] = useState(10)
    // name of playlist
    const [playlistName, setPlaylistName] = useState("");
    // list of songs added from searchResults to be uploaded
    const [playlistSongs, setPlaylistSongs] = useState([]);
    // true when searchResults or playlistSongs array have content
    const [activeList, setActiveList] = useState(false);

    // ----- USEEFFECT -----
    // Checks device! changes state of isMobile if window changes below 600
    useEffect(() => {
        window.addEventListener(
            "resize",
            () => {
                const ismobile = window.innerWidth < 600;
                if (ismobile !== isMobile) {
                    setIsMobile(ismobile);
                }
            },
            false
        );
    }, [isMobile]);

    // runs isListActive() method to check if playlist states are empty. updates activeList state
    useEffect(() => {
        if (searchResults.length >= 1 || playlistSongs.length >= 1) {
            setActiveList(true);
        } else {
            setActiveList(false);
        }
    }, [searchResults, playlistSongs]);

    // runs when activeList state changes
    useEffect(() => {
        playlists();
    },);

    // ----- METHODS -----
    // log in to Spotify
    const login = () => {
        SpotifyAPI.getUserInfo()
            .then(
                (returnedUserInfo) => {
                    console.log(`Returned User Info: ${returnedUserInfo}`)
                    setUserInfo(returnedUserInfo);
                    return returnedUserInfo
                },
                (error) => console.log(error)
            )
            .then(returnedInfo => {
                if (returnedInfo.display_name) {setIsLoggedIn(true)}
            })
    }

    // log out of Spotify
    const logout = () => {
        setIsLoggedIn(false)
    }
    
    // add song from searchResult array to playlistSong array
    const addSong = (song) => {
        if (playlistSongs.find((songs) => songs.id === song.id)) {
            return;
        } else {
            const newArr = playlistSongs.concat(song);
            setPlaylistSongs(newArr);
        }
    };

    // remove song from playlistSong array
    const removeSong = (song) => {
        const newArr = playlistSongs.filter((songs) => songs.id !== song.id);
        setPlaylistSongs(newArr);
    };

    // renaming playlistName ~~ not complete
    const updatePlaylistName = (name) => {
        setPlaylistName(name);
    };

    // change page (next) index of search results ~~ not complete (needs to tie to spotify)
    const nextPage = () => {
        setIndex((prevIndex) => prevIndex + 1);
    };

    // change page (prev) index of search results ~~ not complete (needs to tie to spotify)
    const prevPage = () => {
        setIndex((prevIndex) => prevIndex - 1);
    };

    // clear button to reset playlistSongs array. Added confirm alert.
    const clearPlaylist = () => {
        if (playlistSongs.length >= 1) {
            confirmAlert({
                title: "Clear Playlist?",
                message: "Start over from scratch?",
                buttons: [
                    {
                        label: "Let's Start Over",
                        onClick: () => {
                            setPlaylistSongs([]);
                            setPlaylistName("");
                        },
                    },
                    {
                        label: "NVM",
                        onClick: "",
                    },
                ],
            });
        } else {
            return;
        }
    };

    // Save to Spotify Button and logic  ~~ needs testing
    const savePlaylist = () => {
        if (!playlistName && playlistSongs.length === 0) {
            confirmAlert({
                title: `Hold on there..`,
                message: "Add a name to your new playlist and some songs",
                buttons: [
                    {
                        label: "Okie Dokie",
                        onClick: "",
                    },
                ],
            });
        } else if (playlistName && playlistSongs.length >= 1) {
            confirmAlert({
                title: `Save to Spotify?`,
                message: `Playlist Name: ${playlistName}`,
                buttons: [
                    {
                        label: "Save",
                        onClick: uploadPlaylistToSpotify(),
                    },
                    {
                        label: "Cancel",
                        onClick: "",
                    },
                ],
            });
        } else if (playlistName) {
            confirmAlert({
                title: "Hold on there..",
                message: "Don't forget to add some songs to your playlist",
                buttons: [
                    {
                        label: "Duh, of course!",
                        onClick: "",
                    },
                ],
            });
        } else if (playlistSongs.length >= 1) {
            confirmAlert({
                title: `Hold on there..`,
                message: "Give your playlist a name",
                buttons: [
                    {
                        label: "Gotcha!",
                        onClick: "",
                    },
                ],
            });
        }
    };

    // uploads playlist to Spotify (called by savePlaylist method) ~~  need to define userID
    const uploadPlaylistToSpotify = () => {
        const songURIs = playlistSongs.map((track) => track.URI);
        console.log(`Sending songURIs to SpotifyAPI method: ${songURIs}`);
        SpotifyAPI.uploadPlaylist(playlistName, songURIs, userInfo.userID).then(
            () => {
                setPlaylistName("");
                setPlaylistSongs([]);
            },
            (error) => console.log(error)
        );
    };

    // spotify search  ~~ not complete. tied to SearchBar component. needs search Spotify functionality.
    const search = (term) => {
        setSearchTerm(term);
        console.log(`Searched Term: ${term}`);
        SpotifyAPI.search(term, index, limit)
            .then(
                (spotifySearchResults) => {
                    setSearchResults(spotifySearchResults);
                },
                (error) => console.log(error)
            )
            .then(console.log(`Search Results Received: ${searchResults}`));
    };

    // ----- CONDITIONAL RENDER -----
    // checks if playlists have content toggle playlists display
    const playlists = () => {
        if (activeList) {
            return (
                <div className="app__playlists">
                    <SearchedPlaylist
                        search={search}
                        prevPage={prevPage}
                        nextPage={nextPage}
                        index={index}
                        searchedTerm={searchTerm}
                        searchResults={searchResults}
                        onAdd={addSong}
                    />
                    <MasterPlaylist
                        playlistName={playlistName}
                        playlistSongs={playlistSongs}
                        onRemove={removeSong}
                        onNameChange={updatePlaylistName}
                        onClear={clearPlaylist}
                        onSave={savePlaylist}
                    />
                </div>
            );
        } else {
            return (
                <div className="app__searchbar">
                    <SearchBar search={search} />
                </div>
            )
        }
    };

    const loginPage = () => {
        return (
            <div className="app__login">
                <button className="app__login-button" onClick={login}>Login</button>
            </div>
        )
    }

    // ----- RENDER -----
    return (
        <div className="app">
            <div className="app__navbar">
                <Navbar
                    userInfo={userInfo}
                    isLoggedIn={isLoggedIn}
                    isMobile={isMobile}
                    logout={logout}
                />
            </div>
            {isLoggedIn ? playlists() : loginPage()}
        </div>
    );
}

export default App;
