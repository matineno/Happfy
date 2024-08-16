import React, { useState, useEffect } from 'react';
import useSpotifyToken from '../TokenProvider';

const TopTracks = () => {
  const [tracks, setTracks] = useState([]);

  const token = useSpotifyToken();

  async function fetchWebApi(endpoint, method, body) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      body: JSON.stringify(body),
    });
    return await res.json();
  }

  async function getTopTracks() {
    return (await fetchWebApi(
      'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
    )).items;
  }

  useEffect(() => {
    async function fetchTracks() {
      const topTracks = await getTopTracks();
      setTracks(topTracks || []);
    }

    fetchTracks();
  }, []);

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
          <li>No Tracks available</li>
        )}
      </ul>
    </div>
  );
}

export default TopTracks;
