import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import redirectToSpotifyAuthorize from '../auth/authService';
import config from '../config/config';

function Login() {
  const { redirectUri, clientId } = config;

  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (token) {
      navigate('/user');
    }
  }, [token, navigate]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100vw',
        padding: '4rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '4rem',
          backgroundColor: '#1f1f1f',
          borderRadius: '1.5rem',
        }}
      >
        <Button
          onClick={() => redirectToSpotifyAuthorize(clientId, redirectUri)}
          variant="contained"
          color="success"
        >
          Authorised
        </Button>
      </div>
    </div>
  );
}

export default Login;
