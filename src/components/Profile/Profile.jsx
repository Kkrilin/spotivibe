import { useState, useEffect } from "react";
import { TextField, Skeleton, Avatar, Stack } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader.jsx";
import { setProfileData } from "../../slice/profileSlice.js";
import Buffer from "buffer";
import axios from "axios";
import Artists from "../Artists/Artists.jsx";
import Playlists from "../Playlists/Playlists.jsx";
import { Playlist } from "../Library/PlayLists.jsx";
import { Artist } from "../Library/Artists.jsx";
import Scrollable from "../Utils/Scrollable.jsx";

const Profile = () => {
  const { artists, playlists, ...profileData } = useSelector(
    (state) => state.profile
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // const { artists, playlists } = profileData;

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
        localStorage.setItem("userId", response.data.id);
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
    <Scrollable>

      <div
        
        className="profile_pic"
      >
        {Object.keys(profileData.data).length ? (
          <div>
            <Avatar
              sx={{ width: 220, height: 220 }}
              alt="Spotify logo"
              src={profileData.data.images[0].url}
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
        <div style={{ marginLeft: "12px", display:'flex', flexDirection:"column", justifyContent:"center", fontFamily:"Helvetica Neue" }}>
          <h6 style={{ fontSize: "14px" }}>Profile</h6>
          <h6 style={{ fontSize: "6rem"}}>
            {profileData.data.display_name}
          </h6>
          <span
            style={{ fontSize: "14px", color: "#a1a1a1", fontWeight: "bold" }}
          >
            {playlists.length} Public PlaList<span>.</span>
            {artists.length} Following
          </span>
        </div>
      </div>
      <div className="profile_bottom_Container">
      {playlists.length && (
        <Stack spacing={2}>
          <h1>Public Playlist</h1>
          {playlists.map((item) => (
            <Playlist item={item} profile={true} />
          ))}
        </Stack>
      )}
      {artists.length && (
        <>
          <h1>Follower</h1>
          <Stack direction={"row"} spacing={2}>
            {artists.map((item) => (
              <Artist item={item} profile={true} />
            ))}
          </Stack>
        </>
      )}
      </div>

    </Scrollable>
  );
};

export default Profile;
