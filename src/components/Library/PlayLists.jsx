import { Stack } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { Skeleton, Typography, Avatar } from "@mui/material";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import { deepOrange } from "@mui/material/colors";
import { setPlalists } from "../../slice/profileSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const PlayLists = () => {
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
  }, []);
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
              profile ? { width: 160, height: 160 } : { width: 48, height: 48 }
            }
            alt="Spotify logo"
            src={item.images[0].url}
            variant="square"
          />
        ) : (
          <Avatar
            sx={{ bgcolor: deepOrange[500], width: 48, height: 48 }}
            variant="square"
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
          <Typography style={{ fontSize: "1rem" }} variant="h6">
            {item.name.substring(0, 20)}
          </Typography>
        ) : (
          <Skeleton
            sx={{ bgcolor: "grey.800", fontSize: "1rem" }}
            variant="text"
            width={64}
          />
        )}
        {item ? (
          <Typography style={{ fontSize: "0.8rem" }} variant="h6">
            {item.type}
          </Typography>
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
