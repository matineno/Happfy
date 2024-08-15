import React, { useEffect } from 'react';
import { FaStepBackward, FaStepForward, FaPlay, FaRandom, FaRedo, FaMusic, FaListUl} from 'react-icons/fa';
import { PiSpeakerSimpleHighFill, PiSpeakerSimpleNoneFill  } from "react-icons/pi";
import { SiAirplayaudio } from "react-icons/si";
import { BsChatLeftQuote } from "react-icons/bs";


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
    <div className="header-content">
      <div className='control-panel'>
        <div className='button'>
          <button>
            <FaRandom size={15} title='Shuffle' />
          </button>
          <button>
            <FaStepBackward size={18} title='Previous' />
          </button>
          <button className='play-button'>
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
            <div className='volume flex'>
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
