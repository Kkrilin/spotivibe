import { Stack } from "@mui/material";
import BasicPopover from "../Utils/Popover/BasicPopover";
import { useTheme } from "../Context/ThemeProvider";

const Filter = ({ handleFilterClick, filter }) => {
  const { isDarkMode } = useTheme();
  return (
    <Stack>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4 style={{ color: `${isDarkMode ? "#fff" : "#000"}` }}>
          Your Library
        </h4>
        <BasicPopover>
          <div
            className="create"
            style={{
              color: `${isDarkMode ? "#rgb(222, 218, 218)" : "#000"}`,
              backgroundColor: `${
                isDarkMode ? "rgba(52, 52, 52, 0.88)" : "rgb(222, 218, 218)"
              }`,
            }}
          >
            <span
              className="plus"
              style={{ color: `${isDarkMode ? "#fff" : "#000"}` }}
            >
              +
            </span>
            <span style={{ color: `${isDarkMode ? "#fff" : "#000"}` }}>
              Create
            </span>
          </div>
        </BasicPopover>
      </div>
      <div onClick={handleFilterClick} style={{ marginTop: "24px" }}>
        <span
          className={
            filter === "playlist" ? "playlist active_filter" : "playlist"
          }
          data-filter="playlist"
        >
          Playlists
        </span>
        <span
          className={filter === "artist" ? "artist active_filter" : "artist"}
          data-filter="artist"
        >
          Artists
        </span>
      </div>
    </Stack>
  );
};

export default Filter;
