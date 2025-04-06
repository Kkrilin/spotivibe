import { Stack } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { Skeleton, Typography, Avatar } from "@mui/material";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import { deepOrange } from "@mui/material/colors";
import { setPlalists } from "../../redux/profileSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardSkeleton from "../Utils/SkeletonLoader/CardSkeleton.jsx";

const PlayLists = () => {
  const { playlists } = useSelector((state) => state.profile);
  const { globalCount } = useSelector((state) => state.refresh);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token", "access_token");
  const userId = localStorage.getItem("userId");

  const fetchPlayList = async () => {
    setLoading(true);
    try {
      const userPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(userPlaylistUrl, header);
      dispatch(setPlalists({ data: response.data.items }));
    } catch (error) {
      setError(error.response.data.error.message);
      console.log(error);
    } finally {
      // setTimeout(() => setLoading(false), 3000);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayList();
  }, [globalCount]);

  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <>
      {loading ? (
        <CardSkeleton type={"playlist"} />
      ) : (
        playlists.map((item, index) => <Playlist key={index} item={item} />)
      )}
    </>
  );
};

export const Playlist = ({ item, profile }) => {
  const navigate = useNavigate();
  return (
    <div
      className={profile ? "big_card" : "small_card"}
      onClick={() => navigate(`/playlist/${item.id}`)}
    >
      {item.images ? (
        <Avatar
          sx={profile ? { width: 180, height: 180 } : { width: 50, height: 50 }}
          alt="Spotify logo"
          src={item.images && item.images.length && item.images[0].url}
          variant="rounded"
        />
      ) : (
        <Avatar
          sx={
            profile
              ? { bgcolor: deepOrange[500], width: 180, height: 180 }
              : { bgcolor: deepOrange[500], width: 48, height: 48 }
          }
          variant="rounded"
        >
          <AudiotrackIcon />
        </Avatar>
      )}
      <div>
        <h6 className="name">{item.name.substring(0, 20)}</h6>

        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span className="type"> {item.type}</span>
          <span className="dot_separator"> </span>
          <span className="type">{item.owner.display_name}</span>
        </div>
      </div>
    </div>
  );
};

export default PlayLists;
