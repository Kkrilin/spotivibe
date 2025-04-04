import { Button, Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useMemo, useState } from "react";
// const colors = [
//   "#ff7e5f", // Sunset Orange
//   "#feb47b", // Warm Peach
//   "#00c6ff", // Light Blue
//   "#0072ff", // Deep Blue
//   "#8e2de2", // Purple
//   "#4a00e0", // Dark Purple
//   "#00f260", // Neon Green
//   "#0575e6", // Electric Blue
//   "#f9c", // Soft Pink
//   "#ff9a9e", // Rosy Red
// ];
const Tracks = ({ tracks, colorGradient }) => {
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
            width: "50px",
            height: "50px",
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
        <Button style={{ color: "white" }} variant="outlined" color="success">
          Following
        </Button>
        <div style={{ color: "grey", marginLeft: "20px", cursor: "pointer" }}>
          <span>&#9679;</span>
          <span>&#9679;</span>
          <span>&#9679;</span>
        </div>
      </div>
      <h2 style={{ marginTop: "20px" }}>Top Track</h2>
      <div style={{ padding: "1.5rem" }}>
        {tracks.map((track, i) => (
          <Track key={i + 1} count={i + 1} id={track.id} track={track} />
        ))}
      </div>
    </div>
  );
};

const Track = ({ track, count, id }) => {
  const [hover, setHover] = useState(false);

  const value = useMemo(() => {
    const minute = Math.floor((track.duration_ms ||track.track.duration_ms)  / (60 * 1000));
    const second = (track.duration_ms||track.track.duration_ms) % 60;
    return `${minute}:${second}`;
  }, []);

  const handleMouseOver = () => {
    setHover(true);
  };

  const handleMouseOut = () => {
    setHover(false);
  };
  return (
    <div
      className="track_card"
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
      id={id}
    >
      <div style={{ width: "600px" }}>
        <h3 style={{ textAlign: "right" }}>{count}</h3>
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
        <h4 style={{ color: "#fff" }}>{track.name ||track.track.name}</h4>
      </div>
      <span>{track.popularity}</span>
      {hover ? <AddCircleOutlineIcon /> : <div style={{ width: "20px" }}></div>}
      <h3 style={{ width: "20px" }}>{value}</h3>
    </div>
  );
};

export default Tracks;
