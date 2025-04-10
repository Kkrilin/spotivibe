import axios from "axios";
import { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import { Avatar, Stack } from "@mui/material";
import { addItemToPlaylist } from "../../redux/profileSlice";
import { useDispatch } from "react-redux";
import { useTheme } from "../Context/ThemeProvider.jsx";
const SearchForPlaylistAdd = ({ playListId, setTracks }) => {
  const { isDarkMode } = useTheme();
  const [searchResult, setSearchResult] = useState({});
  const [find, setFind] = useState(false);
  const [search, setSearch] = useState("");
  // const globalCount = useSelector((state) => state.refresh.globalCount);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const accessToken = localStorage.getItem("access_token");
  const searchUrl = `https://api.spotify.com/v1/search?q=${search}&type=track`;
  const header = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const searchSongForPlayList = () => {
    setLoading(true);
    axios
      .get(searchUrl, header)
      .then((res) => {
        setError("");
        if (res.status !== 200) {
          throw new Error("Error fetching data");
        }
        setSearchResult(res.data);
      })
      .catch((err) => {
        setError(err.response.data.error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // debounced with useEffect
  useEffect(() => {
    if (!search) {
      setSearchResult({});
      return;
    }
    let timer = setTimeout(() => searchSongForPlayList(), 500);
    return () => clearTimeout(timer);
  }, [search]);

  if (error) {
    return (
      <div>
        <h2 style={{ color: "red" }}>{error}</h2>
      </div>
    );
  }

  return (
    <>
      {!find && (
        <>
          <hr
            style={{ borderTop: "0.04rem solid grey", margin: "0 2rem" }}
          ></hr>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <h4
              style={{
                margin: "1rem 2rem 0 0",
                cursor: "pointer",
                width: "fit-content",
                marginBottom: "2rem",
                backgroundColor: `${isDarkMode ? "#222" : "#97ad9b"}`,
                padding: "0.5rem 1rem",
                borderRadius: "4px",
              }}
              onClick={() => setFind((state) => !state)}
            >
              Find Song For Playlist
            </h4>
          </div>
        </>
      )}
      {find && (
        <>
          <hr
            style={{ borderTop: "0.04rem solid grey", margin: "0 2rem" }}
          ></hr>
          <div style={{ paddingLeft: "2rem", paddingTop: "2rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                // width: "100%",
              }}
            >
              <h2>Let's find something for your playlist</h2>
              <div
                onClick={() => setFind((state) => !state)}
                style={{
                  marginRight: "2rem",
                  fontSize: "2rem",
                  cursor: "pointer",
                }}
              >
                x
              </div>
            </div>
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
                  width: "2rem",
                  height: "2rem",
                  position: "absolute",
                  marginLeft: "0.4rem",
                  color: "#777676",
                  fontWeight: "800",
                }}
              />
              <input
                type="text"
                placeholder="Search for songs"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  borderRadius: "4px",
                  height: "2.5rem",
                  paddingLeft: "3rem",
                  backgroundColor: "#2A2A2A",
                  color: "#fff",
                }}
              />
            </div>
          </div>
          <div style={{ paddingLeft: "2rem" }}>
            <Stack>
              <div style={{ padding: "1.5rem" }}>
                {searchResult.tracks &&
                  searchResult.tracks.items.map((item, i) => (
                    <SearchTracks
                      track={item}
                      playListId={playListId}
                      setTracks={setTracks}
                      key={1 + i}
                    />
                  ))}
              </div>
            </Stack>
          </div>
        </>
      )}
    </>
  );
};

const SearchTracks = ({ track, playListId, setTracks }) => {
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();

  const token = localStorage.getItem("access_token");
  const addItemUrl = `https://api.spotify.com/v1/playlists/${playListId}/tracks`;
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const body = {
    uris: [`spotify:track:${track.id}`],
  };
  const handleAddClick = () => {
    axios
      .post(addItemUrl, body, header)
      .then((res) => {
        setTracks((state) => {
          return [...state, { track }];
        });
        // dispatch(addItemToPlaylist({ plId: playListId, item: track }));
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={`track_card ${!isDarkMode ? "light_hover" : ""}`}>
      <div style={{ width: "600px" }}>
        <Avatar
          sx={{ width: 36, height: 36 }}
          alt="Spotify logo"
          src={
            track.album
              ? track.album.images[0].url
              : track.track.album.images[0].url
          }
          variant="square"
        ></Avatar>
        <div>
          <h5
            className="name"
            style={{
              fontWeight: "500",
              color: `${isDarkMode ? "#837f7f" : "#000"}`,
            }}
          >
            {track.name || track.track.name}
          </h5>
          <h6
            className="type"
            style={{
              fontWeight: "400",
              fontSize: "0.8rem",
              color: `${isDarkMode ? "#837f7f" : "#000"}`,
            }}
          >
            {track.artists.map((ar) => ar.name).join(", ")}
          </h6>
        </div>
      </div>
      <div onClick={handleAddClick} className="search_add">
        <h3>Add</h3>
      </div>
    </div>
  );
};

export default SearchForPlaylistAdd;
