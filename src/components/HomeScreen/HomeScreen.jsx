import { useEffect, useState, useRef } from "react";
import HorizontalScroll from "../Utils/HorizontalScroll.jsx";
import AlbumCard from "../Album/AlbumCard.jsx";
import axios from "axios";
import Scrollable from "../Utils/Scrollable.jsx";
import { useSelector } from "react-redux";
import { getColorGradientPair } from "../../utils/colors";
import { useTheme } from "../Context/ThemeProvider.jsx";

const HomeScreen = () => {
  const [featuredPlaylist, setFeaturedPlaylist] = useState();
  const [newRelease, setNewRelease] = useState([]);
  const { globalCount } = useSelector((state) => state.refresh);
  const { isDarkMode } = useTheme();
  const accessToken = localStorage.getItem("access_token");
  const gradientPairs = getColorGradientPair(isDarkMode);
  const indexRef = useRef(null);
  const index = indexRef.current;
  const featurePlaylistUrl =
    "https://api.spotify.com/v1/browse/featured-playlists";
  const header = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const newReleasesAlbumUrl = "https://api.spotify.com/v1/browse/new-releases";
  useEffect(() => {
    // axios
    //   .get(featurePlaylistUrl, header)
    //   .then((res) => console.log(res.data))
    //   .catch((err) => console.log(err));
    axios
      .get(newReleasesAlbumUrl, header)
      .then((res) => {
        setNewRelease(res.data.albums.items);
        indexRef.current = Math.floor(Math.random() * gradientPairs.length);
      })
      .catch((err) => console.log(err));
  }, [globalCount]);

  return (
    <Scrollable>
      <div
        style={{
          backgroundImage: `${index && gradientPairs[index][0]}`,
          height:"100%",
          padding: "2rem",
        }}
      >
        <h1>Home Scrrem</h1>
        <div>
          <h2>Album</h2>
          <HorizontalScroll>
            <div className="album_container">
              {newRelease.length &&
                newRelease.map((item) => <AlbumCard item={item} />)}
            </div>
          </HorizontalScroll>
        </div>
      </div>
    </Scrollable>
  );
};

export default HomeScreen;
