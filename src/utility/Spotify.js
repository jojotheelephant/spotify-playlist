let AccessToken = ''

const SpotifyAPI = {
    // get access token method. Has three conditions in this method
	//1. if (accessToken), then return accessToken
	//2. if (accessToken && expiresIn) in URL, set accessToken and ExpiresIn
	//3. if (!accessToken) not available and not in URL, send request to Spotify for accessToken
	getAccessToken() {
		//1.
		if (AccessToken) {
			console.log('getAccessToken #1');
			return AccessToken;
		}

		//2.
		const accessTokenInURL = window.location.href.match(/access_token=([^&]*)/);

		if (accessTokenInURL) {
			console.log('getAccessToken #2');
			AccessToken = accessTokenInURL[1];
			window.history.pushState('Access Token', null, '/');
			return AccessToken;

			//3.
		} else {
			console.log('getAccessToken #3');
			const requestAccessTokenURL = 'http://localhost:5500/login'
			window.location = requestAccessTokenURL;
		}
	},

    // sends request to Spotify for userID information from Spotify API
    getUserInfo() {
        // getAccessToken
        const accessToken = SpotifyAPI.getAccessToken();

        //GET request for user information
        return fetch(`https://api.spotify.com/v1/me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                console.log(`UserInfo JSON Response Received`, response);
                response.json();
            }, (error) => console.log(error))
            .then((data) => {
                if (!data) {
                    console.log('no user returned', data)
                    return [];
                } else {
                    console.log('user returned', data)
                    return data.map((user) => ({
                        display_name: user.display_name,
                        country: user.country,
                        email: user.email,
                        userID: user.id,
                        image: user.images.url,
                        userURI: user.uri,
                    }));
                }
            }, (error) => console.log(error));
    },

    // use searchTerm from App.js to run search on Spotify API
    search(term) {
        // getAccessToken
        const accessToken = SpotifyAPI.getAccessToken();

        // GET request from Spotify API for search
        return fetch(`https://api.spotify.com/v1/search?q=${term}&type=track`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                if (!jsonResponse.tracks) {
                    return [];
                } else {
                    return jsonResponse.tracks.items.map((track) => ({
                        id: track.id,
                        name: track.name,
                        artist: track.artist[0].name,
                        album: track.album.name,
                        URI: track.uri,
                        url: track.album.images[1],
                        duration_ms: track.duration_ms,
                    }));
                }
            });
    },

    // upload new playlist to user's Spotify Account. Requires playlistName and songURIs (needs to be mapped when calling
    // SpotifyAPI.uploadplaylist) to be truthy && must have userID.
    uploadPlaylist(playlistName, songURIs, userID) {
        // maybe add an alert? There is already a check in submit button
        if (!playlistName || !songURIs.length) {
            return;
        }
        // getAccessToken
        const AccessToken = SpotifyAPI.getAccessToken();

        // POST Request for playlists using USERID
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            headers: {
                Authorization: `Bearer ${AccessToken}`,
                method: "POST",
                body: JSON.stringify({
                    name: playlistName,
                }),
            },
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                const playlistID = jsonResponse.id;
                console.log(
                    `New Playlist ${playlistName} has been created. PlaylistID ${playlistID}`
                );
                fetch(
                    `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
                    {
                        headers: {
                            Authorization: `Bearer ${AccessToken}`,
                            method: "POST",
                            body: JSON.stringify({
                                uris: songURIs,
                            }),
                        },
                    }
                );
            });
    },
};

export default SpotifyAPI;
