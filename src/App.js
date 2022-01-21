import { useState } from 'react';
import { useEffect } from 'react';
import GoogleLogin, { GoogleLogout } from 'react-google-login';

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const CLIENT_ID =
    '1067223215975-t2jk3ls0ko5jnlmj1h9fsbrcob210jat.apps.googleusercontent.com';

  const responseGoogle = (response) => {
    setSignedIn(true);
    localStorage.setItem('user', response);
  };

  const handleLogout = () => {
    setSignedIn(false);
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setSignedIn(true);
    }
  }, []);

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-4xl mb-10">Events Calendar</h1>
      {signedIn ? (
        ((<h2>Google Calendar</h2>),
        (
          <GoogleLogout
            clientId={CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={handleLogout}
          ></GoogleLogout>
        ))
      ) : (
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy="single_host_origin"
        />
      )}
    </div>
  );
}

export default App;
