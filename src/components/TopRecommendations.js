import React, { useState, useEffect} from 'react';

function TopRecommendations () {
    const [recommendations, setRecommendations] = useState([]);

    const token = 'BQDV51UESAq-P5zvkG1UbeN9vun2jsSmwVO1WkScrl1aqbXNAGXD3k-UJTJOElhaHhxrc3gY0KxuE_Eqm4KB6tBSLRvrD0tWx8fviA3A2I2juaiPGD2wgrQeK6ObeBhS7fq0Pkj5V8234V7kYrIyHi3JDhpgU6_LJSS6M_Y03iPstCSG1nninoucakPssB6HiCMFv9i6oTsL9cXGZZ7REAffQHc5YukUizClgOrSYl8VS8qJNt81Q7tlpNcoTah0SCHsBGC4JnMT0twdUCRvJLuvqSwFAg';

    async function fetchWebApi(endpoint, method, body) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
        method,
        body:JSON.stringify(body)
    });
    return await res.json();
    }

    const topTracksIds = [
    '2xs2L5ijdDwFOOHeEaMHN9','4Y4yOSIrWDprEJ7QzGEaln','4U6PqxZ7Q0i5shAt7VMG5u','0FgHJP0rnUtr2mIj3AFi78','6Aw1ZKOBnlfhszbea3ejTD'
    ];

    async function getRecommendations(){
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
    return (await fetchWebApi(
        `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET'
    )).tracks;
    }

    useEffect(() => {
        async function fetchRecommendations(){
            const recommendedTracks = await getRecommendations();
            setRecommendations(recommendedTracks);
        }
        fetchRecommendations();
    }, []);

    return (
        <div>
            <h1>Top Recommendations</h1>
            <ul>
                {recommendations.map(
                    ({ name, artists}) => (
                    <li key={name}>
                        {name} by {artists.map(artist => artist.name).join(', ')}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TopRecommendations;