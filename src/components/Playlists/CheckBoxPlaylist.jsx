import axios from 'axios';
import { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import { useTheme } from '../Context/ThemeProvider';
import {
  getHeader,
  playListUrl,
  removeAddItemUrl,
  removeItemfromPlaylistPayload,
} from '../../config';

function CheckBoxPlaylist({ pList, trackId, requiredPlaylist, handleClose, setTracks }) {
  const [playlist, setPlaylist] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [check, setCheck] = useState(false);
  const token = localStorage.getItem('access_token');
  const { isDarkMode } = useTheme();

  const header = getHeader(token);

  useEffect(() => {
    const fetchPlayList = async () => {
      setLoading(true);
      try {
        const response = await axios.get(playListUrl(pList.id), header);
        setPlaylist(response.data);
        const itemCheck =
          response.data.tracks &&
          response.data.tracks.items.find((item) => item.track.id === trackId);
        setCheck(!!itemCheck);
      } catch (error) {
        setError(error.response.data.error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayList();
  }, []);

  const body = {
    uris: [`spotify:track:${trackId}`],
    position: 0,
  };

  const deletePayload = removeItemfromPlaylistPayload(token, trackId);

  const handleCheck = async () => {
    header.headers['Content-Type'] = 'application/json';
    try {
      if (check) {
        body.snapshot_id = `${playlist.snapshot_id}`;
        await axios.delete(removeAddItemUrl(pList.id), deletePayload);
        setCheck(false);
        if (pList.id === requiredPlaylist.id) {
          setTracks((prev) => {
            const updatedTracks = prev.filter((item) => item.id || item.track.id !== trackId);
            return updatedTracks;
          });
          handleClose();
        }
      } else {
        await axios.post(removeAddItemUrl(pList.id), body, header);
        setCheck(true);
      }
    } catch (error) {
      console.log('Error:', error.response?.data || error.message);
    }
  };

  return (
    <div
      className={`small_card ${!isDarkMode ? 'light_hover' : ''}`}
      style={{
        justifyContent: 'space-between',
        height: '50px',
        alignItems: 'center',
      }}
    >
      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#fff',

          width: '100%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Avatar
            sx={{ width: 40, height: 40 }}
            alt="Spotify logo"
            src={playlist.images && playlist.images.length && playlist.images[0].url}
            variant="rounded"
          />
          <h5 className="name" style={{ color: `${isDarkMode ? '#fff' : '#000'}` }}>
            {playlist.name}
          </h5>
        </div>
        <input
          style={{ width: '20px', height: '20px', borderRadius: '50%' }}
          type="checkbox"
          checked={!!check}
          onChange={handleCheck}
        />
      </label>
    </div>
  );
}

export default CheckBoxPlaylist;
