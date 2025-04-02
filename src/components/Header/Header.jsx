import { Avatar } from "@mui/material";
import { lightGreen } from "@mui/material/colors";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

function Header() {
  const profileData = useSelector((state) => state.profile);
  const imgUrl = profileData.data.images && profileData.data.images[0].url;
  const login = profileData.login;
  return (
    <header
      style={{
        display: "flex",
        padding: " 0.4rem 2rem",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100vw",
      }}
    >
      <Avatar
        alt="Spotify logo"
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png"
      />
      {login ? (
        <SearchBar />
      ) : (
        <Typography variant="h4">
          Welcome To <span style={{ color: "lightgreen" }}>SpotiVibe</span>
        </Typography>
      )}
      {imgUrl ? (
        <Avatar alt="Spotify logo" src={imgUrl} />
      ) : (
        <Avatar sx={{ bgcolor: lightGreen[500] }}>S</Avatar>
      )}
    </header>
  );
}

export default Header;
