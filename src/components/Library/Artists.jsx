import axios from "axios";
import { useState, useEffect } from "react";
import { setArtists } from "../../redux/profileSlice.js";
import { useSelector, useDispatch } from "react-redux";
import CardSkeleton from "../Utils/SkeletonLoader/CardSkeleton.jsx";
import Artist from './Artist.jsx';

const Artists = ({ search }) => {
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

  let filteredArtists = artists;
  if (search) {
    filteredArtists = artists.filter((ar) =>
      ar.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      {loading ? (
        <CardSkeleton />
      ) : (
        filteredArtists.map((item, index) => (
          <Artist key={index} item={item} loading={loading} />
        ))
      )}
    </>
  );
};

export default Artists;
