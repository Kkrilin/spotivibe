import { Stack } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { Skeleton, Typography, Avatar } from "@mui/material";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import { deepOrange } from "@mui/material/colors";
import { setPlalists } from "../../redux/profileSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const PlayLists = ({ count }) => {
  // const [playlist, setPlayList] = useState([]);
  const { playlists } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token", "access_token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchPlayList = async () => {
      try {
        const userPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(userPlaylistUrl, header);
        // console.log("playlist", response.data.items);
        dispatch(setPlalists({ data: response.data.items }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlayList();
  }, [count]);
  return (
    <>
      {(playlists.length ? playlists : Array.from({ length: 3 })).map(
        (item, index) => (
          <Playlist key={index} item={item} />
        )
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
      {item ? (
        item.images ? (
          <Avatar
            sx={
              profile ? { width: 180, height: 180 } : { width: 50, height: 50 }
            }
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
        )
      ) : (
        <Skeleton
          sx={{ bgcolor: "grey.900" }}
          variant="circular"
          width={64}
          height={64}
        />
      )}
      <div>
        {item ? (
          <h6 className="name">{item.name.substring(0, 20)}</h6>
        ) : (
          <Skeleton
            sx={{ bgcolor: "grey.800", fontSize: "1rem" }}
            variant="text"
            width={64}
          />
        )}
        {item ? (
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span className="type"> {item.type}</span>
            <span className="dot_separator"> </span>
            <span className="type">{item.owner.display_name}</span>
          </div>
        ) : (
          <Skeleton
            sx={{ bgcolor: "grey.800", fontSize: "1rem" }}
            variant="text"
          />
        )}
      </div>
    </div>
  );
};

export default PlayLists;
