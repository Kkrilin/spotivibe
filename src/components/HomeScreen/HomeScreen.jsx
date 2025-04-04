import { useEffect, useState } from "react";
import HorizontalScroll from "../Utils/HorizontalScroll.jsx";
import AlbumCard from "../Album/AlbumCard.jsx";
import axios from "axios";

const HomeScreen = () => {
  const [featuredPlaylist, setFeaturedPlaylist] = useState();
  const [newRelease, setNewRelease] = useState([]);

  const accessToken = localStorage.getItem("access_token");
  const featurePlaylistUrl =
    "https://api.spotify.com/v1/browse/featured-playlists";
  const header = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const newReleasesAlbumUrl = "https://api.spotify.com/v1/browse/new-releases";
  useEffect(() => {
    axios
      .get(featurePlaylistUrl, header)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    axios
      .get(newReleasesAlbumUrl, header)
      .then((res) => {
        console.log(res.data.albums.items);
        setNewRelease(res.data.albums.items);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div>
        <h2>Album</h2>
        <HorizontalScroll>
          <div className="album_container">
            {newRelease.length &&
              newRelease.map((item) => <AlbumCard item={item} />)}
          </div>
        </HorizontalScroll>
        <h1>Home homeScrrem</h1>
      </div>
    </>
  );
};

export default HomeScreen;
