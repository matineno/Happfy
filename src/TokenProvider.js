import { useState, useEffect } from 'react';
import axios from 'axios';

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

const useSpotifyToken = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.post(
          'https://accounts.spotify.com/api/token',
          new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret,
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
        const fetchedToken = response.data.access_token;
        setToken(fetchedToken);
      } catch (error) {
        console.error('Error fetching the token: TokenProvider', error);
      }
    };

    fetchToken();
  }, []);

  // Log token only after it's been fetched
  useEffect(() => {
    if (token) {
      console.log('Token after fetch:', token);
    }
  }, [token]);
  
  return token;
};

export default useSpotifyToken;
