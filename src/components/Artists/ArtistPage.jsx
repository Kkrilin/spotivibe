import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { Avatar, Skeleton, Stack } from '@mui/material';
import axios from 'axios';
import Scrollable from '../Utils/Scrollable.jsx';
import Tracks from '../Tracks/Tracks.jsx';
import { addArtist, removeArtist } from '../../redux/profileSlice.js';
import AlbumCard from '../Album/AlbumCard.jsx';
import { getColorGradientPair } from '../../utils/colors.js';
import ProfileSkeleton from '../Utils/SkeletonLoader/ProfileSkeleton.jsx';
import CardSkeleton from '../Utils/SkeletonLoader/CardSkeleton.jsx';
import TrackSkeleton from '../Utils/SkeletonLoader/TrackSkeleton.jsx';
import { useTheme } from '../Context/ThemeProvider.jsx';
import Artist from '../Library/Artist.jsx';
import {
  artistAlbumUrl,
  artistRelatedArtist,
  artistTopTracks,
  artistUrl,
  checkFollowUrl,
  followUrl,
  getHeader,
} from '../../config/index.js';
import ArtistProfile from './ArtistProfile.jsx';
import ArtistBottom from './ArtistBottom.jsx';

function ArtistPage() {
  const { artists } = useSelector((state) => state.profile);
  const [artistAlbums, setArtistsAlbum] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [artistRelatedArtists, setArtistRelatedArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [follow, setFollow] = useState(false);
  const [requiredArtist, setRequiredArtist] = useState({});
  const { globalCount } = useSelector((state) => state.refresh);
  const param = useParams();
  const { id } = param;
  const { isDarkMode } = useTheme();
  const gradientPairs = getColorGradientPair(isDarkMode);
  const dispatch = useDispatch();
  const indexRef = useRef(null);
  const index = indexRef.current;

  const token = localStorage.getItem('access_token');

  const header = getHeader(token);
  const data = {
    ids: [id],
  };
  const handleFollowClick = async () => {
    header.headers['Content-Type'] = 'application/json';
    try {
      if (follow) {
        await axios.delete(followUrl(id), header);
        dispatch(removeArtist({ id }));
        setFollow(false);
      } else {
        await axios.put(followUrl(id), data, header);
        dispatch(addArtist({ data: requiredArtist }));
        setFollow(true);
      }
    } catch (error) {
      setError(error.response?.data?.error?.message);
    }
  };

  useEffect(() => {
    const fetchArtistTopSong = async () => {
      setLoading(true);
      try {
        let artist = artists.find((ar) => ar.id === param.id);
        if (!artist) {
          const artistResponse = await axios.get(artistUrl(id), header);
          artist = artistResponse.data;
        }
        const followCheckResponse = await axios.get(checkFollowUrl(id), header);
        const response = await axios.get(artistTopTracks(id), header);
        setRequiredArtist(artist);
        setFollow(followCheckResponse.data[0]);
        setTracks(response.data.tracks);
        indexRef.current = Math.floor(Math.random() * gradientPairs.length);
      } catch (error) {
        setLoading(false);
        setError(error.response?.data?.error?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtistTopSong();
  }, [id, artistUrl, globalCount]);

  useEffect(() => {
    axios
      .get(artistAlbumUrl(id), header)
      .then((res) => {
        setArtistsAlbum(res.data.items);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.error.message);
      })
      .finally(() => setLoading(false));
  }, [id, globalCount]);

  useEffect(() => {
    axios
      .get(artistRelatedArtist(requiredArtist.name), header)
      .then((res) => {
        setArtistRelatedArtists(res.data.artists.items);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.error.message);
      })
      .finally(() => setLoading(false));
  }, [requiredArtist.name, globalCount]);

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2 style={{ color: '#fff' }}>{error}</h2>
      </div>
    );
  }

  return (
    <Scrollable name={requiredArtist.name} bgColor={index && gradientPairs[index][0]}>
      {loading ? (
        <ProfileSkeleton />
      ) : (
        <ArtistProfile
          index={index}
          gradientPairs={gradientPairs}
          requiredArtist={requiredArtist}
        />
      )}
      <ArtistBottom
        index={index}
        gradientPairs={gradientPairs}
        handleFollowClick={handleFollowClick}
        follow={follow}
        tracks={tracks}
        loading={loading}
        artistAlbums={artistAlbums}
        artistRelatedArtists={artistRelatedArtists}
      />
    </Scrollable>
  );
}

export default ArtistPage;
