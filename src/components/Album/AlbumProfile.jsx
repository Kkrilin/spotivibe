import { Avatar } from "@mui/material";
import React from "react";

export default function AlbumProfile({ gradientPairs, index, albums }) {
  return (
    <div
      className="profile_pic"
      style={{
        backgroundImage: `${gradientPairs[index][0]}`,
      }}
    >
      <div>
        <Avatar
          sx={{ width: 220, height: 220, borderRadius: "10px " }}
          alt="Spotify logo"
          src={albums.images && albums.images[0].url}
          variant="square"
        />
      </div>
      <div
        style={{
          marginLeft: "12px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          fontFamily: "Helvetica Neue",
        }}
      >
        <h6 style={{ fontSize: "14px" }}>{albums && albums.album_type}</h6>
        <h6 style={{ fontSize: "6rem" }}>{albums && albums.name}</h6>
        <span
          style={{
            fontSize: "14px",
            color: "rgb(179, 174, 174)",
            fontWeight: "bold",
          }}
        >
          ReleaseON : {albums.release_date}
        </span>
      </div>
    </div>
  );
}
