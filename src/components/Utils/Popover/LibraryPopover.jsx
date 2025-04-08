import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CreatePlayList from "../../Playlists/CreatePlaylist";
import AlterPlayList from "../../Playlists/AlterPlayList";

export default function LibraryPopover({
  children,
  track,
  requiredPlaylist,
  setRequiredPlaylist,
  setTracks,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        className="create_button"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        {children}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 200, left: 1400 }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <AlterPlayList
          handleClose={handleClose}
          track={track}
          requiredPlaylist={requiredPlaylist}
          setRequiredPlaylist={setRequiredPlaylist}
          setTracks={setTracks}
        />
      </Popover>
    </div>
  );
}
