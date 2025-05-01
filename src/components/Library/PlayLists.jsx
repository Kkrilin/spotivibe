import axios from "axios";
import { useState, useEffect } from "react";
import { setPlalists } from "../../redux/profileSlice.js";
import { useSelector, useDispatch } from "react-redux";
import CardSkeleton from "../Utils/SkeletonLoader/CardSkeleton.jsx";
import Playlist from "./PlayList.jsx";

const PlayLists = ({ search }) => {
  const { playlists } = useSelector((state) => state.profile);
  const { globalCount } = useSelector((state) => state.refresh);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token");

  const profile = JSON.parse(localStorage.getItem("profile"));

  const fetchPlayList = async () => {
    setLoading(true);
    try {
      const userPlaylistUrl = `https://api.spotify.com/v1/users/${profile.id}/playlists`;
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(userPlaylistUrl, header);
      dispatch(setPlalists({ data: response.data.items }));
    } catch (error) {
      setError(error.response.data.error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayList();
  }, [globalCount]);

  let filteredPlaylist = playlists;

  if (search) {
    filteredPlaylist = playlists.filter((pl) =>
      pl.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <>
      {loading ? (
        <CardSkeleton type={"playlist"} />
      ) : (
        filteredPlaylist.map((item, index) => (
          <Playlist key={index} item={item} />
        ))
      )}
    </>
  );
};

export default PlayLists;
