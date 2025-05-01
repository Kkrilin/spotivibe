import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { Avatar, Skeleton, Stack } from "@mui/material";
import axios from "axios";
import Scrollable from "../Utils/Scrollable";
import Tracks from "../Tracks/Tracks";
import { useDispatch } from "react-redux";
import { addArtist, removeArtist } from "../../redux/profileSlice";
import AlbumCard from "../Album/AlbumCard";
import { Artist } from "../Library/Artists";
import { getColorGradientPair } from "../../utils/colors";
import ProfileSkeleton from "../Utils/SkeletonLoader/ProfileSkeleton.jsx";
import CardSkeleton from "../Utils/SkeletonLoader/CardSkeleton.jsx";
import TrackSkeleton from "../Utils/SkeletonLoader/TrackSkeleton.jsx";
import { useTheme } from "../Context/ThemeProvider.jsx";

const Artists = () => {
  const { artists } = useSelector((state) => state.profile);
  const [artistAlbums, setArtistsAlbum] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [artistRelatedArtists, setArtistRelatedArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [follow, setFollow] = useState(false);
  const [requiredArtist, setRequiredArtist] = useState({});
  const { globalCount } = useSelector((state) => state.refresh);
  const param = useParams();
  const { id } = param;
  const { isDarkMode } = useTheme();
  const gradientPairs = getColorGradientPair(isDarkMode);
  const dispatch = useDispatch();
  const indexRef = useRef(null);
  const index = indexRef.current;

  const token = localStorage.getItem("access_token");
  const artistTopTracks = `https://api.spotify.com/v1/artists/${id}/top-tracks`;
  const artistUrl = `https://api.spotify.com/v1/artists/${id}`;
  const checkFollowUrl = `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${id}`;
  const followUrl = `https://api.spotify.com/v1/me/following?type=artist&ids=${id}`;

  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const data = {
    ids: [id],
  };
  const handleFollowClick = async () => {
    header.headers["Content-Type"] = "application/json";
    try {
      if (follow) {
        await axios.delete(followUrl, header);
        dispatch(removeArtist({ id }));
        setFollow(false);
      } else {
        await axios.put(followUrl, data, header);
        dispatch(addArtist({ data: requiredArtist }));
        setFollow(true);
      }
    } catch (error) {
      setError(error.response.data.error.message);
    }
  };

  useEffect(() => {
    const fetchArtistTopSong = async () => {
      setLoading(true);
      try {
        let artist = artists.find((ar) => ar.id === param.id);
        if (!artist) {
          const artistResponse = await axios.get(artistUrl, header);
          artist = artistResponse.data;
        }
        const followCheckResponse = await axios.get(checkFollowUrl, header);
        const response = await axios.get(artistTopTracks, header);
        setRequiredArtist(artist);
        setFollow(followCheckResponse.data[0]);
        setTracks(response.data.tracks);
        indexRef.current = Math.floor(Math.random() * gradientPairs.length);
      } catch (error) {
        setLoading(false);
        setError(error.response.data.error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtistTopSong();
  }, [id, artistUrl, globalCount]);

  const artistAlbumUrl = `https://api.spotify.com/v1/artists/${id}/albums`;
  useEffect(() => {
    axios
      .get(artistAlbumUrl, header)
      .then((res) => {
        setArtistsAlbum(res.data.items);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.error.message);
      })
      .finally(() => setLoading(false));
  }, [id, globalCount]);

  useEffect(() => {
    const artistRelatedArtist = `https://api.spotify.com/v1/search?q=${requiredArtist.name}&type=artist`;
    axios
      .get(artistRelatedArtist, header)
      .then((res) => {
        setArtistRelatedArtists(res.data.artists.items);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.error.message);
      })
      .finally(() => setLoading(false));
  }, [requiredArtist.name, globalCount]);

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2 style={{ color: "#fff" }}>{error}</h2>
      </div>
    );
  }

  return (
    <Scrollable
      name={requiredArtist.name}
      bgColor={index && gradientPairs[index][0]}
    >
      {loading ? (
        <ProfileSkeleton />
      ) : (
        <div
          className="profile_pic"
          style={{
            backgroundImage: `${index && gradientPairs[index][0]}`,
          }}
        >
          <div>
            <Avatar
              sx={{ width: 220, height: 220 }}
              alt="Spotify logo"
              src={requiredArtist.images && requiredArtist.images[0].url}
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
            <h6 style={{ fontSize: "6rem" }}>{requiredArtist.name}</h6>
            <span
              style={{ fontSize: "14px", color: "#a1a1a1", fontWeight: "bold" }}
            >
              Followers:{" "}
              {requiredArtist.followers && requiredArtist.followers.total}
            </span>
            <h4 style={{ textTransform: "capitalize" }}>
              genres: {requiredArtist.genres && requiredArtist.genres.join("-")}
            </h4>
          </div>
        </div>
      )}
      <div
        className="artist_Bottom_container"
        style={{
          backgroundImage: `${index && gradientPairs[index][1]}`,
        }}
      >
        {loading ? (
          <TrackSkeleton />
        ) : (
          <Tracks
            handleFollowClick={handleFollowClick}
            follow={follow}
            tracks={tracks}
            colorGradient={index && gradientPairs[index][1]}
          />
        )}
        <div style={{ padding: "1rem 0 0 2rem" }}>
          {loading ? (
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          ) : (
            <h3>Albums</h3>
          )}
          <Stack className="horizontal_scroll" direction={"row"}>
            {loading ? (
              <CardSkeleton profile={true} type="playlist" />
            ) : (
              artistAlbums
                .filter((item) => item)
                .map((item) => <AlbumCard item={item} />)
            )}
          </Stack>
        </div>
        <div style={{ padding: "1rem 0 0 2rem" }}>
          {loading ? (
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          ) : (
            <h3>Artists</h3>
          )}
          <Stack className="horizontal_scroll" direction={"row"}>
            {loading ? (
              <CardSkeleton profile={true} type="playlist" />
            ) : (
              artistRelatedArtists
                .filter((item) => item)
                .map((item) => <Artist item={item} profile={true} />)
            )}
          </Stack>
        </div>
      </div>
    </Scrollable>
  );
};

export default Artists;
