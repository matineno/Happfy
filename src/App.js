import React from 'react';
import TopTracks from './components/TopTracks';
import TopRecommendations from './components/TopRecommendations';
import Playlist from './components/Playlist';

function App() {
  return (
    <div>
      <header>
        <TopTracks />
        <TopRecommendations />
        <Playlist />
      </header>
    </div>
  );
}

export default App;
