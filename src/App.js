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
import Footer from "./Components/Footer";

function App() {
    // ----- STATES -----
    // setstate for window innerwith to test if mobile
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
    // setState for login state
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // logged in userInfo
    const [userInfo, setUserInfo] = useState('');
    // searchTerm input from user
    const [searchTerm, setSearchTerm] = useState("");
    // list of songs from Spotify search in object format
    const [searchResults, setSearchResults] = useState([]);
    // index page of search result
    const [index, setIndex] = useState(0);
    // number of songs to return upon search
    const [limit] = useState(8)
    // name of playlist
    const [playlistName, setPlaylistName] = useState("");
    // list of songs added from searchResults to be uploaded
    const [playlistSongs, setPlaylistSongs] = useState([]);
    // true when searchResults or playlistSongs array have content
    const [activeList, setActiveList] = useState(false);
    // useState to check if a song is currently playing
    const [isPlaying, setIsPlaying] = useState(false);
    // useState to keep track of current active song
    const [currentSong, setCurrentSong] = useState("");

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

    // runs search whenever index changes (?)
    useEffect(() => {
        search(searchTerm)
    }, [index])

    // toggles isLoggedIn if UserInfo is truthy
    useEffect(() => {
        if (userInfo) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    },[userInfo])

    // ----- METHODS -----
    // log in to Spotify
    const login = () => {
        SpotifyAPI.getUserInfo()
            .then(
                (returnedUserInfo) => {
                    console.log(`Returned User Info:`, returnedUserInfo)
                    setUserInfo(returnedUserInfo);
                    return returnedUserInfo
                },
                (error) => console.log(error)
            )
    }

    // log out of Spotify
    const logout = () => {
        setIsLoggedIn(false)
        setUserInfo([])
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

    // renaming playlistName 
    const updatePlaylistName = (name) => {
        setPlaylistName(name);
    };

    // play 30s song preview upon click
    const previewSong = (song) => {
        if (!song.preview) {
            console.log(`No preview provided`)
        } else if (isPlaying && song.preview !== currentSong.src) {
            currentSong.pause();
            setIsPlaying(false);
            const playSong = new Audio(song.preview);
            setCurrentSong(playSong);
            playSong.play();
            setIsPlaying(true);
            console.log('Now Playing song from src: ', playSong.src)
        } else if (!isPlaying) {
            const playSong = new Audio(song.preview);
            setCurrentSong(playSong);
            playSong.play();
            setIsPlaying(true);
            console.log('Now Playing song from src: ', playSong.src)
        } else if (isPlaying) {
            currentSong.pause();
            setIsPlaying(false);
        }
    };
    

    // change page (next) index of search results ~~ not complete (needs to tie to spotify)
    const nextPage = () => {
        setIndex((prevIndex) => prevIndex + limit);
    };

    // change page (prev) index of search results ~~ not complete (needs to tie to spotify)
    const prevPage = () => {
        setIndex((prevIndex) => prevIndex - limit);
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
                        onClick: () => {uploadPlaylistToSpotify()},
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
        console.log(`Sending songURIs to SpotifyAPI method:`, songURIs, `PlaylistName: `, playlistName, `userID: `, userInfo.userID);
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
            .then(console.log(`Search Results Received:`, searchResults));
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
                        limit={limit}
                        previewSong={previewSong}
                    />
                    <MasterPlaylist
                        playlistName={playlistName}
                        playlistSongs={playlistSongs}
                        onRemove={removeSong}
                        onNameChange={updatePlaylistName}
                        onClear={clearPlaylist}
                        onSave={savePlaylist}
                        previewSong={previewSong}
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
                <button className="app__login-button" onClick={login}>Get Started</button>
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
            <Footer />
        </div>
    );
}

export default App;
