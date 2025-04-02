import { useState, useEffect } from "react";
import { TextField, Skeleton } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader.jsx";
import { setProfileData } from "../../slice/profileSlice.js";
import Buffer from "buffer";
import axios from "axios";

const Profile = () => {
  const profileData = useSelector((state) => state.profile.data);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const profileUrl = "https://api.spotify.com/v1/me";
  const accessToken = localStorage.getItem("access_token");

  const fetchData = async () => {
    try {
      const response = await axios.get(profileUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        dispatch(setProfileData({ data: response.data }));
        // setProfileData(response.data);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      <div>
        {Object.keys(profileData).length ? (
          <div>
            <img
              // style={{ width: 210, height: 118 }}
              alt={profileData.title}
              src={profileData.images[0].url}
            />
          </div>
        ) : (
          <Skeleton
            sx={{ bgcolor: "grey.900" }}
            variant="circular"
            width={210}
            height={118}
          />
        )}
      </div>
      <h1>welcome to your profile</h1>
      {/* <Loader loading={loading} /> */}
    </div>
  );
};

export default Profile;
