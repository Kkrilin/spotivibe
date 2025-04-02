import { Stack } from "@mui/material";
const Filter = () => {
  return (
    <Stack>
      <h4 style={{color: '#b3b3b3'}}>Your Library</h4>
      <div style={{marginTop: '10px'}}>
        <span style={{
            
        }} className="playlist">Playlists</span>
        <span className="artist">Artists</span>
      </div>
    </Stack>
  );
};

export default Filter;
