import { Stack } from "@mui/material";
import BasicPopover from "../Utils/Popover/BasicPopover";
const Filter = ({ handleFilterClick, filter }) => {
  return (
    <Stack>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4 style={{ color: "#fff" }}>Your Library</h4>
        <BasicPopover>
          <div className="create">
            <span className="plus">+</span>
            <span style={{ color: "#fff" }}>Create</span>
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
