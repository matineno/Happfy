import React, { useState, useEffect } from 'react';

function TopRecommendations() {
    const [recommendations, setRecommendations] = useState([]);

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

    const topTracksIds = [
        '2xs2L5ijdDwFOOHeEaMHN9', '4Y4yOSIrWDprEJ7QzGEaln', '4U6PqxZ7Q0i5shAt7VMG5u', '0FgHJP0rnUtr2mIj3AFi78', '6Aw1ZKOBnlfhszbea3ejTD'
    ];

    async function getRecommendations() {
        // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
        return (await fetchWebApi(
            `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET'
        )).tracks;
    }

    useEffect(() => {
        async function fetchRecommendations() {
            const recommendedTracks = await getRecommendations();
            setRecommendations(recommendedTracks || []); // Ensure an empty array if recommendedTracks is undefined
        }
        fetchRecommendations();
    }, []);

    return (
        <div>
            <h1>Top Recommendations</h1>
            <ul>
                {recommendations.length > 0 ? (
                    recommendations.map(({ name, artists }) => (
                        <li key={name}>
                            {name} by {artists.map(artist => artist.name).join(', ')}
                        </li>
                    ))
                ) : (
                    <li>No recommendations available</li>
                )}
            </ul>
        </div>
    );
}

export default TopRecommendations;
