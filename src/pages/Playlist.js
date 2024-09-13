import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useSpotifyToken from '../TokenProvider';

const Playlist = () => {
    const location = useLocation();
    const { playlistData } = location.state || {};

    const [selectedPlaylist, setSelectedPlaylist] = useState(null);  // Holds the selected playlist
    const [playlist, setPlaylist] = useState(null);  // Holds the playlist data
    const [loading, setLoading] = useState(true);    // Loading state
    const [error, setError] = useState(null);        // Error state

    // Set the selected playlist when playlistData is available
    useEffect(() => {
        if (playlistData) {
            setSelectedPlaylist(playlistData);   // Use the state setter here
        }
    }, [playlistData]);

    const token = useSpotifyToken();       

    // Function to fetch playlist items from Spotify API
    const fetchWebApiPlaylistItems = async (playlistId) => {
        const response = await fetch(
            `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch playlist');
        }

        return await response.json();
    };

    // Fetch playlist when token and selected playlist are available
    useEffect(() => {
        const fetchPlaylist = async () => {
            if (token && selectedPlaylist?.id) {
                try {
                    const data = await fetchWebApiPlaylistItems(selectedPlaylist.id);
                    setPlaylist(data);  // Set the playlist data
                } catch (err) {
                    setError(err.message);  // Handle error
                } finally {
                    setLoading(false);      // Set loading to false
                }
            }
        };

        fetchPlaylist();
    }, [token, selectedPlaylist?.id]);  // Re-run when token or selectedPlaylist changes

    // Function to format duration (ms) to mm:ss
    const formatDuration = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Extract unique featured artists
    const getFeaturedArtists = () => {
        const artists = playlist?.items.flatMap(track => track.track.artists.map(artist => artist.name));
        return [...new Set(artists)].join(', ');
    };

    // Calculate total duration of playlist
    const getTotalDuration = () => {
        const totalMs = playlist?.items.reduce((acc, track) => acc + track.track.duration_ms, 0);
        const minutes = Math.floor(totalMs / 60000);
        const seconds = Math.floor((totalMs % 60000) / 1000);
        return `${minutes} min ${seconds} sec`;
    };

    return (
        <div className="playlist">
            {selectedPlaylist && (
                <div className="playlist-info">
                    <img
                        src={selectedPlaylist.image}
                        alt={`Playlist ${selectedPlaylist.name}`}
                    />
                    <div>
                        <h1>{selectedPlaylist.name}</h1>
                        <p className="featured-artist">{playlist && getFeaturedArtists(3)}</p>
                        <p>{playlist?.items.length} songs, {playlist && getTotalDuration()}</p>
                    </div>
                </div>
            )}

            {loading ? (
                <p>Loading playlist...</p>
            ) : error ? (
                <p>Error loading playlist: {error}</p>
            ) : (
                playlist && (
                    <table>
                        <thead>
                            <tr>
                            </tr>
                        </thead>
                        <tbody>
                            {playlist.items.map((item, index) => {
                                const track = item.track;
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td className="track-image">
                                            {track.album.images[0] && (
                                                <img
                                                    src={track.album.images[0].url}
                                                    alt={track.name}
                                                />
                                            )}
                                        </td>
                                        <td>
                                            {track.name} <br />
                                            <span style={{ color: '#888' }}>{track.artists.map(artist => artist.name).join(', ')}</span>
                                        </td>
                                        <td>{track.album.name}</td>
                                        <td>{formatDuration(track.duration_ms)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )
            )}
        </div>
    );
};

export default Playlist;
