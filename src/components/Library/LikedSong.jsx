import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { setLikedSongs } from '../../redux/profileSlice.js';
import { useTheme } from '../Context/ThemeProvider.jsx';
import { getHeader, likedUrl } from '../../config/index.js';

function LikedSong() {
  const { likedSongs } = useSelector((state) => state.profile);
  const { globalCount } = useSelector((state) => state.refresh);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('access_token');
  const header = getHeader(token);

  const fetchLikedSong = async () => {
    setLoading(true);
    try {
      const response = await axios.get(likedUrl, header);
      dispatch(setLikedSongs({ data: response.data.items }));
    } catch (error) {
      setError(error.response?.data?.error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLikedSong();
  }, [globalCount]);

  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <>
      {!loading && likedSongs.length && (
        <div
          className={`small_card ${!isDarkMode ? 'light_hover' : ''}`}
          onClick={() => navigate(`/collection/tracks`)}
        >
          <Avatar
            sx={{ bgcolor: '#311F76', width: 50, height: 50 }}
            alt="Spotify logo"
            variant="rounded"
          />
          <div>
            <span
              className="name"
              style={{
                color: `${isDarkMode ? '#e0dfdf' : '#000'}`,
              }}
            >
              {' '}
              Liked Songs
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span
                className="type"
                style={{
                  color: `${isDarkMode ? '#837f7f' : '#000'}`,
                }}
              >
                playlist
              </span>
              <span className="dot_separator"> </span>
              <span
                className="type"
                style={{
                  color: `${isDarkMode ? '#837f7f' : '#000'}`,
                }}
              >
                {likedSongs.length} songs
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LikedSong;
