import React, { useState, useEffect } from 'react';

function Playlist() {
    const [playlist , setPlaylist] = useState([]);

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

        const tracksUri = [
        'spotify:track:2xs2L5ijdDwFOOHeEaMHN9','spotify:track:2n6rbLdf1bkOKFZpGceUn6','spotify:track:4Y4yOSIrWDprEJ7QzGEaln','spotify:track:1FBRf2UhoLfjHzwjp1mFnI','spotify:track:4U6PqxZ7Q0i5shAt7VMG5u','spotify:track:0zTbRV4DBDlxUxF7LpHNjz','spotify:track:0FgHJP0rnUtr2mIj3AFi78','spotify:track:29t5vpsoKfrsdZyCL92TNv','spotify:track:6Aw1ZKOBnlfhszbea3ejTD','spotify:track:1PpJu1FkX1binXm5lzS1HI'
        ];

        async function createPlaylist(tracksUri){
        const { id: user_id } = await fetchWebApi('v1/me', 'GET')

        const playlist = await fetchWebApi(
            `v1/users/${user_id}/playlists`, 'POST', {
            "name": "My recommendation playlist",
            "description": "Playlist created by the tutorial on developer.spotify.com",
            "public": false
        })

        await fetchWebApi(
            `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
            'POST'
    );

    return playlist;
    }
    
    useEffect(() => {
        async function fetchPlaylist(){
            const createdPlaylist = await createdPlaylist(tracksUri);
            setPlaylist(createdPlaylist);
        }

        fetchPlaylist();
    }, []);
    return (
        <div>
            <h1>Playlists</h1>
            <ul>
                {playlist.map(
                    ({ name, artists}) => (
                    <li key={name}>
                        {name} by {artists.map(artist => artist.name).join(', ')}
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default Playlist;
