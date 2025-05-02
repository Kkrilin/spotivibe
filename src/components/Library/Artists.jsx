import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setArtists } from '../../redux/profileSlice.js';
import CardSkeleton from '../Utils/SkeletonLoader/CardSkeleton.jsx';
import Artist from './Artist.jsx';
import { followedArtistUrl, getHeader } from '../../config/index.js';

function Artists({ search }) {
  const { artists } = useSelector((state) => state.profile);
  const { globalCount } = useSelector((state) => state.refresh);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const token = localStorage.getItem('access_token', 'access_token');

  const header = getHeader(token);

  const fetchArtist = async () => {
    setLoading(true);
    try {
      const response = await axios.get(followedArtistUrl, header);
      dispatch(setArtists({ data: response.data.artists.items }));
    } catch (error) {
      setError(error.response?.data?.error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtist();
  }, [globalCount]);

  let filteredArtists = artists;
  if (search) {
    filteredArtists = artists.filter((ar) => ar.name.toLowerCase().includes(search.toLowerCase()));
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      {loading ? (
        <CardSkeleton />
      ) : (
        filteredArtists.map((item, index) => <Artist key={index} item={item} loading={loading} />)
      )}
    </>
  );
}

export default Artists;
