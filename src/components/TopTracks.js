import React, { useState, useEffect } from 'react';

const TopTracks = () => {
  const [tracks, setTracks] = useState([]);

  const token = 'BQDg6BPgx_yK6tKYPheS9omMyEvV_kq2uSEnzDedNhu7RJTPKN-Ie701YhsLxo_Sk2N6DsOU_5IHrWlTupJzI_gabXduSgxN0F5NWns-iwIDzDnjGhfwqacPLQhFKvFmEWlFkPimPzlDSAFv9l6AXwSEjwH7Nnml7wEvloDZVthAPFaQxdlap296yC1wLQjThOXZkS300-bSBVd01SsVmwU56kL96pKmWwppo9NGh83FScVpn5ETT1fUsar1ESWyRBTPCnPuL56AHqJi1c4Ts9KxnmO4sw';

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
