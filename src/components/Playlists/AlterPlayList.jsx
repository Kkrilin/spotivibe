import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Search } from '@mui/icons-material';
import { useState } from 'react';
import { addPlaylist } from '../../redux/profileSlice';
import { useTheme } from '../Context/ThemeProvider.jsx';
import { createUrl } from '../../config/index.js';
import CheckBoxPlaylist from './CheckBoxPlaylist.jsx';

function AlterPlayList({
  handleClose,
  track,
  requiredPlaylist,
  setRequiredPlaylist,
  setTracks,
  colorGradient,
}) {
  const { data, playlists } = useSelector((state) => state.profile);
  const [searchPlaylist, setSearchPlaylist] = useState('');
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = data.id;

  const token = localStorage.getItem('access_token');
  const createPlaylist = async () => {
    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const body = {
      name: track.name || track.track.name,
      description: '',
      public: true,
    };
    try {
      const createResponse = await axios.post(createUrl(userId), body, header);
      const playlistId = createResponse.data.id;
      if (playlistId) {
        navigate(`/playlist/${playlistId}`);
        dispatch(addPlaylist({ data: createResponse.data }));
      }
    } catch (error) {
      console.log('Error:', error.response?.data || error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPlaylist();
    handleClose();
  };

  let filteredPLaylists = playlists.filter((pList) => data.id === pList.owner.id);

  if (searchPlaylist) {
    filteredPLaylists = filteredPLaylists.filter((playlist) =>
      playlist.name.toLowerCase().includes(searchPlaylist.toLowerCase())
    );
  }

  return (
    <div
      className="alterPlaylist_container"
      style={{
        width: '16vw',
        backgroundColor: `${isDarkMode ? '#181818' : colorGradient}`,
        padding: '1rem',
      }}
    >
      <h6
        style={{
          color: `${isDarkMode ? 'white' : 'black'}`,
        }}
      >
        Add to Playlist
      </h6>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          marginTop: '1rem',
        }}
      >
        <Search
          style={{
            width: '1rem',
            height: '1.5rem',
            position: 'absolute',
            marginLeft: '0.4rem',
            color: '#777676',
            fontWeight: '800',
          }}
        />
        <input
          type="text"
          placeholder="Find a playlist"
          value={searchPlaylist}
          onChange={(e) => setSearchPlaylist(e.target.value)}
          style={{
            borderRadius: '4px',
            height: '2rem',
            paddingLeft: '3rem',
            backgroundColor: '#2A2A2A',
            color: '#fff',
          }}
        />
      </div>
      <div
        style={{ margin: '1rem', display: 'flex', alignItems: 'center' }}
        className="create small_card"
        onClick={handleSubmit}
      >
        <span className="plus">+</span>
        <span style={{ color: '#fff' }}>New playlist</span>
      </div>
      <hr />
      <div
        style={{
          overflowY: 'scroll',
          height: '20vh',
          marginTop: '0.8rem',
          marginBottom: '0.8rem',
        }}
      >
        {filteredPLaylists.map((playlist) => (
          <div key={playlist.id}>
            <CheckBoxPlaylist
              pList={playlist}
              trackId={track.id || track.track.id}
              requiredPlaylist={requiredPlaylist}
              setRrequiredPlaylist={setRequiredPlaylist}
              handleClose={handleClose}
              setTracks={setTracks}
            />
          </div>
        ))}
      </div>
      <hr />

      <h5
        style={{
          textAlign: 'right',
          marginTop: '1rem',
          color: `${isDarkMode ? '#fff' : '#000'}`,
          fontSize: '1rem',
          backgroundColor: `${isDarkMode ? '#000' : '#fff'}`,
          // width: "2rem",
          cursor: 'pointer',
          padding: '0.5rem',
          borderRadius: '4px',
          fontWeight: '600',
          border: '1px solid #000',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={() => handleClose()}
      >
        Ok
      </h5>
      <form onSubmit={handleSubmit} className="alterPlaylist_form" />
    </div>
  );
}

export default AlterPlayList;
