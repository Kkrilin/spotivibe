import * as React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import CreatePlayList from "../../Playlists/CreatePlaylist";

export default function BasicPopover({ children }) {
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
        anchorPosition={{ top: 120, left: 200 }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <CreatePlayList handleClose={handleClose} />
      </Popover>
    </div>
  );
}
