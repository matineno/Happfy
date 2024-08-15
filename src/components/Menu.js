import { IoSearch, IoAlbumsOutline, IoMusicalNoteSharp } from "react-icons/io5";
import { GoHomeFill } from "react-icons/go";
import { IoIosRadio, IoMdStar } from "react-icons/io";
import { LuClock9 } from "react-icons/lu";
import { GiMicrophone } from "react-icons/gi";
import { BsGrid3X3Gap } from "react-icons/bs";
import { AiOutlineSpotify } from "react-icons/ai";

function Menu() {



     return (
        <div>
            <div className="header"></div>
            <div className="search-box">
                <IoSearch />
                <input type="text" placeholder="Search" />
            </div>
            <section>
                <h3>Happify Music</h3>
                <ul>
                    <li className="flex"><GoHomeFill />Home</li>
                    <li className="flex"><IoIosRadio />Radio</li>
                </ul>
            </section>
            <section>
                <h3>Library</h3>
                <ul>
                    <li className="flex"><LuClock9 />Recently Added</li>
                    <li className="flex"><GiMicrophone />Artists</li>
                    <li className="flex"><IoAlbumsOutline />Albums</li>
                    <li className="flex"><IoMusicalNoteSharp />Songs</li>
                </ul>
            </section>
            <section>
                <h3>Store</h3>
                <ul>
                    <li className="flex"><AiOutlineSpotify />Spotify Store</li>
                </ul>
            </section>
            <section>
                <h3>Playlists</h3>
                <ul>
                    <li className="flex"><BsGrid3X3Gap />All Playlists</li>
                    <li className="flex"><IoMdStar />Favourite Songs</li>
                </ul>
            </section>
        </div>
    );
}

export default Menu;
