import { Play, RepeatIcon, Shuffle, SkipBack, SkipForward } from 'lucide-react';
import React from 'react';

export default function FooterMediaPlayer() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '15rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '6px',
        }}
      >
        <Shuffle className="shuffle control" />
        <SkipBack className="back control" />
        <Play className="play control" />
        <SkipForward className="forward control" />
        <RepeatIcon className="repeat control" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ fontSize: '12px' }}>1:20</span>
        <div
          style={{
            width: '40rem',
            height: '0.2rem',
            backgroundColor: '#2A2A2A',
            borderRadius: '10px',
          }}
        >
          <div
            style={{
              width: '10rem',
              height: '0.2rem',
              backgroundColor: '#FFF',
              borderRadius: '10px',
            }}
          />
        </div>
        <span style={{ fontSize: '12px' }}>5:20</span>
      </div>
    </div>
  );
}
