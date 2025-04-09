import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Avatar, Skeleton } from "@mui/material";
import axios from "axios";
import Scrollable from "../Utils/Scrollable";
import Tracks from "../Tracks/Tracks";
import { getColorGradientPair } from "../../utils/colors";
import ProfileSkeleton from "../Utils/SkeletonLoader/ProfileSkeleton.jsx";
import TrackSkeleton from "../Utils/SkeletonLoader/TrackSkeleton";
import { useTheme } from "../Context/ThemeProvider.jsx";
const Album = () => {
  const [albums, setAlbum] = useState(null);
  const { globalCount } = useSelector((state) => state.refresh);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const param = useParams();
  const { id } = param;
  const { isDarkMode } = useTheme();
  const  gradientPairs  = getColorGradientPair(isDarkMode);
  const token = localStorage.getItem("access_token", "access_token");
  const albumUrl = `https://api.spotify.com/v1/albums/${id}`;
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // const gradientPairs =
  const index = Math.floor(Math.random() * gradientPairs.length);
  const fetchAlbum = async () => {
    setLoading(true);
    try {
      const response = await axios.get(albumUrl, header);
      setAlbum(response.data);
    } catch (error) {
      setError(error.response.data.error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAlbum();
  }, [id, globalCount]);
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <Scrollable
      name={albums && albums.name}
      bgColor={index && gradientPairs[index][0]}
    >
      {loading ? (
        <ProfileSkeleton />
      ) : (
        <div
          className="profile_pic"
          style={{
            backgroundImage: `${gradientPairs[index][0]}`,
          }}
        >
          <div>
            <Avatar
              sx={{ width: 220, height: 220, borderRadius: "10px " }}
              alt="Spotify logo"
              src={albums.images && albums.images[0].url}
              variant="square"
            />
          </div>
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
              style={{
                fontSize: "14px",
                color: "rgb(179, 174, 174)",
                fontWeight: "bold",
              }}
            >
              ReleaseON : {albums.release_date}
            </span>
          </div>
        </div>
      )}
      {loading ? (
        <TrackSkeleton />
      ) : (
        <Tracks
          type={albums && albums.type}
          tracks={albums ? albums.tracks.items : []}
          colorGradient={gradientPairs[index][1]}
        />
      )}
    </Scrollable>
  );
};

export default Album;
