import { signInWithPopup, signInWithCustomToken } from 'firebase/auth';
import { useEffect } from 'react';
import { useState } from 'react';
import { auth, provider } from '../../firebase';

function Login() {
  const signIn = () => {
    signInWithPopup(auth, provider).catch((error) =>
      console.log('error: ', error)
    );
  };
  return (
    <div className="flex flex-col items-center h-screen justify-center space-y-10">
      <h2 className="text-xl">Please login</h2>
      <button onClick={signIn}>
        <img src="./google_logo.svg" className="w-52 h-52" alt="" />
      </button>
    </div>
  );
}

export default Login;
