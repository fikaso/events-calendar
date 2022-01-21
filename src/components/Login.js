import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { logIn } from '../redux/userSlice';

function Login() {
  const dispatch = useDispatch();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        dispatch(
          logIn({
            displayName: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
      })
      .catch((error) => console.log('error: ', error));
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
