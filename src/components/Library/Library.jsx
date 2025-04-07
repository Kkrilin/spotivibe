import Artists from "./Artists.jsx";
import PlayLists from "./PlayLists.jsx";
import Filter from "./Filter.jsx";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from "@mui/icons-material/List";
import { useState } from "react";
import LikedSong from "./LikedSong.jsx";

const Library = () => {
  const [filter, setFilter] = useState("");
  const handleFilterClick = (e) => {
    if (["playlist", "artist"].includes(e.target.dataset.filter)) {
      setFilter((state) =>
        state === e.target.dataset.filter ? "" : e.target.dataset.filter
      );
    }
  };
  return (
    <div className="scroll left_scroll">
      <div className="library">
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
                color: "#777676",
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
