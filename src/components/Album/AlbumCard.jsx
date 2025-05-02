import { deepOrange } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { Avatar, Typography, Skeleton } from '@mui/material';
import { useTheme } from '../Context/ThemeProvider.jsx';

const AlbumCard = ({ item }) => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`big_card ${!isDarkMode ? 'light_hover' : ''}`}
      onClick={() => navigate(`/album/${item.id}`)}
    >
      {!item && <Skeleton sx={{ bgcolor: 'grey.900' }} variant="square" width={64} height={64} />}
      {item &&
        (item.images ? (
          <Avatar
            sx={{ width: 180, height: 180 }}
            alt="Spotify logo"
            src={item.images[0].url}
            variant="rounded"
          />
        ) : (
          <Avatar
            sx={{ bgcolor: deepOrange[500], width: 48, height: 48 }}
            variant="square"
          ></Avatar>
        ))}
      <div>
        {item ? (
          <Typography style={{ width: '10rem', fontSize: '1rem' }} variant="h6">
            {item.name}
          </Typography>
        ) : (
          <Skeleton sx={{ bgcolor: 'grey.800', fontSize: '1rem' }} variant="text" width={64} />
        )}
        {item ? (
          <Typography style={{ fontSize: '0.8rem' }} variant="h6">
            {item.type}
          </Typography>
        ) : (
          <Skeleton sx={{ bgcolor: 'grey.800', fontSize: '1rem' }} variant="text" />
        )}
      </div>
    </div>
  );
};

export default AlbumCard;
