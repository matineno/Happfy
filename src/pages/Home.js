import React, {useState, useEffect} from "react";
import useSpotifyToken from "../TokenProvider";

const Home = (props) => {
    const token = useSpotifyToken();
    const playlistsId = '37i9dQZF1EVJHK7Q1TBABQ';
    const [playlists, setPlaylists] = useState([]);

    async function fetchWebApi(endpoint, method = 'GET', body) {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistsId}/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method,
        });
        return await response.json();
    }

    async function getPlaylists() {
        const data = await fetchWebApi('tracks', 'GET');
        return data.items || [];
    }

    useEffect(() => {
        async function fetchPlaylists() {
            if (token) {
                try {
                    const playlists = await getPlaylists();
                    setPlaylists(playlists);
                } catch (error) {
                    console.error('Error fetching playlists:', error);
                }
            }
        }

        fetchPlaylists();
    }, [token]);

    useEffect(() => {
        const fetchPlaylist = JSON.stringify(playlists);
        const coverphoto = fetchPlaylist;
        console.log(`Cover photo: ${coverphoto}`);
    }, [playlists]);

    return (
    <div className="home-container">
        <h1>Home</h1>
        <h3>Top Picks for You</h3>
        <div className="flex">
        <div>
            <img src="https://via.placeholder.com/150" alt="Album Cover" />
            <p>Album Name</p>
            <p>Artist Name</p>
        </div>
        <div>
            <img src="https://via.placeholder.com/150" alt="Album Cover" />
            <p>Album Name</p>
            <p>Artist Name</p>
        </div>
        <div>
            <img src="https://via.placeholder.com/150" alt="Album Cover" />
            <p>Album Name</p>
            <p>Artist Name</p>
        </div>
        </div>
        <h3>Recently Played</h3>
        <div className="flex">
        <div>
            <img src="https://via.placeholder.com/150" alt="Album Cover" />
            <p>Album Name</p>
            <p>Artist Name</p>
        </div>
        <div>
            <img src="https://via.placeholder.com/150" alt="Album Cover" />
            <p>Album Name</p>
            <p>Artist Name</p>
        </div>
        <div>
            <img src="https://via.placeholder.com/150" alt="Album Cover" />
            <p>Album Name</p>
            <p>Artist Name</p>
        </div>
        </div>
    </div>
);
}

export default Home;