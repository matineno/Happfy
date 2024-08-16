import React from 'react';
import TopTracks from './components/TopTracks';
import TopRecommendations from './components/TopRecommendations';
import Playlist from './components/Playlist';
import SpotifyEmbed from './components/SpotifyEmbed';
import Header from './components/Header';
import SpotifyArtist from './components/Artists';
import Menu from './components/Menu';

function App() {
  return (
    <div className='flex body'>
        <div className='menu-window'>
          <Menu />
        </div>
        <div className='main-window'>
          <header >
            <Header />
          </header>
          <main >
            <TopTracks />
            <TopRecommendations />
            <Playlist />
            <SpotifyEmbed />
            <SpotifyArtist />
          </main>
      </div>
    </div>
  );
}

export default App;
