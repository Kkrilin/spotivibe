import Artists from "./Artists.jsx";
import PlayLists from "./PlayLists.jsx";
import Filter from "./Filter.jsx";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from "@mui/icons-material/List";
import { useState } from "react";
import LikedSong from "./LikedSong.jsx";
import { useTheme } from "../Context/ThemeProvider.jsx";

const Library = () => {
  const [filter, setFilter] = useState("");
  const { isDarkMode } = useTheme();
  const [search, setSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const handleFilterClick = (e) => {
    if (["playlist", "artist"].includes(e.target.dataset.filter)) {
      setFilter((state) =>
        state === e.target.dataset.filter ? "" : e.target.dataset.filter
      );
    }
  };
  return (
    <div
      className="scroll left_scroll"
      style={{
        backgroundColor: `${isDarkMode ? "#121212" : "#97ad9b"}`,
        color: `${isDarkMode ? "#fff" : "#000"}`,
      }}
    >
      <div
        className="library"
        style={{ backgroundColor: `${isDarkMode ? "#121212" : "#97ad9b"}` }}
      >
        <Filter filter={filter} handleFilterClick={handleFilterClick} />
        <div
          style={{
            paddingTop: "2rem",
          }}
        >
          <div className="library_search">
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                position: "relative",
                height: "3rem",
                alignItems: "center",
              }}
            >
              <SearchIcon
                style={{
                  left: "0",
                  color: `${isDarkMode ? "#777676" : "#000"}`,
                  fontWeight: "800",
                  cursor: "pointer",
                  position: "absolute",
                }}
                onClick={() => setIsSearchOpen((state) => !state)}
              />
              {isSearchOpen && (
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onInput={(e) => setSearch(e.target.value)}
                  onBlur={() => {
                    setSearch("");
                    setIsSearchOpen((state) => !state);
                  }}
                  style={{
                    borderRadius: "4px",
                    paddingLeft: "1.6rem",
                    backgroundColor: `${isDarkMode ? "#1F1F1F" : "#fff"}`,
                    color: `${isDarkMode ? "#fff" : "#000"}`,
                    width: "0",
                  }}
                  className={`${isSearchOpen}` ? "filter_search" : ""}
                />
              )}
            </div>
            <div className="libray_menu_bar">
              <span
                style={{
                  fontSize: "0.9rem",
                  color: `${isDarkMode ? "#fff" : "#000"}`,
                }}
              >
                Recents
              </span>
              <ListIcon
                style={{
                  color: `${isDarkMode ? "#fff" : "#000"}`,
                }}
              />
            </div>
          </div>
          <LikedSong />
          {(filter === "artist" || !filter) && <Artists search={search} />}
          {(filter === "playlist" || !filter) && <PlayLists search={search} />}
        </div>
      </div>
    </div>
  );
};

export default Library;
