import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase';

function Login() {
  const signIn = () => {
    signInWithPopup(auth, provider).catch((error) => console.error(error));
  };
  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <button onClick={signIn}>
        <img src="./google_logo.svg" className="w-52 h-52" alt="" />
      </button>
    </div>
  );
}

export default Login;
