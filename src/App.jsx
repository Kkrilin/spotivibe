import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import './App.css';
import HomeScreen from './components/HomeScreen/HomeScreen.jsx';
import Authorised from './components/Authorised/Authorised.jsx';
import ProfilePage from './components/Profile/ProfilePage.jsx';
import Playlists from './components/Playlists/Playlists.jsx';
import HomePage from './pages/HomePage.jsx';
import Search from './components/Search/Search.jsx';
import PullToRefresh from './components/Utils/PullToRefresh.jsx';
import ProtectedRoute from './components/Utils/ProtectedRoute.jsx';
import ArtistPage from './components/Artists/ArtistPage.jsx';
import AlbumPage from './components/Album/AlbumPage.jsx';
import LikedSongPage from './components/LikedSongs/LikedSongPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <PullToRefresh>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/authorised" element={<Authorised />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          >
            <Route index path="user" element={<ProfilePage />} />
            <Route path="home" element={<HomeScreen />} />
            <Route path="artist/:id" element={<ArtistPage />} />
            <Route path="playlist/:id" element={<Playlists />} />
            <Route path="search/:id" element={<Search />} />
            <Route path="album/:id" element={<AlbumPage />} />
            <Route path="collection/tracks" element={<LikedSongPage />} />
            <Route path="*" element={<Navigate to="/user" replace />} />
          </Route>
        </Routes>
      </PullToRefresh>
    </BrowserRouter>
  );
}

export default App;
