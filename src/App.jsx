import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import "./App.css";
import HomeScreen from "./components/HomeScreen/HomeScreen.jsx";
import Header from "./components/Header/Header.jsx";
import Authorised from "./components/Authorised/Authorised.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Artists from "./components/Artists/Artists.jsx";
import Playlists from "./components/Playlists/Playlists.jsx";
import HomePage from "./pages/HomePage.jsx";
import Search from "./components/Search/Search.jsx";
import Albums from "./components/Album/Albums.jsx";
import LikedSongs from "./components/LikedSongs/LikedSongs.jsx";
import PullToRefresh from "./components/Utils/PullToRefresh.jsx";
import { Navigate } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <PullToRefresh>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/authorised" element={<Authorised />} />
          <Route path="/" element={<HomePage />}>
            <Route index path="user" element={<Profile />}></Route>
            <Route path="home" element={<HomeScreen />}></Route>
            <Route path="artist/:id" element={<Artists />} />
            <Route path="playlist/:id" element={<Playlists />} />
            <Route path="search/:id" element={<Search />}></Route>
            <Route path="album/:id" element={<Albums />}></Route>
            <Route path="collection/tracks" element={<LikedSongs />}></Route>
            <Route path="*" element={<Navigate to="/user" replace />} />
          </Route>
        </Routes>
      </PullToRefresh>
    </BrowserRouter>
  );
}

export default App;
