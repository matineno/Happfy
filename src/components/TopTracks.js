import React, { useState, useEffect } from 'react';

const TopTracks = () => {
  const [tracks, setTracks] = useState([]);

  const token = 'BQDV51UESAq-P5zvkG1UbeN9vun2jsSmwVO1WkScrl1aqbXNAGXD3k-UJTJOElhaHhxrc3gY0KxuE_Eqm4KB6tBSLRvrD0tWx8fviA3A2I2juaiPGD2wgrQeK6ObeBhS7fq0Pkj5V8234V7kYrIyHi3JDhpgU6_LJSS6M_Y03iPstCSG1nninoucakPssB6HiCMFv9i6oTsL9cXGZZ7REAffQHc5YukUizClgOrSYl8VS8qJNt81Q7tlpNcoTah0SCHsBGC4JnMT0twdUCRvJLuvqSwFAg';

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
      setTracks(topTracks);
    }

    fetchTracks();
  }, []);

  return (
    <div>
      <h1>Top Tracks</h1>
      <ul>
        {tracks.map(({ name, artists }) => (
          <li key={name}>
            {name} by {artists.map(artist => artist.name).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopTracks;
