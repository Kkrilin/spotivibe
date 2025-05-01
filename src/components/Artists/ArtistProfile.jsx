import { Avatar } from "@mui/material";
import React from "react";

export default function ArtistProfile({
  index,
  gradientPairs,
  requiredArtist,
}) {
  return (
    <div
      className="profile_pic"
      style={{
        backgroundImage: `${index && gradientPairs[index][0]}`,
      }}
    >
      <div>
        <Avatar
          sx={{ width: 220, height: 220 }}
          alt="Spotify logo"
          src={requiredArtist.images && requiredArtist.images[0].url}
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
        <h6 style={{ fontSize: "6rem" }}>{requiredArtist.name}</h6>
        <span
          style={{ fontSize: "14px", color: "#a1a1a1", fontWeight: "bold" }}
        >
          Followers:{" "}
          {requiredArtist.followers && requiredArtist.followers.total}
        </span>
        <h4 style={{ textTransform: "capitalize" }}>
          genres: {requiredArtist.genres && requiredArtist.genres.join("-")}
        </h4>
      </div>
    </div>
  );
}
