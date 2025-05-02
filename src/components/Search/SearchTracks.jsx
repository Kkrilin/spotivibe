import { Avatar } from '@mui/material';
import { useTheme } from '../Context/ThemeProvider';
import axios from 'axios';
import { getHeader, removeAddItemUrl } from '../../config';

const SearchTracks = ({ track, playListId, setTracks }) => {
  const { isDarkMode } = useTheme();

  const token = localStorage.getItem('access_token');
  const header = getHeader(token);
  header.headers['Content-Type'] = 'application/json';
  const body = {
    uris: [`spotify:track:${track.id}`],
  };
  const handleAddClick = () => {
    axios
      .post(removeAddItemUrl(playListId), body, header)
      .then(() => {
        setTracks((state) => {
          return [...state, { track }];
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={`track_card ${!isDarkMode ? 'light_hover' : ''}`}>
      <div style={{ width: '600px' }}>
        <Avatar
          sx={{ width: 36, height: 36 }}
          alt="Spotify logo"
          src={track.album ? track.album.images[0].url : track.track.album.images[0].url}
          variant="square"
        ></Avatar>
        <div>
          <h5
            className="name"
            style={{
              fontWeight: '500',
              color: `${isDarkMode ? '#837f7f' : '#000'}`,
            }}
          >
            {track.name || track.track.name}
          </h5>
          <h6
            className="type"
            style={{
              fontWeight: '400',
              fontSize: '0.8rem',
              color: `${isDarkMode ? '#837f7f' : '#000'}`,
            }}
          >
            {track.artists.map((ar) => ar.name).join(', ')}
          </h6>
        </div>
      </div>
      <div onClick={handleAddClick} className="search_add">
        <h3>Add</h3>
      </div>
    </div>
  );
};

export default SearchTracks;
