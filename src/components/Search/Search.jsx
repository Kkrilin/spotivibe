import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AlbumCard from '../Album/AlbumCard';
import Tracks from '../Tracks/Tracks';
import Scrollable from '../Utils/Scrollable';
import { Skeleton, Stack } from '@mui/material';
import CardSkeleton from '../Utils/SkeletonLoader/CardSkeleton';
import TrackSkeleton from '../Utils/SkeletonLoader/TrackSkeleton';
import { useSelector } from 'react-redux';
import { getColorGradientPair } from '../../utils/colors';
import { useTheme } from '../Context/ThemeProvider.jsx';
import Artist from '../Library/Artist.jsx';
import Playlist from '../Library/PlayList.jsx';
import { getHeader, searchUrl } from '../../config/index.js';

const Search = () => {
  const [searchResult, setSearchResult] = useState({});
  const globalCount = useSelector((state) => state.refresh.globalCount);
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id: search = '' } = params;
  const accessToken = localStorage.getItem('access_token');
  const { isDarkMode } = useTheme();
  const gradientPairs = getColorGradientPair(isDarkMode);
  const index = Math.floor(Math.random() * gradientPairs.length);

  const header = getHeader(accessToken);
  useEffect(() => {
    setLoading(true);
    axios
      .get(searchUrl(search), header)
      .then((res) => {
        setError('');
        if (res.status !== 200) {
          throw new Error('Error fetching data');
        }
        setSearchResult(res.data);
      })
      .catch((err) => {
        setError(err.response.data.error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search, globalCount]);

  if (error) {
    return (
      <div>
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <Scrollable>
      <div
        style={{
          backgroundImage: `${index && gradientPairs[index][1]}`,
        }}
      >
        <div style={{ padding: '2rem 0 0 2rem' }}>
          {loading ? <Skeleton variant="text" sx={{ fontSize: '2rem' }} /> : <h3>Albums</h3>}
          <Stack className="horizontal_scroll" direction={'row'}>
            {loading ? (
              <CardSkeleton profile={true} type="playlist" />
            ) : (
              searchResult.albums.items
                .filter((item) => item)
                .map((item) => <AlbumCard item={item} />)
            )}
          </Stack>
        </div>
        <div style={{ padding: '1rem 0 0 2rem' }}>
          {loading ? <Skeleton variant="text" sx={{ fontSize: '2rem' }} /> : <h3>Playlists</h3>}
          <Stack className="horizontal_scroll" direction={'row'}>
            {loading ? (
              <CardSkeleton profile={true} type="playlist" />
            ) : (
              searchResult.playlists.items
                .filter((item) => item)
                .map((item) => <Playlist item={item} profile={true} />)
            )}
          </Stack>
        </div>
        <div style={{ padding: '1rem 0 0 2rem' }}>
          {loading ? <Skeleton variant="text" sx={{ fontSize: '2rem' }} /> : <h3>Artists</h3>}
          <Stack className="horizontal_scroll" direction={'row'}>
            {loading ? (
              <CardSkeleton profile={true} />
            ) : (
              searchResult.artists.items
                .filter((item) => item)
                .map((item) => <Artist item={item} profile={true} />)
            )}
          </Stack>
        </div>
        <div style={{ padding: '2rem' }}>
          {loading ? <Skeleton variant="text" sx={{ fontSize: '2rem' }} /> : <h3>Songs</h3>}
          <Stack>
            {loading ? (
              <TrackSkeleton />
            ) : (
              <Tracks type="search" tracks={searchResult.tracks.items} />
            )}
          </Stack>
        </div>
      </div>
    </Scrollable>
  );
};

export default Search;
