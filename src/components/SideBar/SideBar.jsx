import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { closeSongDetail } from "../../redux/songDetailSlice";
import { useTheme } from "../Context/ThemeProvider";
const SideBar = () => {
  const { songDetail, sideBarStyle } = useSelector((state) => state.songDetail);
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();
  console.log("songDeatl", songDetail);
  const handleClick = () => {
    dispatch(closeSongDetail());
  };

  if (!songDetail) {
    return <></>;
  }

  return (
    <div className="side_bar" style={sideBarStyle}>
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${songDetail?.album?.images[0]?.url})`,
          backgroundColor: "black",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderTopLeftRadius: "10px",
          height: "83vh",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "50vh",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
            }}
          >
            <h3
              style={{
                color: "#fff",
              }}
            >
              {songDetail &&
                songDetail.album &&
                songDetail.album.name.substring(0, 16)}
            </h3>
            <span
              style={{
                color: "#fff",
              }}
              onClick={handleClick}
              className="cross_side_bar"
            >
              x
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              // alignItems: "center",
              padding: "1rem",
            }}
          >
            <h3
              style={{
                color: "#fff",
              }}
            >
              {songDetail && songDetail.name}
            </h3>
            <h4
              style={{
                color: "#fff",
              }}
            >
              {songDetail && songDetail.artists.map((a) => a.name).join(", ")}
            </h4>
          </div>
        </div>

        <div>
          <div
            style={{
              display: "flex",
              // justifyContent: "space-between",
              flexDirection: "column",
              gap: "1rem",
              // alignItems: "center",
              padding: "2rem",
              backgroundColor: `${!isDarkMode ? "#97ad9b" : "#1F1F1F"}`,
              margin: "1rem 1rem 0 1rem",
              borderRadius: "1rem",
              height: "20rem",
              position: "absolute",
              width: "90%",
              bottom: "0",
            }}
          >
            <h3>About the Artist</h3>
            <Avatar
              sx={{ width: 60, height: 60 }}
              alt="Spotify logo"
              src={
                songDetail && songDetail.album && songDetail.album.images[0].url
              }
            />
            <h3>{songDetail && songDetail.artists[0].name}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
