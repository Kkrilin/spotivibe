import { Button, Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useMemo, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSongDetail } from "../../redux/songDetailSlice";
import BasicPopover from "../Utils/BasicPopover";

const Tracks = ({ tracks, colorGradient, type, follow, handleFollowClick }) => {
  if (type === "search") {
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
  return (
    <div
      className="artist_Bottom_container"
      style={{ backgroundImage: colorGradient }}
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
        {["album", "playlist"].includes(type) ? (
          <div
            onClick={
              type === "playlist" ? handleFollowClick : () => console.log(type)
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
              color: "white",
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
        <div style={{ color: "grey", marginLeft: "20px", cursor: "pointer" }}>
          <span>&#9679;</span>
          <span>&#9679;</span>
          <span>&#9679;</span>
        </div>
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
            />
          ))}
      </div>
    </div>
  );
};

const Track = ({ track, count, id, type }) => {
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  const value = useMemo(() => {
    const minute = Math.floor(
      (track.duration_ms || track.track.duration_ms) / (60 * 1000)
    );
    const second = (track.duration_ms || track.track.duration_ms) % 60;
    return `${minute}:${second}`;
  }, []);

  const token = localStorage.getItem("access_token");
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
    console.log(track, "-------------------");
    axios
      .get(songDetailUrl, header)
      .then((res) => {
        dispatch(setSongDetail({ data: res.data }));
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div
      className="track_card"
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
      onClick={handleSongClick}
      id={id}
    >
      <div style={{ width: "600px" }}>
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
        <h4 style={{ color: "#fff" }}>{track.name || track.track.name}</h4>
      </div>
      <span>{track.popularity}</span>
      {hover ? (
        // <BasicPopover>
        <AddCircleOutlineIcon />
      ) : (
        // </BasicPopover>
        <div style={{ width: "20px" }}></div>
      )}
      <h3 style={{ width: "20px" }}>{value}</h3>
    </div>
  );
};

export default Tracks;
