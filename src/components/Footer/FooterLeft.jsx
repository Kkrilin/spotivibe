import React from 'react';
import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { AddCircleOutline } from '@mui/icons-material';

export default function FooterLeft({ songDetail, isDarkMode, handleLikeClick, songLike }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '25rem',
      }}
    >
      {songDetail ? (
        <Avatar
          sx={{ width: 70, height: 70 }}
          alt="Spotify logo"
          src={songDetail.album && songDetail.album.images && songDetail.album.images[0].url}
          variant="rounded"
        />
      ) : (
        <Avatar sx={{ bgcolor: deepOrange[500], width: 60, height: 60 }} variant="rounded" />
      )}

      <div style={{ marginLeft: '1rem' }}>
        <h6
          className="name"
          style={{
            color: `${isDarkMode ? '#FFFFFF' : '#000'}`,
            fontSize: '0.9rem',
          }}
        >
          {songDetail && songDetail.name}
        </h6>
        <h6
          className="type"
          style={{
            color: `${isDarkMode ? '#6f6f6f' : '#000'}`,
            fontSize: '0.8rem',
          }}
        >
          {songDetail && songDetail.artists.map((ar) => ar.name).join(' || ')}
        </h6>
      </div>
      <div onClick={handleLikeClick}>
        {songLike ? (
          <CheckCircleIcon
            style={{
              color: 'lightGreen',
              borderRadius: '50%',
              cursor: 'pointer',
              width: '1.2rem',
              height: '1.2rem',
            }}
          />
        ) : (
          <AddCircleOutline
            style={{
              width: '1.2rem',
              height: '1.2rem',
              marginLeft: '10px',
              color: `${isDarkMode ? 'grey' : '#000'}`,
              cursor: 'pointer',
            }}
            className="check_follow"
          />
        )}
      </div>
    </div>
  );
}
