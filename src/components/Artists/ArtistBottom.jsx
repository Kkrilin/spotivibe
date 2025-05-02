import React from 'react';
import TrackSkeleton from '../Utils/SkeletonLoader/TrackSkeleton';
import Tracks from '../Tracks/Tracks';
import { Skeleton, Stack } from '@mui/material';
import CardSkeleton from '../Utils/SkeletonLoader/CardSkeleton';
import AlbumCard from '../Album/AlbumCard';
import Artist from '../Library/Artist';

export default function ArtistBottom({
  index,
  gradientPairs,
  handleFollowClick,
  follow,
  tracks,
  loading,
  artistAlbums,
  artistRelatedArtists,
}) {
  const requiredAristAlbum = artistAlbums.filter((item) => item);
  const requiredArtistRelatedArtists = artistRelatedArtists.filter((item) => item);

  return (
    <div
      className="artist_Bottom_container"
      style={{
        backgroundImage: `${index && gradientPairs[index][1]}`,
      }}
    >
      {loading && <TrackSkeleton />}
      {!loading && (
        <Tracks
          handleFollowClick={handleFollowClick}
          follow={follow}
          tracks={tracks}
          colorGradient={index && gradientPairs[index][1]}
        />
      )}
      <div style={{ padding: '1rem 0 0 2rem' }}>
        {loading ? <Skeleton variant="text" sx={{ fontSize: '1rem' }} /> : <h3>Albums</h3>}
        <Stack className="horizontal_scroll" direction={'row'}>
          {loading && <CardSkeleton profile={true} type="playlist" />}
          {!loading && requiredAristAlbum.map((item) => <AlbumCard item={item} />)}
        </Stack>
      </div>
      <div style={{ padding: '1rem 0 0 2rem' }}>
        {loading ? <Skeleton variant="text" sx={{ fontSize: '1rem' }} /> : <h3>Artists</h3>}
        <Stack className="horizontal_scroll" direction={'row'}>
          {loading && <CardSkeleton profile={true} type="playlist" />}
          {!loading &&
            requiredArtistRelatedArtists.map((item) => <Artist item={item} profile={true} />)}
        </Stack>
      </div>
    </div>
  );
}
