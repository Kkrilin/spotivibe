import { useSelector } from "react-redux";
import { Avatar, Skeleton } from "@mui/material";
import Scrollable from "../Utils/Scrollable";
import Tracks from "../Tracks/Tracks";
import { getColorGradientPair } from "../../utils/colors";
import { useTheme } from "../Context/ThemeProvider.jsx";
const LikedSongs = () => {
  const { likedSongs, data: mydata } = useSelector((state) => state.profile);
  const { isDarkMode } = useTheme();
  const gradientPairs = getColorGradientPair(isDarkMode);
  const index = Math.floor(Math.random() * gradientPairs.length);

  return (
    <Scrollable name="Liked Songs" bgColor={index && gradientPairs[index][0]}>
      <div
        className="profile_pic"
        style={{
          backgroundImage: `${gradientPairs[index][0]}`,
        }}
      >
        <div>
          <Avatar
            sx={{
              width: 220,
              height: 220,
              borderRadius: "8px",
            }}
            style={{ backgroundImage: `${gradientPairs[index][1]}` }}
            alt="Spotify logo"
            variant="rounded"
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
          <h6 style={{ fontSize: "24px" }}>Playlist</h6>
          <h6 style={{ fontSize: "6rem" }}>Liked Songs</h6>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span>
              <Avatar
                sx={{ width: 30, height: 30 }}
                alt="Spotify logo"
                src={
                  mydata.images && mydata.images.length && mydata.images[0].url
                }
              />
            </span>
            <span
              className="name"
              style={{
                color: `${isDarkMode ? "#837f7f" : "#000"}`,
              }}
            >
              {" "}
              {mydata.display_name}
            </span>
            <span className="dot_separator" style={{ color: "#fff" }}>
              {" "}
            </span>
            <span
              className="type"
              style={{
                color: `${isDarkMode ? "#837f7f" : "#000"}`,
                fontWeight: "400",
              }}
            >
              {likedSongs.length} songs
            </span>
          </div>
        </div>
      </div>
      <div
        className="profile_bottom_Container"
        style={{
          backgroundImage: `${index && gradientPairs[index][1]}`,
        }}
      >
        <Tracks
          tracks={likedSongs.filter((track) => track)}
          colorGradient={gradientPairs[index][1]}
          type="like"
        />
      </div>
    </Scrollable>
  );
};

export default LikedSongs;
