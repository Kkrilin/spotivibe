import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import redirectToSpotifyAuthorize from "../auth/authService";
import config from "../config/config";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { redirectUri } = config;
  const { clientId } = config;
  console.log(clientId, "clientId");
  // useEffect(() => {
  //   const authoriseTheApp = async () => {
  //     await redirectToSpotifyAuthorize(clientId, redirectUri);
  //   };
  //   authoriseTheApp();
  // }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100vw",
        padding: "4rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "4rem",
          backgroundColor: "#1f1f1f",
          borderRadius: "1.5rem",
        }}
      >
        {/* <div style={{ paddingBottom: "10px" }}>
          <label
            style={{ display: "block", color: "white" }}
            htmlFor="clientId"
          >
            clientId
          </label>
          <input
            id="clientId"
            type={showPassword ? "text" : "password"}
            placeholder="enter your clientId"
            value={clientId}
            // onInput={(e) => setClientId(e.target.value)}
          />
          <Button
            style={{
              transform: "translateX(-100%)",
              color: "black",
            }}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </Button>
        </div> */}
        <Button
          onClick={() => redirectToSpotifyAuthorize(clientId, redirectUri)}
          variant="contained"
          color="success"
        >
          Authorised
        </Button>
      </div>
    </div>
  );
};

export default Login;
