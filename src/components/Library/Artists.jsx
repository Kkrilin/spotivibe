import axios from "axios";
import { useState, useEffect } from "react";
import { Skeleton, Typography, Avatar } from "@mui/material";
import { setArtists } from "../../redux/profileSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardSkeleton from "../Utils/SkeletonLoader/CardSkeleton.jsx";

const Artists = () => {
  const { artists } = useSelector((state) => state.profile);
  const { globalCount } = useSelector((state) => state.refresh);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token", "access_token");
  const followedArtistUrl =
    "https://api.spotify.com/v1/me/following?type=artist";
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchArtist = async () => {
    setLoading(true);
    try {
      const response = await axios.get(followedArtistUrl, header);
      dispatch(setArtists({ data: response.data.artists.items }));
    } catch (error) {
      setError(error.response.data.error.message);
    } finally {
      // setTimeout(() => setLoading(false), 5000);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchArtist();
  }, [globalCount]);
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      {loading ? (
        <CardSkeleton />
      ) : (
        artists.map((item, index) => (
          <Artist key={index} item={item} loading={loading} />
        ))
      )}
    </>
  );
};

export const Artist = ({ item, profile }) => {
  const navigate = useNavigate();
  return (
    <div
      className={profile ? "big_card " : "small_card"}
      onClick={() => navigate(`/artist/${item.id}`)}
    >
      <Avatar
        sx={profile ? { width: 180, height: 180 } : { width: 50, height: 50 }}
        alt="Spotify logo"
        src={item.images[0] && item.images[0].url}
      />
      <div>
        <h6 className="name">{item.name.substring(0, 20)}</h6>

        <h6 className="type">{item.type}</h6>
      </div>
    </div>
  );
};

export default Artists;
