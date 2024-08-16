import React, { useState, useEffect } from 'react';
import useSpotifyToken from '../TokenProvider';

function Playlist() {
    const [playlist, setPlaylist] = useState(null); // Start with null
    const [loading, setLoading] = useState(true); // Added loading state
    const [error, setError] = useState(null); // Added error state

    const token = useSpotifyToken();

    async function fetchWebApi(endpoint, method, body) {
        try {
            const res = await fetch(`https://api.spotify.com/${endpoint}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method,
                body: body ? JSON.stringify(body) : undefined,
            });
            if (!res.ok) throw new Error(`Error: ${res.statusText}`);
            return await res.json();
        } catch (error) {
            setError(error.message);
            throw error;
        }
    }

    const tracksUri = [
        'spotify:track:2xs2L5ijdDwFOOHeEaMHN9', 'spotify:track:2n6rbLdf1bkOKFZpGceUn6', 'spotify:track:4Y4yOSIrWDprEJ7QzGEaln',
        'spotify:track:1FBRf2UhoLfjHzwjp1mFnI', 'spotify:track:4U6PqxZ7Q0i5shAt7VMG5u', 'spotify:track:0zTbRV4DBDlxUxF7LpHNjz',
        'spotify:track:0FgHJP0rnUtr2mIj3AFi78', 'spotify:track:29t5vpsoKfrsdZyCL92TNv', 'spotify:track:6Aw1ZKOBnlfhszbea3ejTD',
        'spotify:track:1PpJu1FkX1binXm5lzS1HI'
    ];

    async function createPlaylist(tracksUri) {
        try {
            const { id: user_id } = await fetchWebApi('v1/me', 'GET');
            const playlist = await fetchWebApi(
                `v1/users/${user_id}/playlists`, 'POST', {
                "name": "My recommendation playlist",
                "description": "Playlist created by the tutorial on developer.spotify.com",
                "public": false
            });

            await fetchWebApi(
                `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
                'POST'
            );

            return playlist;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    }

    useEffect(() => {
        async function fetchPlaylist() {
            try {
                const createdPlaylist = await createPlaylist(tracksUri);
                setPlaylist(createdPlaylist);
            } catch (error) {
                console.error("Failed to fetch playlist:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPlaylist();
    }, []);

    return (
        <div>
            <h1>Playlists</h1>
            {loading ? (
                <p>Loading playlist...</p>
            ) : error ? (
                <p>Error loading playlist: {error}</p>
            ) : (
                <ul>
                    <li key={playlist.id}>
                        {playlist.name}
                    </li>
                </ul>
            )}
        </div>
    );
}

export default Playlist;
