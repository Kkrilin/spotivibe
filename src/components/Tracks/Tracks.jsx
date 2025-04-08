import { Button, Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { likeSong, setSongDetail } from "../../redux/songDetailSlice";
import BasicPopover from "../Utils/Popover/BasicPopover";
import { AddCircleOutline } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { addLikeSong, removeLikeSong } from "../../redux/profileSlice";
import LibraryPopover from "../Utils/Popover/LibraryPopover";
import { useTheme } from "../Context/ThemeProvider.jsx";

const Tracks = ({
  tracks,
  colorGradient,
  type,
  follow,
  handleFollowClick,
  requiredPlaylist,
  setRequiredPlaylist,
  setTracks,
}) => {
  if (["playlist_search", "search"].includes(type)) {
    return (
      <div style={{ padding: "1.5rem" }}>
        {tracks.map((track, i) => (
          <Track
            type={type}
            key={i + 1}
            count={i + 1}
            id={track.id}
            track={track}
          />
        ))}
      </div>
    );
  }
  const { isDarkMode } = useTheme();

  return (
    <div
      
    >
      <div
        style={{ display: "flex", alignItems: "center", paddingTop: "1rem" }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "green",
            // position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "20px",
          }}
        >
          <div
            style={{
              width: "0",
              height: "0",
              borderLeft: "18px solid black",
              borderTop: "9px solid transparent",
              borderBottom: "9px solid transparent",
              //   position: "absolute",
            }}
          ></div>
        </div>
        {type !== "like" ? (
          <>
            {["album", "playlist"].includes(type) ? (
              <div
                onClick={
                  type === "playlist"
                    ? handleFollowClick
                    : () => console.log(type)
                }
              >
                {follow ? (
                  <CheckCircleOutlineIcon
                    style={{
                      width: "2rem",
                      height: "2rem",
                      marginLeft: "20px",
                      color: "grey",
                      cursor: "pointer",
                      // backgroundColor:"green"
                    }}
                    className="check_follow"
                  />
                ) : (
                  <AddCircleOutlineIcon
                    style={{
                      width: "2rem",
                      height: "2rem",
                      marginLeft: "20px",
                      color: "grey",
                      cursor: "pointer",
                    }}
                    className="check_follow"
                  />
                )}
              </div>
            ) : (
              <Button
                onClick={handleFollowClick}
                style={{
                  color: `${isDarkMode ? "#fff" : "#000"}`,
                  textTransform: "capitalize",
                  borderRadius: "100000px",
                  padding: "2px 1rem",
                }}
                className="follow_button"
                variant="outlined"
                color="success"
              >
                {follow ? "Following" : "Follow"}
              </Button>
            )}
            <div
              style={{ color: "grey", marginLeft: "20px", cursor: "pointer" }}
            >
              <span>&#9679;</span>
              <span>&#9679;</span>
              <span>&#9679;</span>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <h2 style={{ marginTop: "20px" }}>Top Track</h2>
      <div style={{ padding: "1.5rem" }}>
        {tracks.length &&
          tracks.map((track, i) => (
            <Track
              type={type}
              key={i + 1}
              count={i + 1}
              id={track.id || track.track.id}
              track={track}
              requiredPlaylist={requiredPlaylist}
              setRequiredPlaylist={setRequiredPlaylist}
              setTracks={setTracks}
            />
          ))}
      </div>
    </div>
  );
};

const Track = ({
  track,
  count,
  id,
  type,
  requiredPlaylist,
  setRequiredPlaylist,
  setTracks,
}) => {
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  const [like, setLike] = useState();
  const [error, setError] = useState(false);
  const value = useMemo(() => {
    const minute = Math.floor(
      (track.duration_ms || track.track.duration_ms) / (60 * 1000)
    );
    const second = (track.duration_ms || track.track.duration_ms) % 60;
    return `${minute}:${second}`;
  }, []);
  const { songDetail, songLike } = useSelector((state) => state.songDetail);
  const token = localStorage.getItem("access_token");
  const { isDarkMode } = useTheme();
  console.log("isDarkMode", isDarkMode);
  const handleMouseOver = () => {
    setHover(true);
  };

  const handleMouseOut = () => {
    setHover(false);
  };
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const songDetailUrl = `https://api.spotify.com/v1/tracks/${id}`;
  const handleSongClick = () => {
    axios
      .get(songDetailUrl, header)
      .then((res) => {
        dispatch(setSongDetail({ data: res.data }));
      })
      .catch((err) => console.log(err));
  };

  const checkSavedSong = () => {
    const checkSaveSongUrl = `https://api.spotify.com/v1/me/tracks/contains?ids=${id}`;

    axios
      .get(checkSaveSongUrl, header)
      .then((res) => {
        setLike(res.data[0]);
      })
      .catch((err) => {
        setError(err.response.data.error.message);
      });
  };

  // useEffect(() => {
  //   if (songDetail.id === id) {
  //     checkSavedSong();
  //   }
  // }, [songLike]);

  useEffect(() => {
    checkSavedSong();
  }, []);

  const handleLikeClick = () => {
    const songLikeUrl = `https://api.spotify.com/v1/me/tracks?ids=${id}`;
    header.headers["Content-Type"] = "application/json";
    if (like) {
      axios
        .delete(songLikeUrl, header)
        .then((res) => {
          setLike(false);
          console.log("songDetail unlike", songDetail.id, id);
          if (songDetail.id === id) {
            dispatch(likeSong({ data: false }));
          }
          dispatch(removeLikeSong({ id: id }));
        })
        .catch((err) => setError(err.response.data.error.message));
    } else {
      axios
        .put(songLikeUrl, null, header)
        .then((res) => {
          setLike(true);
          console.log("songDetail like", songDetail.id, id);
          console.log("track", track);
          if (songDetail.id === id) {
            dispatch(likeSong({ data: true }));
          }
          dispatch(addLikeSong({ item: { track: track.track || track } }));
        })
        .catch((err) => setError(err.response.data.error.message));
    }
  };
  return (
    <div
      className={`track_card ${!isDarkMode ? "light_hover" : ""}`}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
      id={id}
    >
      <div style={{ width: "600px" }} onClick={handleSongClick}>
        <h3 style={{ textAlign: "right" }}>{count}</h3>
        {type === "album" ? (
          ""
        ) : (
          <Avatar
            sx={{ width: 36, height: 36 }}
            alt="Spotify logo"
            src={
              track.album
                ? track.album.images[0].url
                : track.track.album.images[0].url
            }
            variant="square"
          ></Avatar>
        )}
        <h4 style={{ color: `${isDarkMode ? "#fff" : "#000"}`, }}>{track.name || track.track.name}</h4>
      </div>
      <span>{track.popularity}</span>
      {hover ? (
        // <BasicPopover>
        // <div onClick={handleLikeClick}>
        <>
          {like ? (
            <CheckCircleIcon
              style={{
                color: "lightGreen",
                borderRadius: "50%",
                cursor: "pointer",
                width: "1.2rem",
                height: "1.2rem",
              }}
              onClick={handleLikeClick}
            />
          ) : (
            <AddCircleOutline
              style={{
                width: "1.2rem",
                height: "1.2rem",
                marginLeft: "10px",
                color: "grey",
                cursor: "pointer",
              }}
              onClick={handleLikeClick}
              className="check_follow"
            />
          )}
          <LibraryPopover
            track={track}
            requiredPlaylist={requiredPlaylist}
            setRequiredPlaylist={setRequiredPlaylist}
            setTracks={setTracks}
          >
            <div className="search_add">
              <h3>Add</h3>
            </div>
          </LibraryPopover>
        </>
      ) : (
        // </div>
        // </BasicPopover>
        <>
          <div style={{ width: "1.4rem" }}></div>
          <div style={{ width: "1.8rem" }}></div>
        </>
      )}
      <h3 style={{ width: "1.2rem" }}>{value}</h3>
    </div>
  );
};

export default Tracks;
