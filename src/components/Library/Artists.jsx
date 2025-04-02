import axios from "axios";
import { useState, useEffect } from "react";
import { Skeleton, Typography, Avatar } from "@mui/material";

const Artists = () => {
  const [artists, setArtist] = useState([]);
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
        setArtist(response.data.artists.items);
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

const Artist = ({ item }) => {
  return (
    <div className= 'small_card'>
      {item ? (
        <Avatar alt="Spotify logo" src={item.images[0].url} />
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

export default Artists;
