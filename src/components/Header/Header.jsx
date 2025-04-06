import { Avatar } from "@mui/material";
import { lightGreen } from "@mui/material/colors";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
function Header() {
  const profileData = useSelector((state) => state.profile);
  const imgUrl = profileData.data.images && profileData.data.images[0].url;
  const login = profileData.login;
  return (
    <header
      style={{
        display: "flex",
        padding: " 0rem 1rem",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100vw",
        height: "7vh",
      }}
    >
      <Avatar
        alt="Spotify logo"
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png"
      />
      <div></div>
      <SearchBar />
      {/* {login ? (
      ) : ( */}
      {/* <Typography variant="h4">
        Welcome To <span style={{ color: "lightgreen" }}>SpotiVibe</span>
      </Typography> */}
      {/* )} */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          style={{
            fontSize: "1rem",
            color: "#000",
            backgroundColor: "#fff",
            fontWeight: "bold",
            padding: " 4px 10px",
            border: "none",
            borderRadius: "9999px",
          }}
        >
          Explore Premium
        </button>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#000",
            padding: "4px 10px",
            margin: "10px",
          }}
        >
          <ArrowCircleDownIcon color="grey" />
          <button
            style={{
              border: "none",
              color: "grey",
              backgroundColor: "#000",
              margin: "0 10px",
              fontSize: "1rem",
              fontWeight: "600",
            }}
          >
            Install App
          </button>
        </div>
        <NotificationsIcon sx={{ marginRight: "10px" }} />
        {imgUrl ? (
          <Link to="/user">
            <Avatar alt="Spotify logo" src={imgUrl} />
          </Link>
        ) : (
          <Avatar sx={{ bgcolor: lightGreen[500] }}>S</Avatar>
        )}
      </div>
    </header>
  );
}

export default Header;
