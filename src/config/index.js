import config from "./config";

const spotifyBaseUrl = config.apiBaseUrl; // ${spotifyBaseUrl}

const accessToken = localStorage.getItem("access_token");
export const getHeader = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token ? token : accessToken}`,
    },
  };
};
export const header = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
};

// profile
export const profileUrl = `${spotifyBaseUrl}/me`;

// artists
export const followedArtistUrl = `${spotifyBaseUrl}/me/following?type=artist`;
export const artistTopTracks = (id) => `${spotifyBaseUrl}/artists/${id}/top-tracks`;
export const artistUrl = (id) => `${spotifyBaseUrl}/artists/${id}`;
export const checkFollowUrl = (id) => `${spotifyBaseUrl}/me/following/contains?type=artist&ids=${id}`;
export const followUrl = (id) => `${spotifyBaseUrl}/me/following?type=artist&ids=${id}`;
export const artistAlbumUrl = (id) => `${spotifyBaseUrl}/artists/${id}/albums`;
export const artistRelatedArtist = (name) => `${spotifyBaseUrl}/search?q=${name}&type=artist`;

// playlis
export const userPlaylistUrl = (userId) => `${spotifyBaseUrl}/users/${userId}/playlists`;
export const createUrl = (userId) => `${spotifyBaseUrl}/users/${userId}/playlists`;
export const playListUrl = (playlistId) => `${spotifyBaseUrl}/playlists/${playlistId}`;
export const playListItemUrl =(playlistId) => `${spotifyBaseUrl}/playlists/${playlistId}/tracks`;
export const checkPlaylistFollowUrl = (playlistId) => `${spotifyBaseUrl}/playlists/${playlistId}/followers/contains`;
export const followPlaylistUrl = (playlistId) => `${spotifyBaseUrl}/playlists/${playlistId}/followers`;
export const removeAddItemUrl = (playlistId) => `${spotifyBaseUrl}/playlists/${playlistId}/tracks`;
export const removeItemfromPlaylistPayload = (token, trackId) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: {
      tracks: [
        {
          uri: `spotify:track:${trackId}`,
        },
      ],
      // snapshot_id: `${playlist.snapshot_id}`,
    },
  };
}

// track
export const likedUrl = `${spotifyBaseUrl}/me/tracks`;
export const songDetailUrl = (id) => `${spotifyBaseUrl}/tracks/${id}`;
export const checkSaveSongUrl = (id) => `${spotifyBaseUrl}/me/tracks/contains?ids=${id}`;
export const songLikeUrl = (id) => `${spotifyBaseUrl}/me/tracks?ids=${id}`;
// album
export  const newReleasesAlbumUrl = `${spotifyBaseUrl}/browse/new-releases`;
export const albumUrl = (id) => `${spotifyBaseUrl}/albums/${id}`;

// search 
 // Allowed values: "album", "artist", "playlist", "track",
 export const searchUrl = (search) => `${spotifyBaseUrl}/search?q=${search}&type=album,track,artist,playlist`;
 export const songSearchUrl =(search) => `${spotifyBaseUrl}/search?q=${search}&type=track`;