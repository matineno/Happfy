import React from 'react';

function SpotifyEmbed() {
    const playlistId = '66j1ZQ1KVMoXj3zQmO23d6';

    return (
        <iframe
            title="Spotify Embed: Recommendation Playlist"
            src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
            width="100%"
            height="100%"
            style={{ minHeight: '360px' }}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className='spotify-embeded'
        />
    );
}

export default SpotifyEmbed;
