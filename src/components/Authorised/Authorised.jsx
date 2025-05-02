import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config/config';

function Authorised() {
  const navigate = useNavigate();
  const codeVerifier = localStorage.getItem('code_verifier');
  const { redirectUri, clientId, tokenUrl } = config;

  const getToken = async (code) => {
    const payload = {
      method: 'post',
      url: tokenUrl,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },

      data: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    };
    const response = await axios(payload);
    localStorage.setItem('access_token', response.data.access_token);
    localStorage.setItem('refresh_token', response.data.refresh_token);
    return response;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');
    if (authCode) {
      getToken(authCode)
        .then(() => {
          navigate(`/user`, { replace: true });
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div>
      <h1>redirecting to Profile Home page....</h1>
    </div>
  );
}

export default Authorised;
