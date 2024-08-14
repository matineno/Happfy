import React from 'react';
import TopTracks from './components/TopTracks';
import TopRecommendations from './components/TopRecommendations';
import Playlist from './components/Playlist';
import SpotifyEmbed from './components/SpotifyEmbed';
import Header from './components/Header';
import SpotifyArtist from './components/SpotifyArtist';

function App() {
  return (
    <div>
      <header>
        <Header />
        <TopTracks />
        <TopRecommendations />
        <Playlist />
        <SpotifyEmbed />
        <SpotifyArtist />
      </header>
    </div>
  );
}

export default App;
