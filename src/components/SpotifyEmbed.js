import React from 'react';

function SpotifyEmbed() {
    const playlistId = '7cugIUy78m97cVRJ5YCgk0';

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
        />
    );
}

export default SpotifyEmbed;
