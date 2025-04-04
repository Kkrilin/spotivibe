import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AlbumCard from "../Album/AlbumCard";
import { Artist } from "../Library/Artists";
import { Playlist } from "../Library/PlayLists";
import Tracks from "../Tracks/Tracks";
import Scrollable from "../Utils/Scrollable";
import { Stack } from "@mui/material";

const Search = () => {
  const [searchResult, setSearchResult] = useState({});
  const params = useParams();
  const { id: search = "" } = params;
  const accessToken = localStorage.getItem("access_token");
  // Allowed values: "album", "artist", "playlist", "track",
  const searchUrl = `https://api.spotify.com/v1/search?q=${search}&type=album,track,artist,playlist`;
  const header = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  useEffect(() => {
    axios
      .get(searchUrl, header)
      .then((res) => {
        setSearchResult(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [search]);

  if (!Object.keys(searchResult).length) {
    return <></>;
  }

  return (
    <Scrollable>
      <div style={{ padding: "2rem" }}>
        <h3>Albums</h3>
        <Stack className="horizontal_scroll" direction={"row"}>
          {searchResult.albums.items
            .filter((item) => item)
            .map((item) => (
              <AlbumCard item={item} />
            ))}
        </Stack>
      </div>
      <div style={{ padding: "2rem" }}>
        <h3>Playlists</h3>
        <Stack className="horizontal_scroll" direction={"row"}>
          {searchResult.playlists.items
            .filter((item) => item)
            .map((item) => (
              <Playlist item={item} profile={true} />
            ))}
        </Stack>
      </div>
      <div style={{ padding: "2rem" }}>
        <h3>Artists</h3>
        <Stack className="horizontal_scroll" direction={"row"}>
          {searchResult.artists.items
            .filter((item) => item)
            .map((item) => (
              <Artist item={item} profile={true} />
            ))}
        </Stack>
      </div>
      <div style={{ padding: "2rem" }}>
        <h3>Songs</h3>
        <Stack>
          <Tracks type="search" tracks={searchResult.tracks.items} />
        </Stack>
      </div>
    </Scrollable>
  );
};

export default Search;
