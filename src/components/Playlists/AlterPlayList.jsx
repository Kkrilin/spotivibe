import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPlaylist } from "../../redux/profileSlice";
import { useDispatch } from "react-redux";
import { Search } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useTheme } from "../Context/ThemeProvider.jsx";
const AlterPlayList = ({
  handleClose,
  track,
  requiredPlaylist,
  setRequiredPlaylist,
  setTracks,
  colorGradient,
}) => {
  const { data, playlists } = useSelector((state) => state.profile);
  const [searchPlaylist, setSearchPlaylist] = useState("");
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = data.id;

  const token = localStorage.getItem("access_token");
  const createPlaylist = async () => {
    const createUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const body = {
      name: track.name || track.track.name,
      description: "",
      public: true,
    };
    try {
      const createResponse = await axios.post(createUrl, body, header);
      const playlistId = createResponse.data.id;
      if (playlistId) {
        navigate(`/playlist/${playlistId}`);
        dispatch(addPlaylist({ data: createResponse.data }));
      }
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPlaylist();
    handleClose();
  };

  let filteredPLaylists = playlists.filter(
    (pList) => data.id === pList.owner.id
  );

  if (searchPlaylist) {
    filteredPLaylists = filteredPLaylists.filter((playlist) =>
      playlist.name.toLowerCase().includes(searchPlaylist.toLowerCase())
    );
  }

  return (
    <div
      className="alterPlaylist_container"
      style={{
        width: "16vw",
        backgroundColor: `${isDarkMode ? "#181818" : colorGradient}`,
        padding: "1rem",
      }}
    >
      <h6>Add to Playlist</h6>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          marginTop: "1rem",
        }}
      >
        <Search
          style={{
            width: "1rem",
            height: "1.5rem",
            position: "absolute",
            marginLeft: "0.4rem",
            color: "#777676",
            fontWeight: "800",
          }}
        />
        <input
          type="text"
          placeholder="Find a playlist"
          value={searchPlaylist}
          onChange={(e) => setSearchPlaylist(e.target.value)}
          style={{
            borderRadius: "4px",
            height: "2rem",
            paddingLeft: "3rem",
            backgroundColor: "#2A2A2A",
            color: "#fff",
          }}
        />
      </div>
      <div
        style={{ margin: "1rem", display: "flex", alignItems: "center" }}
        className="create small_card"
        onClick={handleSubmit}
      >
        <span className="plus">+</span>
        <span style={{ color: "#fff" }}>New playlist</span>
      </div>
      <hr />
      <div
        style={{
          overflowY: "scroll",
          height: "20vh",
          marginTop: "0.8rem",
          marginBottom: "0.8rem",
        }}
      >
        {filteredPLaylists.map((playlist) => (
          <div key={playlist.id}>
            <CheckBoxPlaylist
              pList={playlist}
              trackId={track.id || track.track.id}
              requiredPlaylist={requiredPlaylist}
              setRrequiredPlaylist={setRequiredPlaylist}
              handleClose={handleClose}
              setTracks={setTracks}
            />
          </div>
        ))}
      </div>
      <hr />

      <h5
        style={{
          textAlign: "right",
          marginTop: "1rem",
          color: `${isDarkMode ? "#fff" : "#000"}`,
          fontSize: "1rem",
          backgroundColor: `${isDarkMode ? "#000" : "#fff"}`,
          // width: "2rem",
          cursor: "pointer",
          padding: "0.5rem",
          borderRadius: "4px",
          fontWeight: "600",
          border: "1px solid #000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => handleClose()}
      >
        Ok
      </h5>
      <form onSubmit={handleSubmit} className="alterPlaylist_form"></form>
    </div>
  );
};

const CheckBoxPlaylist = ({
  pList,
  trackId,
  requiredPlaylist,
  handleClose,
  setTracks,
}) => {
  const [playlist, setPlaylist] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [check, setCheck] = useState(false);
  const token = localStorage.getItem("access_token");
  const { isDarkMode } = useTheme();

  const playListUrl = `https://api.spotify.com/v1/playlists/${pList.id}`;
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    const fetchPlayList = async () => {
      setLoading(true);
      try {
        const response = await axios.get(playListUrl, header);
        setPlaylist(response.data);
        const itemCheck =
          response.data.tracks &&
          response.data.tracks.items.find((item) => item.track.id === trackId);
        setCheck(itemCheck ? true : false);
      } catch (error) {
        setError(error.response.data.error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayList();
  }, []);

  const removeAddItemUrl = `https://api.spotify.com/v1/playlists/${pList.id}/tracks`;

  const body = {
    uris: [`spotify:track:${trackId}`],
    position: 0,
  };

  const deletePayload = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: {
      tracks: [
        {
          uri: `spotify:track:${trackId}`,
        },
      ],
      // snapshot_id: `${playlist.snapshot_id}`,
    },
  };
  const handleCheck = async () => {
    header.headers["Content-Type"] = "application/json";
    try {
      if (check) {
        body.snapshot_id = `${playlist.snapshot_id}`;
        const removeResonse = await axios.delete(
          removeAddItemUrl,
          deletePayload
        );
        setCheck(false);
        if (pList.id === requiredPlaylist.id) {
          setTracks((prev) => {
            const updatedTracks = prev.filter(
              (item) => item.id || item.track.id !== trackId
            );
            return updatedTracks;
          });
          handleClose();
        }
      } else {
        const addResonse = await axios.post(removeAddItemUrl, body, header);
        setCheck(true);
      }
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
    }
  };
  //   useEffect(() => {
  //     handleCheck();
  //   }, [pList.id, trackId]);

  return (
    <div
      className={`small_card ${!isDarkMode ? "light_hover" : ""}`}
      style={{
        justifyContent: "space-between",
        height: "50px",
        alignItems: "center",
      }}
    >
      <label
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#fff",

          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Avatar
            sx={{ width: 40, height: 40 }}
            alt="Spotify logo"
            src={
              playlist.images &&
              playlist.images.length &&
              playlist.images[0].url
            }
            variant="rounded"
          />
          <h5
            className="name"
            style={{ color: `${isDarkMode ? "#fff" : "#000"}` }}
          >
            {playlist.name}
          </h5>
        </div>
        <input
          style={{ width: "20px", height: "20px", borderRadius: "50%" }}
          type="checkbox"
          checked={check ? true : false}
          onChange={handleCheck}
        />
      </label>
    </div>
  );
};

export default AlterPlayList;
