import { Button, Avatar } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useTheme } from '../Context/ThemeProvider.jsx';
import Track from './Track.jsx';

function Tracks({
  tracks,
  colorGradient,
  type,
  follow,
  handleFollowClick,
  requiredPlaylist,
  setRequiredPlaylist,
  setTracks,
}) {
  const { isDarkMode } = useTheme();
  if (['playlist_search', 'search'].includes(type)) {
    return (
      <div style={{ padding: '1.5rem' }}>
        {tracks.map((track, i) => (
          <Track type={type} key={i + 1} count={i + 1} id={track.id} track={track} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', paddingTop: '1rem' }}>
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'green',
            // position: "relative",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '20px',
          }}
        >
          <div
            style={{
              width: '0',
              height: '0',
              borderLeft: '18px solid black',
              borderTop: '9px solid transparent',
              borderBottom: '9px solid transparent',
              //   position: "absolute",
            }}
          />
        </div>
        {type === 'like' && ''}
        {type !== 'like' && (
          <>
            {['album', 'playlist'].includes(type) && (
              <div onClick={type === 'playlist' ? handleFollowClick : () => console.log(type)}>
                {follow && (
                  <CheckCircleOutlineIcon
                    style={{
                      width: '2rem',
                      height: '2rem',
                      marginLeft: '20px',
                      color: 'grey',
                      cursor: 'pointer',
                      // backgroundColor:"green"
                    }}
                    className="check_follow"
                  />
                )}
                {!follow && (
                  <AddCircleOutlineIcon
                    style={{
                      width: '2rem',
                      height: '2rem',
                      marginLeft: '20px',
                      color: 'grey',
                      cursor: 'pointer',
                    }}
                    className="check_follow"
                  />
                )}
              </div>
            )}
            {!['album', 'playlist'].includes(type) && (
              <Button
                onClick={handleFollowClick}
                style={{
                  color: `${isDarkMode ? '#fff' : '#000'}`,
                  textTransform: 'capitalize',
                  borderRadius: '100000px',
                  padding: '2px 1rem',
                }}
                className="follow_button"
                variant="outlined"
                color="success"
              >
                {follow ? 'Following' : 'Follow'}
              </Button>
            )}
            <div style={{ color: 'grey', marginLeft: '20px', cursor: 'pointer' }}>
              <span>&#9679;</span>
              <span>&#9679;</span>
              <span>&#9679;</span>
            </div>
          </>
        )}
      </div>
      <h2 style={{ marginTop: '20px' }}>Top Track</h2>
      <div style={{ padding: '1.5rem', maxWidth: '1350px' }}>
        {tracks.length > 0 &&
          tracks.map((track, i) => (
            <Track
              type={type}
              key={i + 1}
              count={i + 1}
              id={track.id || track.track.id}
              track={track}
              requiredPlaylist={requiredPlaylist}
              setRequiredPlaylist={setRequiredPlaylist}
              setTracks={setTracks}
              colorGradient={colorGradient}
            />
          ))}
      </div>
    </div>
  );
}

export default Tracks;
