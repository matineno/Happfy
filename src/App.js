import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from './components/Header';
import Menu from './components/Menu';
import SpotifyEmbed from './components/SpotifyEmbed';
import Home from './pages/Home';
import Radio from './pages/Radio';
import RecentlyAdded from './pages/RecentlyAdded';
import Artists from './pages/Artists';
import Albums from './pages/Albums';
import Songs from './pages/Songs';
import SpotifyStore from './pages/SpotifyStore';
import AllPlaylists from './pages/AllPlaylists';
import FavouriteSongs from './pages/FavouriteSongs';

function App() {
  return (
    <Router>
      <div className='flex body'>
        <div className='menu-window'>
          <Menu />
        </div>
        <div className='main-window'>
          <header>
            <Header />
          </header>
          <main>
            <Routes>
              {/* Route for Home */}
              <Route path='/home' element={<Home />} />
              <Route path='/radio' element={<Radio />} />
              <Route path='/recentlyadded' element={<RecentlyAdded />} />
              <Route path='/artists' element={<Artists />} />
              <Route path='/albums' element={<Albums />} />
              <Route path='/songs' element={<Songs />} />
              <Route path='/spotifystore' element={<SpotifyStore />} />
              <Route path='/allplaylists' element={<AllPlaylists />} />
              <Route path='/favouritesongs' element={<FavouriteSongs />} />
              
              {/* Add a default route that redirects to Home */}
              <Route path='/' element={<Navigate to="/home" />} />
            </Routes>
            <SpotifyEmbed />
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
