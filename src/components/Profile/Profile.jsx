import { useState, useEffect, useRef } from "react";
import { TextField, Skeleton, Avatar, Stack } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader.jsx";
import { setProfileData } from "../../redux/profileSlice.js";
import axios from "axios";
import Artists from "../Artists/Artists.jsx";
import Playlists from "../Playlists/Playlists.jsx";
import { Playlist } from "../Library/PlayLists.jsx";
import { Artist } from "../Library/Artists.jsx";
import Scrollable from "../Utils/Scrollable.jsx";
import HorizontalScroll from "../Utils/HorizontalScroll.jsx";
import { getColorGradientPair } from "../../utils/colors";
import ProfileSkeleton from "../Utils/SkeletonLoader/ProfileSkeleton.jsx";
import CardSkeleton from "../Utils/SkeletonLoader/CardSkeleton.jsx";
import { useTheme } from "../Context/ThemeProvider.jsx";
const Profile = () => {
  const { artists, playlists, ...profileData } = useSelector(
    (state) => state.profile
  );
  const { globalCount } = useSelector((state) => state.refresh);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();
  const gradientPairs = getColorGradientPair(isDarkMode);
  const dispatch = useDispatch();
  const indexRef = useRef(null);
  const index = indexRef.current;

  const profileUrl = "https://api.spotify.com/v1/me";
  const accessToken = localStorage.getItem("access_token");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(profileUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        dispatch(setProfileData({ data: response.data }));
        localStorage.setItem("userId", response.data.id);
      }
      indexRef.current = Math.floor(Math.random() * gradientPairs.length);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [globalCount]);
  if (error) {
    return <h1 style={{ color: "red" }}>{error}</h1>;
  }
  return (
    <Scrollable
      name={profileData.data.display_name}
      bgColor={index && gradientPairs[index][0]}
    >
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
              sx={{ width: 220, height: 220 }}
              alt="Spotify logo"
              src={profileData.data.images[0].url}
            />
          </div>

          <div
            style={{
              marginLeft: "12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h6 style={{ fontSize: "14px", fontWeight: "500" }}>Profile</h6>
            <h6 style={{ fontSize: "6rem" }}>
              {profileData.data.display_name}
            </h6>
            <span
              style={{
                fontSize: "14px",
                color: "#D5B4BC",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span
                style={{
                  color: `${isDarkMode ? "#837f7f" : "#000"}`,
                }}
              >
                {playlists.length} Public PlayLists
              </span>
              <span className="dot_separator"></span>
              <span
                style={{
                  color: `${isDarkMode ? "#837f7f" : "#000"}`,
                  fontWeight: "400",
                }}
              >
                {artists.length} Following
              </span>
            </span>
          </div>
        </div>
      )}
      <div
        className="profile_bottom_Container"
        style={{
          backgroundImage: `${index && gradientPairs[index][1]}`,
        }}
      >
        <div>
          {loading ? (
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          ) : (
            <h2>Public Playlist</h2>
          )}
          <HorizontalScroll>
            <Stack direction={"row"} spacing={2}>
              {loading ? (
                <CardSkeleton profile={true} type="playlist" />
              ) : (
                playlists.map((item) => <Playlist item={item} profile={true} />)
              )}
            </Stack>
          </HorizontalScroll>
        </div>
        <div style={{ marginTop: "2rem" }}>
          {loading ? (
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          ) : (
            <h2>Following</h2>
          )}
          <HorizontalScroll>
            <Stack direction={"row"} spacing={2}>
              {loading ? (
                <CardSkeleton profile={true} />
              ) : (
                artists.map((item) => <Artist item={item} profile={true} />)
              )}
            </Stack>
          </HorizontalScroll>
        </div>
      </div>
    </Scrollable>
  );
};

export default Profile;
