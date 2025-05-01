import config from "./config";

const spotifybaseUrl = config.apiBaseUrl;

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

export const profileUrl = `${spotifybaseUrl}/me`;
