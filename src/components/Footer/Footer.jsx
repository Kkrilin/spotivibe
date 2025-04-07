import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { Shuffle, SkipBack, SkipForward, Play } from "lucide-react";
import RepeatIcon from "@mui/icons-material/Repeat";
import { AddCircleOutline } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { likeSong } from "../../redux/songDetailSlice";

import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useEffect, useState } from "react";

import axios from "axios";
const Footer = () => {
  const { songDetail, songLike } = useSelector((state) => state.songDetail);
  const { globalCount } = useSelector((state) => state.refresh);
  const dispatch = useDispatch();
  console.log(songDetail, "songDetail");
  const token = localStorage.getItem("access_token");

  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log("songDetail---", songDetail);
  const checkSavedSong = () => {
    const checkSaveSongUrl = `https://api.spotify.com/v1/me/tracks/contains?ids=${songDetail.id}`;

    axios
      .get(checkSaveSongUrl, header)
      .then((res) => {
        dispatch(likeSong({ data: res.data[0] }));
        console.log(res);
      })
      .catch((err) => {
        // setError(err.response.data.error.message);
        console.log(err);
      });
  };
  useEffect(() => {
    checkSavedSong();
  }, [songDetail, globalCount]);

  const handleLikeClick = () => {
    const songLikeUrl = `https://api.spotify.com/v1/me/tracks?ids=${songDetail.id}`;
    header.headers["Content-Type"] = "application/json";
    if (songLike) {
      axios
        .delete(songLikeUrl, header)
        .then((res) => {
          dispatch(likeSong({ data: false }));
          console.log(res, "songUnlikelike");
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .put(songLikeUrl, null, header)
        .then((res) => {
          dispatch(likeSong({ data: true }));
          console.log(res, "songlike");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div
      style={{
        height: "10vh",
        backgroundColor: "black",
        marginTop: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "25rem",
        }}
      >
        {songDetail ? (
          <Avatar
            sx={{ width: 70, height: 70 }}
            alt="Spotify logo"
            src={
              songDetail.album &&
              songDetail.album.images &&
              songDetail.album.images[0].url
            }
            variant="rounded"
          />
        ) : (
          <Avatar
            sx={{ bgcolor: deepOrange[500], width: 60, height: 60 }}
            variant="rounded"
          ></Avatar>
        )}
        <div style={{ marginLeft: "1rem" }}>
          <h6 className="name" style={{ color: "#FFFFFF", fontSize: "0.9rem" }}>
            {songDetail && songDetail.name}
          </h6>
          <h6 className="type" style={{ color: "#6F6F6F", fontSize: "0.8rem" }}>
            {songDetail && songDetail.artists.map((ar) => ar.name).join(" || ")}
          </h6>
        </div>
        <div onClick={handleLikeClick}>
          {songLike ? (
            <CheckCircleIcon
              style={{
                color: "lightGreen",
                borderRadius: "50%",
                cursor: "pointer",
                width: "1.2rem",
                height: "1.2rem",
              }}
            />
          ) : (
            <AddCircleOutline
              style={{
                width: "1.2rem",
                height: "1.2rem",
                marginLeft: "10px",
                color: "grey",
                cursor: "pointer",
              }}
              className="check_follow"
            />
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "15rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "6px",
          }}
        >
          <Shuffle className="shuffle control" />
          <SkipBack className="back control" />
          <Play className="play control" />
          <SkipForward className="forward control" />
          <RepeatIcon className="repeat control" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ fontSize: "12px" }}>1:20</span>
          <div
            style={{
              width: "40rem",
              height: "0.2rem",
              backgroundColor: "#2A2A2A",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                width: "10rem",
                height: "0.2rem",
                backgroundColor: "#FFF",
                borderRadius: "10px",
              }}
            ></div>
          </div>
          <span style={{ fontSize: "12px" }}>5:20</span>
        </div>
      </div>
      <div
        style={{
          width: "20rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <VolumeUpIcon />
        <div>
          <div
            style={{
              width: "10rem",
              height: "0.2rem",
              backgroundColor: "#2A2A2A",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                width: "4rem",
                height: "0.2rem",
                backgroundColor: "#FFF",
                borderRadius: "10px",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
