import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Avatar } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { addLikeSong, removeLikeSong } from '../../redux/profileSlice';
import { checkSaveSongUrl, getHeader, songDetailUrl, songLikeUrl } from '../../config';
import { likeSong, setSongDetail } from '../../redux/songDetailSlice';
import LibraryPopover from '../Utils/Popover/LibraryPopover';
import { useTheme } from '../Context/ThemeProvider';

function Track({
  track,
  count,
  id,
  type,
  requiredPlaylist,
  setRequiredPlaylist,
  setTracks,
  colorGradient,
}) {
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  const [like, setLike] = useState();
  const [error, setError] = useState(false);
  const value = useMemo(() => {
    const minute = Math.floor((track.duration_ms || track.track.duration_ms) / (60 * 1000));
    const second = (track.duration_ms || track.track.duration_ms) % 60;
    return `${minute}:${String(second).padStart(2, '0')}`;
  }, []);
  const { songDetail, songLike } = useSelector((state) => state.songDetail);
  const token = localStorage.getItem('access_token');
  const { isDarkMode } = useTheme();
  const handleMouseOver = () => {
    setHover(true);
  };
  const handleMouseOut = () => {
    setHover(false);
  };
  const header = getHeader(token);

  const handleSongClick = () => {
    axios
      .get(songDetailUrl(id), header)
      .then((res) => {
        dispatch(setSongDetail({ data: res.data }));
        localStorage.setItem('songDetail', JSON.stringify(res.data));
      })
      .catch((err) => console.log(err));
  };

  const checkSavedSong = () => {
    axios
      .get(checkSaveSongUrl(id), header)
      .then((res) => {
        setLike(res.data[0]);
      })
      .catch((err) => {
        setError(err.response.data.error.message);
      });
  };

  useEffect(() => {
    if (songDetail && songDetail.id === id) {
      checkSavedSong();
    }
  }, [songLike]);

  useEffect(() => {
    checkSavedSong();
  }, []);

  const handleLikeClick = () => {
    header.headers['Content-Type'] = 'application/json';
    if (like) {
      axios
        .delete(songLikeUrl(id), header)
        .then(() => {
          setLike(false);
          if (songDetail.id === id) {
            dispatch(likeSong({ data: false }));
          }
          dispatch(removeLikeSong({ id }));
        })
        .catch((err) => setError(err.response.data.error.message));
    } else {
      axios
        .put(songLikeUrl, null, header)
        .then(() => {
          setLike(true);
          if (songDetail.id === id) {
            dispatch(likeSong({ data: true }));
          }
          dispatch(addLikeSong({ item: { track: track.track || track } }));
        })
        .catch((err) => setError(err.response.data.error.message));
    }
  };
  return (
    <div
      className={`track_card ${!isDarkMode ? 'light_hover' : ''}`}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
      id={id}
    >
      <div style={{ width: '600px' }} onClick={handleSongClick}>
        <h3 style={{ textAlign: 'right' }}>{count}</h3>
        {type === 'album' ? (
          ''
        ) : (
          <Avatar
            sx={{ width: 36, height: 36 }}
            alt="Spotify logo"
            src={track.album ? track.album.images[0].url : track.track.album.images[0].url}
            variant="square"
          />
        )}
        <h4 style={{ color: `${isDarkMode ? '#fff' : '#000'}` }}>
          {track.name || track.track.name}
        </h4>
      </div>
      <span>{track.popularity}</span>
      {hover && (
        <>
          {like ? (
            <CheckCircleIcon
              style={{
                color: 'lightGreen',
                borderRadius: '50%',
                cursor: 'pointer',
                width: '1.2rem',
                height: '1.2rem',
              }}
              onClick={handleLikeClick}
            />
          ) : (
            <AddCircleOutline
              style={{
                width: '1.2rem',
                height: '1.2rem',
                borderRadius: '50%',
                color: 'grey',
                cursor: 'pointer',
              }}
              onClick={handleLikeClick}
              className="check_follow"
            />
          )}
          <LibraryPopover
            track={track}
            requiredPlaylist={requiredPlaylist}
            setRequiredPlaylist={setRequiredPlaylist}
            setTracks={setTracks}
            colorGradient={colorGradient}
          >
            <div className="search_add">
              <h3>Add</h3>
            </div>
          </LibraryPopover>
        </>
      )}
      {!hover && (
        <>
          <div style={{ width: '1.2rem', height: '1.2rem' }} />
          <div style={{ width: '4rem', height: '1.2rem' }} />
        </>
      )}
      <h3 style={{ width: '1.2rem' }}>{value}</h3>
    </div>
  );
}

export default Track;
