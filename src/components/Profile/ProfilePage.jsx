import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData } from "../../redux/profileSlice.js";
import Scrollable from "../Utils/Scrollable.jsx";
import { getColorGradientPair } from "../../utils/colors.js";
import ProfileSkeleton from "../Utils/SkeletonLoader/ProfileSkeleton.jsx";
import { useTheme } from "../Context/ThemeProvider.jsx";
import { profileUrl, getHeader } from "../../config/index.js";
import Profile from "./Profile.jsx";
import ProfileBottom from "./ProfileBottom.jsx";

const ProfilePage = () => {
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
  const accessToken = localStorage.getItem("access_token");
  const header = getHeader(accessToken);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(profileUrl, header);
      if (response.status === 200) {
        dispatch(setProfileData({ data: response.data }));
        localStorage.setItem("profile", JSON.stringify(response.data));
      }
      indexRef.current = Math.floor(Math.random() * gradientPairs.length);
    } catch (error) {
      setError(error.response.data.error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [globalCount, accessToken]);

  if (error) {
    return <h1 style={{ color: "red" }}>{error}</h1>;
  }

  return (
    <Scrollable
      name={profileData.data.display_name}
      bgColor={index && gradientPairs[index][0]}
    >
      {loading && <ProfileSkeleton />}
      {!loading && (
        <Profile
          index={index}
          gradientPairs={gradientPairs}
          profileData={profileData}
          isDarkMode={isDarkMode}
          playlists={playlists}
          artists={artists}
        />
      )}
      <ProfileBottom
        index={index}
        gradientPairs={gradientPairs}
        loading={loading}
        playlists={playlists}
        artists={artists}
      />
    </Scrollable>
  );
};

export default ProfilePage;
