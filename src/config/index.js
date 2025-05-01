import config from "./config";

const spotifyBaseUrl = config.apiBaseUrl; // https://api.spotify.com/v1

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

export const profileUrl = `${spotifyBaseUrl}/me`;

export const followedArtistUrl = `${spotifyBaseUrl}/me/following?type=artist`;
export const userPlaylistUrl = (userId) =>
  `${spotifyBaseUrl}/users/${userId}/playlists`;
