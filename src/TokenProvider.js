import { useState, useEffect } from 'react';
import axios from 'axios';

const clientId = 'client_id';
const clientSecret = 'client_secret';

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
        setToken(response.data.access_token);
      } catch (error) {
        console.error('Error fetching the token:', error);
      }
    };

    fetchToken();
  }, []);

  return token;
};

export default useSpotifyToken;
