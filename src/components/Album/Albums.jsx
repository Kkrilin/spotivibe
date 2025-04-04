import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Avatar, Skeleton } from "@mui/material";
import axios from "axios";
import Scrollable from "../Utils/Scrollable";
import Tracks from "../Tracks/Tracks";

const gradientPairs = [
  [
    "linear-gradient(rgb(36, 11, 54), rgb(81, 27, 124))", // Deep Purple (Profile Pic)
    "linear-gradient(rgba(36, 11, 54, 0.85) 5%, rgb(0, 0, 0) 30%)", // Faded Purple-Black (Bottom Container)
  ],
  [
    "linear-gradient(rgb(2, 0, 36), rgb(9, 9, 121), rgb(0, 212, 255))", // Dark Blue to Cyan
    "linear-gradient(rgba(2, 0, 36, 0.85) 5%, rgb(0, 0, 0) 30%)",
  ],
  [
    "linear-gradient(rgb(58, 12, 163), rgb(136, 0, 255))", // Indigo to Neon Purple
    "linear-gradient(rgba(58, 12, 163, 0.85) 5%, rgb(0, 0, 0) 30%)",
  ],
  [
    "linear-gradient(rgb(0, 0, 0), rgb(50, 50, 50))", // Pure Dark Mode
    "linear-gradient(rgba(0, 0, 0, 0.85) 5%, rgb(25, 25, 25) 30%)",
  ],
  [
    "linear-gradient(rgb(40, 48, 72), rgb(20, 24, 40))", // Midnight Blue
    "linear-gradient(rgba(40, 48, 72, 0.85) 5%, rgb(0, 0, 0) 30%)",
  ],
  [
    "linear-gradient(rgb(23, 32, 42), rgb(44, 62, 80))", // Steel Blue
    "linear-gradient(rgba(23, 32, 42, 0.85) 5%, rgb(0, 0, 0) 30%)",
  ],
];

const Album = () => {
  const [albums, setAlbum] = useState(null);
  const param = useParams();
  const { id } = param;
  const token = localStorage.getItem("access_token", "access_token");
  const albumUrl = `https://api.spotify.com/v1/albums/${id}`;
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const index = Math.floor(Math.random() * gradientPairs.length);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await axios.get(albumUrl, header);
        setAlbum(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAlbum();
  }, [id]);
  return (
    <Scrollable>
      <div
        className="profile_pic"
        style={{
          backgroundImage: `${gradientPairs[index][0]}`,
        }}
      >
        {albums ? (
          <div>
            <Avatar
              sx={{ width: 220, height: 220, borderRadius:"10px " }}
              alt="Spotify logo"
              src={albums.images[0].url}
              variant='square'
              
            />
          </div>
        ) : (
          <Skeleton
            sx={{ bgcolor: "grey.900" }}
            variant="circular"
            width={210}
            height={118}
          />
        )}
        <div
          style={{
            marginLeft: "12px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            fontFamily: "Helvetica Neue",
          }}
        >
          <h6 style={{ fontSize: "14px" }}>{albums && albums.album_type}</h6>
          <h6 style={{ fontSize: "6rem" }}>{albums && albums.name}</h6>
          <span
            style={{ fontSize: "14px", color: "#a1a1a1", fontWeight: "bold" }}
          >
            {Math.round(Math.random() * 10000000000)} mothly listeners
          </span>
        </div>
      </div>
      <Tracks
        type={albums && albums.type}
        tracks={albums ? albums.tracks.items : []}
        colorGradient={gradientPairs[index][1]}
      />
    </Scrollable>
  );
};

export default Album;
