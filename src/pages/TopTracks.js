import React, { useState, useEffect } from 'react';
import useSpotifyToken from '../TokenProvider';

const TopTracks = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = useSpotifyToken();

  async function fetchWebApi(endpoint, method, body) {
    try {
      const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method,
        body: body ? JSON.stringify(body) : null,
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      return await res.json();
    } catch (error) {
      console.error('Error fetching data from Spotify API:', error);
      setError(error.message);
      return { items: [] };
    }
  }

  async function getTopTracks() {
    const data = await fetchWebApi(
      'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
    );
    return data.items || [];
  }

  useEffect(() => {
    const fetchTracks = async () => {
      if (token) {
        try {
          const topTracks = await getTopTracks();
          setTracks(topTracks);
        } catch (error) {
          console.error('Error fetching top tracks:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTracks(); // Only execute when the token is available
  }, [token]); // Add `token` as a dependency to ensure the effect runs when the token changes

  if (loading) {
    return <div>Loading top tracks...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Top Tracks</h1>
      <ul>
        {tracks.length > 0 ? (
          tracks.map(({ name, artists }) => (
            <li key={name}>
              {name} by {artists.map(artist => artist.name).join(', ')}
            </li>
          ))
        ) : (
          <li>No tracks available</li>
        )}
      </ul>
    </div>
  );
};

export default TopTracks;
