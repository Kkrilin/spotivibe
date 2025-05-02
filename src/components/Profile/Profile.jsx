import { Avatar } from '@mui/material';
import React from 'react';

export default function Profile({
  index,
  gradientPairs,
  profileData,
  isDarkMode,
  playlists,
  artists,
}) {
  return (
    <div
      className="profile_pic"
      style={{
        backgroundImage: `${index && gradientPairs[index][0]}`,
      }}
    >
      <div>
        <Avatar
          sx={{ width: 220, height: 220 }}
          alt="Spotify logo"
          src={profileData.data.images[0].url}
        />
      </div>
      <div
        style={{
          marginLeft: '12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <h6 style={{ fontSize: '14px', fontWeight: '500' }}>Profile</h6>
        <h6 style={{ fontSize: '6rem' }}>{profileData.data.display_name}</h6>
        <span
          style={{
            fontSize: '14px',
            color: '#D5B4BC',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <span
            style={{
              color: `${isDarkMode ? '#837f7f' : '#000'}`,
            }}
          >
            {playlists.length} Public PlayLists
          </span>
          <span className="dot_separator" />
          <span
            style={{
              color: `${isDarkMode ? '#837f7f' : '#000'}`,
              fontWeight: '400',
            }}
          >
            {artists.length} Following
          </span>
        </span>
      </div>
    </div>
  );
}
