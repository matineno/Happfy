import React, { useEffect } from 'react';
import axios from 'axios';
import useSpotifyToken from '../TokenProvider';
import { FaStepBackward, FaStepForward, FaPlay, FaRandom, FaRedo, FaMusic, FaListUl} from 'react-icons/fa';
import { PiSpeakerSimpleHighFill, PiSpeakerSimpleNoneFill  } from "react-icons/pi";
import { SiAirplayaudio } from "react-icons/si";
import { BsChatLeftQuote } from "react-icons/bs";


function Header() {
  const token = useSpotifyToken();
  
  const playTrack = async () => {
    try {
      const response =await axios.put(
        'https://api.spotify.com/v1/me/player/play',
        {
          context_uri: 'spotify:album:5ht7ItJgpBH7W6vJ5BqpPr',
          offset: { position: 5 },
          position_ms: 0,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Play Track Response:', response.data);
    } catch (error) {
      console.error('Error playing track:', error);
    }
  };
  useEffect(() => {
    const volumeSlider = document.getElementById('volume');

    const handleVolumeChange = (event) => {
      console.log('Slider Value:', event.target.value);
    };

    volumeSlider.addEventListener('input', handleVolumeChange);

    return () => {
      volumeSlider.removeEventListener('input', handleVolumeChange);
    };
  }, []);

  return (
    <div className="header-content">
      <div className='control-panel'>
        <div className='button'>
          <button>
            <FaRandom size={15} title='Shuffle' />
          </button>
          <button>
            <FaStepBackward size={18} title='Previous' />
          </button>
          <button className='play-button' onClick={playTrack}>
            <FaPlay size={20} title='Play' />
          </button>
          <button>
            <FaStepForward size={18} title='Next' />
          </button>
          <button>
            <FaRedo size={15} title='Repeat' />
          </button>
        </div>
      </div>
      <div className='now-playing-cover'>
            <FaMusic size={20}/>
      </div>
      <div className='now-playing-info flex center'>
            <div className="logo-img"></div>
      </div>
      <div className='volume-panel flex space-around'>
            <div className='volume'>
                  <PiSpeakerSimpleNoneFill />
                        <input type="range" id="volume" name="volume" min="0" max="100" defaultValue="50" />
                  <PiSpeakerSimpleHighFill />
            </div>
            <div className='button'>
              <button>
                <SiAirplayaudio size={20}/>
              </button>
              <button>
                <BsChatLeftQuote size={20}/>
              </button>
              <button>
                <FaListUl size={20}/>
              </button>
            </div>
      </div>
    </div>
  );
}

export default Header;
