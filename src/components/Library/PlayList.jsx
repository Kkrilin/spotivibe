import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import { deepOrange } from '@mui/material/colors';
import { useTheme } from '../Context/ThemeProvider';

function Playlist({ item, profile }) {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  return (
    <div
      className={
        profile
          ? `big_card ${!isDarkMode ? 'light_hover' : ''}`
          : `small_card ${!isDarkMode ? 'light_hover' : ''}`
      }
      onClick={() => navigate(`/playlist/${item.id}`)}
    >
      {item.images ? (
        <Avatar
          sx={profile ? { width: 180, height: 180 } : { width: 50, height: 50 }}
          alt="Spotify logo"
          src={item.images && item.images.length && item.images[0].url}
          variant="rounded"
        />
      ) : (
        <Avatar
          sx={
            profile
              ? { bgcolor: deepOrange[500], width: 180, height: 180 }
              : { bgcolor: deepOrange[500], width: 48, height: 48 }
          }
          variant="rounded"
        >
          <AudiotrackIcon />
        </Avatar>
      )}
      <div
        style={{
          marginTop: `${profile ? '10px' : ''}`,
        }}
      >
        <h6
          className="name"
          style={{
            color: `${isDarkMode ? '#e0dfdf' : '#000'}`,
          }}
        >
          {item.name.substring(0, 20)}
        </h6>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span
            className="type"
            style={{
              color: `${isDarkMode ? '#837f7f' : '#000'}`,
            }}
          >
            {' '}
            {item.type}
          </span>
          <span className="dot_separator"> </span>
          <span
            className="type"
            style={{
              color: `${isDarkMode ? '#837f7f' : '#000'}`,
            }}
          >
            {item.owner.display_name}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Playlist;
