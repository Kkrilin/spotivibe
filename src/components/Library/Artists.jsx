import axios from "axios";
import { useState, useEffect } from "react";
import { Skeleton, Typography, Avatar } from "@mui/material";
import { setArtists } from "../../slice/profileSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const Artists = () => {
  // const [artists, setArtist] = useState([]);
  const { artists } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token", "access_token");
  const followedArtistUrl =
    "https://api.spotify.com/v1/me/following?type=artist";
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await axios.get(followedArtistUrl, header);
        // console.log("artist", response);
        dispatch(setArtists({ data: response.data.artists.items }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchArtist();
  }, []);
  return (
    <>
      {(artists.length ? artists : Array.from({ length: 3 })).map(
        (item, index) => (
          <Artist key={index} item={item} />
        )
      )}
    </>
  );
};

export const Artist = ({ item, profile }) => {
  const [artist, artistSong] = useState([]);
  const navigate = useNavigate();
  console.log(item, "item");
  return (
    <div
      className={profile ? "big_card  " : "small_card"}
      onClick={() => navigate(`/artist/${item.id}`)}
    >
      {item ? (
        <Avatar
          sx={profile ? { width: 180, height: 180 } : { width: 50, height: 50 }}
          alt="Spotify logo"
          src={item.images[0] && item.images[0].url}
        />
      ) : (
        <Skeleton
          sx={{ bgcolor: "grey.800" }}
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
            sx={{ bgcolor: "grey.800", fontSize: "1rem", width: "3rem" }}
            variant="text"
          />
        )}
        {item ? (
          <h6 className="type">{item.type}</h6>
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

export default Artists;
