import { Link } from "react-router-dom";
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
                    <li>
                        <Link className="flex" to="/home">
                            <GoHomeFill />Home
                        </Link>
                    </li>
                    <li>
                        <Link className="flex" to="/radio">
                            <IoIosRadio />Radio
                        </Link>
                    </li>
                </ul>
            </section>
            <section>
                <h3>Library</h3>
                <ul>
                    <li>
                        <Link className="flex" to="/recentlyadded">
                            <LuClock9 />Recently Added
                        </Link>
                    </li>
                    <li>
                        <Link className="flex" to="/artists">
                            <GiMicrophone />Artists
                        </Link>
                    </li>
                    <li>
                        <Link className="flex" to="/albums">
                            <IoAlbumsOutline />Albums
                        </Link>
                    </li>
                    <li>
                        <Link className="flex" to="/songs">
                            <IoMusicalNoteSharp />Songs
                        </Link>
                    </li>
                </ul>
            </section>
            <section>
                <h3>Store</h3>
                <ul>
                    <li>
                        <Link className="flex" to="/spotifystore">
                            <AiOutlineSpotify />Spotify Store
                        </Link>
                    </li>
                </ul>
            </section>
            <section>
                <h3>Playlists</h3>
                <ul>
                    <li className="flex">
                        <Link className="flex" to="/allplaylists">
                            <BsGrid3X3Gap />All Playlists
                        </Link>
                    </li>
                    <li className="flex">
                        <Link className="flex" to="/favouritesongs">
                            <IoMdStar />Favourite Songs
                        </Link>
                    </li>
                </ul>
            </section>
        </div>
    );
}
export default Menu;
