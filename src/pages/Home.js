import React, { useState, useEffect } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import useSpotifyToken from "../TokenProvider";
import { Link } from "react-router-dom";

const Home = () => {
  const token = useSpotifyToken();
  const playlistsId = [
    "37i9dQZF1EVJHK7Q1TBABQ",
    "37i9dQZF1EVHGWrwldPRtj",
    "37i9dQZF1EQqFPe2ux3rbj",
    "37i9dQZF1EQmPV0vrce2QZ",
    "37i9dQZF1EQn2GRFTFMl2A",
    "37i9dQZF1EQn4jwNIohw50",
    "37i9dQZF1EVKuMoAJjoTIw",
    "37i9dQZF1EIZcnqglfTgGu",
    "37i9dQZF1EQqedj0y9Uwvu",
  ];

  const [playlistsData, setPlaylistsData] = useState({});

  const [currentIndex, setCurrentIndex] = useState(0); // To track the current set of playlists

  const playlistsPerPage = 4; // Number of playlists to show per page

  // Function to fetch playlist data from Spotify API
  async function fetchPlaylistData(playlistId) {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch playlist data for ${playlistId}`);
    }
    return await response.json();
  }

  // Fetch playlist data once token is available
  useEffect(() => {
    async function fetchData() {
      if (token) {
        try {
          const updatedData = {};

          for (let playlistId of playlistsId) {
            const data = await fetchPlaylistData(playlistId);
            updatedData[playlistId] = {
              id: data.id,
              name: data.name,
              description: data.description,
              image: data.images[0]?.url,
              tracks: data.tracks.total,
            };
          }
          setPlaylistsData(updatedData);
        } catch (error) {
          console.error("Error fetching playlist data:", error);
        }
      }
    }

    fetchData();
  }, [token]);

  // Handler to move to the next set of playlists
  const handleNext = () => {
    if (currentIndex + playlistsPerPage < playlistsId.length) {
      setCurrentIndex(currentIndex + playlistsPerPage);
    }
  };

  // Handler to move to the previous set of playlists
  const handlePrevious = () => {
    if (currentIndex - playlistsPerPage >= 0) {
      setCurrentIndex(currentIndex - playlistsPerPage);
    }
  };

  // Render only the current set of playlists
  const currentPlaylists = playlistsId.slice(
    currentIndex,
    currentIndex + playlistsPerPage
  );

  return (
    <div className="home-container">
      <h1>Home</h1>
      <h3>Top Picks for You</h3>

      <div className="flex">
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          <GrPrevious />
        </button>
        <div className="playlist-images">
          {currentPlaylists.map((playlistId) => {
            const playlist = playlistsData[playlistId];
            if (!playlist) return null;

            return (
              <Link
                to={`/playlist/${playlistId}`}
                state={{ playlistData: playlist }} // Pass entire playlist data
                key={playlistId}
              >
                <div className="playlist-card">
                  <img
                    src={playlist.image}
                    alt={`Playlist ${playlist.name}`}
                  />
                </div>
              </Link>
            );
          })}
        </div>
        <button
          onClick={handleNext}
          disabled={currentIndex + playlistsPerPage >= playlistsId.length}
        >
          <GrNext />
        </button>
      </div>
    </div>
  );
};

export default Home;
