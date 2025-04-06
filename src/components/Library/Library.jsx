import Artists from "./Artists.jsx";
import PlayLists from "./PlayLists.jsx";
import Filter from "./Filter.jsx";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from "@mui/icons-material/List";
import { useState } from "react";
import PullToRefresh from "../Utils/PullToRefresh.jsx";

const Library = () => {
  const [filter, setFilter] = useState("");
  const [count, setCount] = useState(0);
  const handleFilterClick = (e) => {
    if (["playlist", "artist"].includes(e.target.dataset.filter)) {
      console.log(e.target.dataset.filter);
      setFilter((state) =>
        state === e.target.dataset.filter ? "" : e.target.dataset.filter
      );
    }
  };
  return (
    <PullToRefresh setCount={setCount}>
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
            {(filter === "artist" || !filter) && <Artists count={count} />}
            {(filter === "playlist" || !filter) && <PlayLists count={count} />}
            {/* <Artists />
        <PlayLists /> */}
          </div>
        </div>
      </div>
    </PullToRefresh>
  );
};

export default Library;
