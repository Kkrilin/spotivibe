import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../Context/ThemeProvider';

const Artist = ({ item, profile }) => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  return (
    <div
      className={
        profile
          ? `big_card ${!isDarkMode ? 'light_hover' : ''}`
          : `small_card ${!isDarkMode ? 'light_hover' : ''}`
      }
      onClick={() => navigate(`/artist/${item.id}`)}
      style={{
        color: `${isDarkMode ? '#fff' : '#000'}`,
      }}
    >
      <Avatar
        sx={profile ? { width: 180, height: 180 } : { width: 50, height: 50 }}
        alt="Spotify logo"
        src={item.images[0] && item.images[0].url}
      />
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

        <h6
          className="type"
          style={{
            color: `${isDarkMode ? '#837f7f' : '#000'}`,
          }}
        >
          {item.type}
        </h6>
      </div>
    </div>
  );
};

export default Artist;
