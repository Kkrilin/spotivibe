import { useState } from "react";
import { Search, HomeFilled } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "3rem",
          height: "3rem",
          cursor: "pointer",
        }}
      >
        <HomeFilled style={{ width: "2.5rem", height: "2.5rem" }} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Search
          style={{
            width: "2.5rem",
            height: "2.5em",
            position: "absolute",
            marginLeft: "0.4rem",
          }}
        />
        <input
          className={styles.search_Input}
          type="text"
          placeholder="Search..."
        />
      </div>
    </div>
  );
};

export default SearchBar;
