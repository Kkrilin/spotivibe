import { useState } from "react";
import { Search, HomeFilled } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import styles from "./SearchBar.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && search) {
      console.log("key", e.key);
      navigate(`/search/${search}`);
    }
  });

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Link to="/home">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "3.2rem",
            height: "3.2rem",
            cursor: "pointer",
            backgroundColor: "rgb(67, 66, 66)",
            borderRadius: "50%",
            marginRight: "10px",
            // padding:'5px',
          }}
        >
          <HomeFilled
            style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%" }}
          />
        </div>
      </Link>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Search
          style={{
            width: "2.4rem",
            height: "2.4em",
            position: "absolute",
            marginLeft: "0.4rem",
            color: '#777676',
            fontWeight:"800"
          }}
        />
        <input
          className={styles.search_Input}
          type="text"
          placeholder="Search..."
          value={search}
          onInput={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
