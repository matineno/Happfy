import React, { useState, useEffect } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import useSpotifyToken from "../TokenProvider";

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
    "37i9dQZF1EQqedj0y9Uwvu"
  ];

  const [playlistImages, setPlaylistImages] = useState({
    "37i9dQZF1EVJHK7Q1TBABQ": "",
    "37i9dQZF1EVHGWrwldPRtj": "",
    "37i9dQZF1EQqFPe2ux3rbj": "",
    "37i9dQZF1EQmPV0vrce2QZ": "",
    "37i9dQZF1EQn2GRFTFMl2A": "",
    "37i9dQZF1EQn4jwNIohw50": "",
    "37i9dQZF1EVKuMoAJjoTIw": "",
    "37i9dQZF1EIZcnqglfTgGu": "",
    "37i9dQZF1EQqedj0y9Uwvu": ""
  });

  const [currentIndex, setCurrentIndex] = useState(0); // To track the current set of 4 playlists

  const playlistsPerPage = 4; // Number of playlists to show per page

  // Function to fetch images from Spotify API
  async function fetchWebApiPlaylistImage(playlistId) {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/images/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return await response.json();
  }

  // Fetch playlist images once token is available
  useEffect(() => {
    async function fetchImages() {
      if (token) {
        try {
          const updatedImages = { ...playlistImages };

          for (let playlistId of playlistsId) {
            const data = await fetchWebApiPlaylistImage(playlistId);
            updatedImages[playlistId] = data[0]?.url || "https://via.placeholder.com/150";
          }

          setPlaylistImages(updatedImages);
        } catch (error) {
          console.error("Error fetching playlist images:", error);
        }
      }
    }

    fetchImages();
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

  // Render only the current set of 3 playlists
  const currentPlaylists = playlistsId.slice(currentIndex, currentIndex + playlistsPerPage);

  return (
    <div className="home-container">
      <h1>Home</h1>
      <h3>Top Picks for You</h3>

      {/* Displaying the current 3 playlists */}
      <div className="flex">
      <button onClick={handlePrevious} disabled={currentIndex === 0}>
          <GrPrevious />
        </button>
        {currentPlaylists.map((playlistId) => (
          <div key={playlistId}>
            <img
              src={playlistImages[playlistId]}
              alt={`Playlist ${playlistId}`}
            />
          </div>
        ))}
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
