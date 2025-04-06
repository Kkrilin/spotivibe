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
import { gradientPairs } from "../../utils/colors";
import PullToRefresh from "../Utils/PullToRefresh";

const Artists = () => {
  const { artists } = useSelector((state) => state.profile);
  const [artistAlbums, setArtistsAlbum] = useState([]);
  const [artistRelatedArtists, setArtistRelatedArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [follow, setFollow] = useState(false);
  const [requiredArtist, setRequiredArtist] = useState({});
  // const { globalCount } = useSelector((state) => state.refresh);
  const [count, setCount] = useState(0);
  const param = useParams();
  const { id } = param;
  const dispatch = useDispatch();
  const indexRef = useRef(null);
  const index = indexRef.current;
  const artistTopTracks = `https://api.spotify.com/v1/artists/${id}/top-tracks`;
  const artistUrl = `https://api.spotify.com/v1/artists/${id}`;
  const checkFollowUrl = `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${id}`;
  const token = localStorage.getItem("access_token");
  const followUrl = `https://api.spotify.com/v1/me/following?type=artist&ids=${id}`;
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
      // "Content-Type": "application/json",
    },
  };
  const data = {
    ids: [id],
  };
  const handleFollowClick = async () => {
    header.headers["Content-Type"] = "application/json";
    try {
      if (follow) {
        const unfollowResponse = await axios.delete(followUrl, header);
        console.log("unfollowResponse", unfollowResponse);
        dispatch(removeArtist({ id }));
        setFollow(false);
      } else {
        const followResponse = await axios.put(followUrl, data, header);
        console.log("followResponse", followResponse);
        dispatch(addArtist({ data: requiredArtist }));
        setFollow(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchArtistTopSong = async () => {
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
        console.log(error);
      }
    };

    fetchArtistTopSong();
  }, [id, artistUrl, count]);

  console.log(requiredArtist, "requiredAttisy");

  const artistAlbumUrl = `https://api.spotify.com/v1/artists/${id}/albums`;
  useEffect(() => {
    axios
      .get(artistAlbumUrl, header)
      .then((res) => {
        console.log(res.data, "-------------");
        setArtistsAlbum(res.data.items);
      })
      .catch((err) => console.log(err));
  }, [id, count]);

  useEffect(() => {
    const artistRelatedArtist = `https://api.spotify.com/v1/search?q=${requiredArtist.name}&type=artist`;
    axios
      .get(artistRelatedArtist, header)
      .then((res) => {
        setArtistRelatedArtists(res.data.artists.items);
        console.log(res.data.artists);
      })
      .catch((err) => console.log(err));
  }, [requiredArtist.name, count]);

  return (
    <Scrollable>
      <PullToRefresh setCount={setCount}>
        <div
          className="profile_pic"
          style={{
            backgroundImage: `${index && gradientPairs[index][0]}`,
          }}
        >
          {Object.keys(requiredArtist).length ? (
            <div>
              <Avatar
                sx={{ width: 220, height: 220 }}
                alt="Spotify logo"
                src={requiredArtist.images[0].url}
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
            {/* <h6 style={{ fontSize: "14px" }}>Verifie dArtist</h6> */}
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
        <Tracks
          handleFollowClick={handleFollowClick}
          follow={follow}
          tracks={tracks}
          colorGradient={index && gradientPairs[index][1]}
        />
        <div style={{ padding: "2rem" }}>
          <h3>Albums</h3>
          <Stack className="horizontal_scroll" direction={"row"}>
            {artistAlbums
              .filter((item) => item)
              .map((item) => (
                <AlbumCard item={item} />
              ))}
          </Stack>
        </div>
        <div style={{ padding: "2rem" }}>
          <h3>Artists</h3>
          <Stack className="horizontal_scroll" direction={"row"}>
            {artistRelatedArtists
              .filter((item) => item)
              .map((item) => (
                <Artist item={item} profile={true} />
              ))}
          </Stack>
        </div>
      </PullToRefresh>
    </Scrollable>
  );
};

export default Artists;
