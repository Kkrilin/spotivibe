import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { closeSongDetail } from "../../redux/songDetailSlice";

const SideBar = () => {
  const { songDetail, sideBarStyle } = useSelector((state) => state.songDetail);
  const dispatch = useDispatch();
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
          height: "80vh",
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
          <h3>
            {songDetail &&
              songDetail.album &&
              songDetail.album.name.substring(0, 16)}
          </h3>
          <span onClick={handleClick} className="cross_side_bar">
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
            marginTop: "16rem",
          }}
        >
          <h3>{songDetail && songDetail.name}</h3>
          <h4>
            {songDetail && songDetail.artists.map((a) => a.name).join(", ")}
          </h4>
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
              backgroundColor: "#1f1f1f",
              margin: "1rem",
              borderRadius: "1rem",
              height: "17.9rem",
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
