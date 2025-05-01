import { Avatar } from "@mui/material";
import { lightGreen } from "@mui/material/colors";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector } from "react-redux";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "../Context/ThemeProvider";
import config from "../../config/config";

function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
  const profileData = useSelector((state) => state.profile);
  const navigate = useNavigate();

  const imgUrl = profileData.data.images && profileData.data.images[0].url;
  const { clientId } = config;

  const getRefreshToken = async () => {
    // refresh token that has been previously stored
    const refreshToken = localStorage.getItem("refresh_token");
    const { tokenUrl } = config;

    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: clientId,
      }),
    };
    const body = await fetch(tokenUrl, payload);
    const response = await body.json();

    localStorage.setItem("access_token", response.access_token);
    localStorage.setItem("expire_in", response.expires_in);
    if (response.refresh_token) {
      localStorage.setItem("refresh_token", response.refresh_token);
    }
  };
  const handleRefreshClick = () => {
    getRefreshToken()
      .then(() => {
        console.log("Access token refreshed successfully");
        navigate("/user");
      })
      .catch((error) => {
        console.error("Error refreshing access token:", error);
      });
    console.log("Refresh Access Token clicked");
  };

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
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          style={{
            fontSize: "0.8rem",
            color: `${isDarkMode ? "#000" : "#fff"}`,
            backgroundColor: `${isDarkMode ? "#fff" : "#000"}`,
            fontWeight: "bold",
            padding: " 4px 10px",
            border: "none",
            borderRadius: "9999px",
            marginRight: "10px",
            cursor: "pointer",
          }}
          onClick={handleRefreshClick}
        >
          Refresh Access Token
        </button>
        <button
          style={{
            fontSize: "1rem",
            color: `${isDarkMode ? "#000" : "#fff"}`,
            backgroundColor: `${isDarkMode ? "#fff" : "#000"}`,
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
            backgroundColor: `${isDarkMode ? "#000" : "#fff"}`,
            padding: "4px 10px",
            margin: "10px",
          }}
        >
          <ArrowCircleDownIcon color="grey" />
          <button
            style={{
              border: "none",
              color: "grey",
              backgroundColor: "#fff",
              margin: "0 10px",
              fontSize: "1rem",
              fontWeight: "600",
              padding: "4px 10px",
              borderRadius: "9999px",
            }}
          >
            Install App
          </button>
        </div>
        <div onClick={toggleTheme}>
          {isDarkMode && (
            <LightModeIcon sx={{ marginRight: "20px", cursor: "pointer" }} />
          )}
          {!isDarkMode && (
            <DarkModeIcon sx={{ marginRight: "20px", cursor: "pointer" }} />
          )}
        </div>
        {imgUrl && (
          <Link to="/user">
            <Avatar alt="Spotify logo" src={imgUrl} />
          </Link>
        )}
        {!imgUrl && <Avatar sx={{ bgcolor: lightGreen[500] }}>S</Avatar>}
      </div>
    </header>
  );
}

export default Header;
