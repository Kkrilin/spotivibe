import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Search } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { useTheme } from "../Context/ThemeProvider.jsx";
import CircularLoader from "../Utils/CircularLoader.jsx";
import SearchTracks from "./SearchTracks.jsx";
import { getHeader, songSearchUrl } from "../../config/index.js";

const SearchForPlaylistAdd = ({ playListId, setTracks }) => {
  const { isDarkMode } = useTheme();
  const [searchResult, setSearchResult] = useState({});
  const [find, setFind] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const timer = useRef(null);

  const accessToken = localStorage.getItem("access_token");
  const header = getHeader(accessToken);

  const searchSongForPlayList = () => {
    setLoading(true);
    axios
      .get(songSearchUrl(search), header)
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
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      searchSongForPlayList();
    }, 500);
    return () => {
      clearTimeout(timer.current);
      setSearchResult({});
    };
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
              }}
            >
              <h2>Let's find something for your playlist</h2>
              <div
                onClick={() => {
                  setFind((state) => !state);
                  setSearch("");
                }}
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
                {loading && <CircularLoader />}
                {!loading &&
                  searchResult.tracks &&
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

export default SearchForPlaylistAdd;
