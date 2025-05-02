import { Skeleton, Stack } from '@mui/material';
import React from 'react';
import HorizontalScroll from '../Utils/HorizontalScroll';
import CardSkeleton from '../Utils/SkeletonLoader/CardSkeleton';
import Playlist from '../Library/PlayList';
import Artist from '../Library/Artist';

export default function ProfileBottom({ index, gradientPairs, loading, playlists, artists }) {
  return (
    <div
      className="profile_bottom_Container"
      style={{
        backgroundImage: `${index && gradientPairs[index][1]}`,
      }}
    >
      <div>
        {loading ? <Skeleton variant="text" sx={{ fontSize: '1rem' }} /> : <h2>Public Playlist</h2>}
        <HorizontalScroll>
          <Stack direction="row" spacing={2}>
            {loading && <CardSkeleton profile type="playlist" />}
            {!loading && playlists.map((item) => <Playlist key={item.id} item={item} profile />)}
          </Stack>
        </HorizontalScroll>
      </div>
      <div style={{ marginTop: '2rem' }}>
        {loading ? <Skeleton variant="text" sx={{ fontSize: '1rem' }} /> : <h2>Following</h2>}
        <HorizontalScroll>
          <Stack direction="row" spacing={2}>
            {loading && <CardSkeleton profile />}
            {!loading && artists.map((item) => <Artist item={item} profile />)}
          </Stack>
        </HorizontalScroll>
      </div>
    </div>
  );
}
