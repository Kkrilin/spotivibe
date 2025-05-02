import { useDispatch, useSelector } from 'react-redux';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useEffect } from 'react';
import axios from 'axios';
import { likeSong, setSongDetail } from '../../redux/songDetailSlice';
import { addLikeSong, removeLikeSong } from '../../redux/profileSlice';
import { useTheme } from '../Context/ThemeProvider';
import { checkSaveSongUrl, getHeader, songLikeUrl } from '../../config/index';
import FooterLeft from './FooterLeft';
import FooterMediaPlayer from './FooterMediaPlayer';

function Footer() {
  const { songDetail, songLike } = useSelector((state) => state.songDetail);
  const { globalCount } = useSelector((state) => state.refresh);
  const dispatch = useDispatch();
  const token = localStorage.getItem('access_token');
  const { isDarkMode } = useTheme();

  const header = getHeader(token);

  const checkSavedSong = () => {
    axios
      .get(checkSaveSongUrl(songDetail.id), header)
      .then((res) => {
        dispatch(likeSong({ data: res.data[0] }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (songDetail) {
      checkSavedSong();
    }
  }, [songDetail, globalCount]);

  useEffect(() => {
    if (!songDetail) {
      const song = JSON.parse(localStorage.getItem('songDetail'));
      if (song) {
        dispatch(setSongDetail({ data: song }));
      }
    }
  }, []);

  const handleLikeClick = () => {
    header.headers['Content-Type'] = 'application/json';
    if (songLike) {
      axios
        .delete(songLikeUrl(songDetail.id), header)
        .then((res) => {
          dispatch(likeSong({ data: false }));
          dispatch(removeLikeSong({ id: songDetail.id }));
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .put(songLikeUrl(songDetail.id), null, header)
        .then((res) => {
          dispatch(likeSong({ data: true }));
          dispatch(addLikeSong({ item: { track: songDetail } }));
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div
      style={{
        height: '10vh',
        marginTop: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: `${isDarkMode ? '#121212' : '#97ad9b'}`,
      }}
    >
      <FooterLeft
        songDetail={songDetail}
        isDarkMode={isDarkMode}
        handleLikeClick={handleLikeClick}
        songLike={songLike}
      />
      <FooterMediaPlayer />
      <div
        style={{
          width: '20rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <VolumeUpIcon />
        <div>
          <div
            style={{
              width: '10rem',
              height: '0.2rem',
              backgroundColor: '#2A2A2A',
              borderRadius: '10px',
            }}
          >
            <div
              style={{
                width: '4rem',
                height: '0.2rem',
                backgroundColor: '#FFF',
                borderRadius: '10px',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
