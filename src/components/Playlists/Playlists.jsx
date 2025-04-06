import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { Avatar, Skeleton } from "@mui/material";
import { useDispatch } from "react-redux";
import axios from "axios";
import Scrollable from "../Utils/Scrollable";
import Tracks from "../Tracks/Tracks";
import { addPlaylist, removePlaylist } from "../../redux/profileSlice";
import { gradientPairs } from "../../utils/colors";
import ProfileSkeleton from "../Utils/SkeletonLoader/ProfileSkeleton.jsx";
import TrackSkeleton from "../Utils/SkeletonLoader/TrackSkeleton";

const PlayLists = () => {
  const { playlists, data: mydata } = useSelector((state) => state.profile);
  const { globalCount } = useSelector((state) => state.refresh);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tracks, setTracks] = useState([]);
  const [follow, setFollow] = useState(false);
  const param = useParams();
  const dispatch = useDispatch();
  const [requiredPlaylist, setRequiredPlaylist] = useState({});
  const { id } = param;
  console.log("playlists", playlists);
  console.log(mydata, "mydata");
  const indexRef = useRef(null);
  const index = indexRef.current;
  const token = localStorage.getItem("access_token", "access_token");
  const playListItemUrl = `https://api.spotify.com/v1/playlists/${id}/tracks`;
  const playListUrl = `https://api.spotify.com/v1/playlists/${id}`;
  const checkFollowUrl = `https://api.spotify.com/v1/playlists/${id}/followers/contains`;
  const followUrl = `https://api.spotify.com/v1/playlists/${id}/followers`;
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const data = {
    public: true,
  };
  const handleFollowClick = async () => {
    header.headers["Content-Type"] = "application/json";
    try {
      if (follow) {
        console.log("follow-------", follow);
        const unfollowResponse = await axios.delete(followUrl, header);
        console.log("unfollowResponse", unfollowResponse);
        dispatch(removePlaylist({ id }));
        setFollow(false);
      } else {
        const followResponse = await axios.put(followUrl, data, header);
        console.log("followResponse", followResponse);
        dispatch(addPlaylist({ data: requiredPlaylist }));
        setFollow(true);
      }
    } catch (error) {
      setError(error.response.data.error.message);
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchPlayList = async () => {
      setLoading(true);
      try {
        let playlist = playlists.find((pl) => pl.id === id);
        if (!playlist) {
          const playListResponse = await axios.get(playListUrl, header);
          playlist = playListResponse.data;
        }
        const followCheckResponse = await axios.get(checkFollowUrl, header);
        const response = await axios.get(playListItemUrl, header);
        console.log("response plalist top track", response.data.items);
        setRequiredPlaylist(playlist);
        setFollow(followCheckResponse.data[0]);
        setTracks(response.data.items);
        indexRef.current = Math.floor(Math.random() * gradientPairs.length);
      } catch (error) {
        setError(error.response.data.error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayList();
  }, [id, playListUrl, globalCount]);

  console.log();
  console.log("track", tracks);
  return (
    <Scrollable>
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
              sx={{ width: 220, height: 220, borderRadius: "8px" }}
              alt="Spotify logo"
              src={
                requiredPlaylist.images &&
                requiredPlaylist.images.length &&
                requiredPlaylist.images[0].url
              }
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
            <h6 style={{ fontSize: "24px" }}>
              {requiredPlaylist.owner && requiredPlaylist.owner.display_name}
            </h6>
            <h6 style={{ fontSize: "6rem" }}>{requiredPlaylist.name}</h6>
            <span
              style={{ fontSize: "14px", color: "#fff", fontWeight: "bold" }}
            >
              followers :{" "}
              {(requiredPlaylist.followers &&
                requiredPlaylist.followers.total) ||
                0}
            </span>
          </div>
        </div>
      )}
      {loading ? (
        <TrackSkeleton />
      ) : (
        <Tracks
          handleFollowClick={handleFollowClick}
          follow={follow}
          type={requiredPlaylist.type}
          tracks={tracks.filter((track) => track.track)}
          colorGradient={index && gradientPairs[index][1]}
        />
      )}
    </Scrollable>
  );
};

export default PlayLists;
