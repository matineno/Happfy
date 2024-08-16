import React from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import SpotifyEmbed from './components/SpotifyEmbed';

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
            <SpotifyEmbed />
          </main>
      </div>
    </div>
  );
}

export default App;
