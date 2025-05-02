import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Avatar, Skeleton } from '@mui/material';
import axios from 'axios';
import Scrollable from '../Utils/Scrollable.jsx';
import Tracks from '../Tracks/Tracks.jsx';
import { getColorGradientPair } from '../../utils/colors.js';
import ProfileSkeleton from '../Utils/SkeletonLoader/ProfileSkeleton.jsx';
import TrackSkeleton from '../Utils/SkeletonLoader/TrackSkeleton.jsx';
import { useTheme } from '../Context/ThemeProvider.jsx';
import { albumUrl, getHeader } from '../../config/index.js';
import AlbumProfile from './AlbumProfile.jsx';

const AlbumPage = () => {
  const [albums, setAlbum] = useState(null);
  const { globalCount } = useSelector((state) => state.refresh);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const param = useParams();
  const { id } = param;
  const { isDarkMode } = useTheme();
  const gradientPairs = getColorGradientPair(isDarkMode);
  const token = localStorage.getItem('access_token');
  const header = getHeader(token);

  const index = Math.floor(Math.random() * gradientPairs.length);
  const fetchAlbum = async () => {
    setLoading(true);
    try {
      const response = await axios.get(albumUrl(id), header);
      setAlbum(response.data);
    } catch (error) {
      setError(error.response.data.error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAlbum();
  }, [id, globalCount]);

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <Scrollable name={albums && albums.name}>
      {loading ? (
        <ProfileSkeleton />
      ) : (
        <AlbumProfile gradientPairs={gradientPairs} index={index} albums={albums} />
      )}
      <div
        style={{
          backgroundImage: `${index && gradientPairs[index][1]}`,
          padding: '2rem',
        }}
      >
        {loading ? (
          <TrackSkeleton />
        ) : (
          <Tracks
            type={albums && albums.type}
            tracks={albums ? albums.tracks.items : []}
            colorGradient={gradientPairs[index][1]}
          />
        )}
      </div>
    </Scrollable>
  );
};

export default AlbumPage;
