import { Stack } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { Skeleton, Typography, Avatar } from "@mui/material";
import { useSelector } from "react-redux";
const PlayLists = () => {
  const [playlist, setPlayList] = useState([]);
  const profileData = useSelector((state) => state.profile.data);
  const token = localStorage.getItem("access_token", "access_token");

  useEffect(() => {
    const fetchPlayList = async () => {
      try {
        const userPlaylistUrl = `https://api.spotify.com/v1/users/${profileData.id}/playlists`;
        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        console.log(profileData, "profileData");
        const response = await axios.get(userPlaylistUrl, header);
        // console.log("playlist", response.data.items);
        setPlayList(response.data.items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlayList();
  }, []);
  return (
    <>
      {playlist.map((item, index) => (
        <Playlist key={index} item={item} />
      ))}
    </>
  );
};

const Playlist = ({ item }) => {
  return (
    <div className= 'small_card'>
      {item ? (
        <Avatar alt="Spotify logo" src={item.images[0].url} />
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
          <Typography variant="h5">{item.name}</Typography>
        ) : (
          <Skeleton
            sx={{ bgcolor: "grey.800", fontSize: "1rem" }}
            variant="text"
          />
        )}
        {item ? (
          <Typography variant="h5">{item.type}</Typography>
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
