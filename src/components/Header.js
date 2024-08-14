import React, { useEffect } from 'react';
import { FaStepBackward, FaStepForward, FaPlay, FaRandom, FaRedo, FaMusic, FaHeadphones} from 'react-icons/fa';
import { PiSpeakerSimpleHighFill } from "react-icons/pi";
import { PiSpeakerSimpleNoneFill } from "react-icons/pi";
import { SiAirplayaudio } from "react-icons/si";
import { BsChatLeftQuote } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";


function Header() {
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
    <div className="header container flex space-around">
      <div className='control-panel'>
        <div className='button'>
          <button>
            <FaRandom size={15} title='Shuffle' />
          </button>
          <button>
            <FaStepBackward size={18} title='Previous' />
          </button>
          <button>
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
      <div className='now-playing flex'>
            <div>
                  <FaMusic />
            </div>
            <div className="logo-img"></div>
      </div>
      <div className='volume-panel flex space-around'>
            <div className='flex'>
                  <PiSpeakerSimpleNoneFill />
                        <input type="range" id="volume" name="volume" min="0" max="100" defaultValue="50" />
                  <PiSpeakerSimpleHighFill />
            </div>
            <div className='flex gap-10'>
            <SiAirplayaudio />
            <BsChatLeftQuote />
            <FaListUl />
            </div>
      </div>
    </div>
  );
}

export default Header;
