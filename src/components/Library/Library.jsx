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
        backgroundColor: `${isDarkMode ? "#121212" : "#fff"}`,
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
            <SearchIcon
              style={{
                width: "1.8rem",
                height: "1.8rem",
                color: `${isDarkMode ? "#777676" : "#000"}`,
                fontWeight: "800",
              }}
            />
            <div className="libray_menu_bar">
              <span style={{ fontSize: "0.9rem" }}>Recents</span>
              <ListIcon />
            </div>
          </div>
          <LikedSong />
          {(filter === "artist" || !filter) && <Artists />}
          {(filter === "playlist" || !filter) && <PlayLists />}
          {/* <Artists />
        <PlayLists /> */}
        </div>
      </div>
    </div>
  );
};

export default Library;
