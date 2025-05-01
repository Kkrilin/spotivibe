const config = {
  clientId: import.meta.env.VITE_CLIENT_ID,
  clientSecret: import.meta.env.VITE_CLIENT_SECRET,
  redirectUri: import.meta.env.VITE_REDIRECT_URI,
  apiBaseUrl: import.meta.env.VITE_BASE_URL,
  tokenUrl: import.meta.env.VITE_TOKEN_URL
};

export default config;
