import { useState } from "react";
import { Search, HomeFilled } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import styles from "./SearchBar.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();

  // debounced with funtion
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(null, args);
        timeoutId = null;
      }, delay);
    };
  };
  const handleSearch = debounce((value) => {
    navigate(`/search/${value}`);
  }, 800);

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
          }}
        >
          <HomeFilled
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "50%",
              backgroundColor: "#434242",
            }}
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
            color: "#777676",
            fontWeight: "800",
          }}
        />
        <input
          className={styles.search_Input}
          type="text"
          placeholder="Search..."
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
