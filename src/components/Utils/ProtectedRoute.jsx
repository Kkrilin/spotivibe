import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProfileData } from "../../redux/profileSlice";

function ProtectedRoute({ children, redirectPath = "/" }) {
  const dispatch = useDispatch();

  const isAuthenticated = Boolean(localStorage.getItem("access_token"));

  useEffect(() => {
    if (isAuthenticated) {
      const profileData = JSON.parse(localStorage.getItem("profile"));
      if (profileData) {
        dispatch(setProfileData({ data: profileData }));
      }
    }
  }, []);

  return isAuthenticated ? children : <Navigate to={redirectPath} />;
}

export default ProtectedRoute;
