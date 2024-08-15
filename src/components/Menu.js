import React, { useState,  useEffect }  from 'react';

function Menu() {
    const [menu, setMenu] = useState([]);



     return (
        <div>
            <input type="text" placeholder="Search..." />

            <ul>
                <li>Home</li>
                <li>Top Tracks</li>
                <li>Top Recommendations</li>
                <li>Playlist</li>
                <li>Spotify Embed</li>
                <li>Spotify Artist</li>
            </ul>
        </div>
    );
}

export default Menu;
