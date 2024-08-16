import React, { useState, useEffect } from 'react';
import useSpotifyToken from '../TokenProvider';
import axios from 'axios';

function SpotifyArtist() {
    const [artist, setArtist] = useState(null);
    const token = useSpotifyToken();
    const artistId = '2uaGbYYR6MVKSR371T3a7p?si=Ljf9NJWvQ_uqdKaQE2X8YQ';

    useEffect(() => {
        if (!token) return;
        async function fetchArtist() {
            try {
                const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setArtist(response.data);
            } catch (error) {
                console.error('Error fetching the artist data', error);
            }
        }
        fetchArtist();
    }, [token]);

    if (!artist) {
        return <div>Loading artist information...</div>;
    }

    return (
        <div>
            <h1>{artist.name}</h1>
            <p>Popularity: {artist.popularity}</p>
            <p>Followers: {artist.followers.total}</p>
            <p>Genres: {artist.genres.join(', ')}</p>
            <img src={artist.images[0].url} alt={artist.name} style={{ width: '300px' }} />
            <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                Listen on Spotify
            </a>
        </div>
    );
}

export default SpotifyArtist;
