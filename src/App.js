import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import EventsList from './components/EventsList';
import Login from './components/Login';
import NavBar from './components/NavBar';
import { auth } from './firebase';
import { logIn, selectUser } from './redux/userSlice';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          logIn({
            displayName: authUser.displayName,
            email: authUser.email,
            photo: authUser.photoURL,
            accessToken: authUser.accessToken,
          })
        );
      }
    });
  }, [dispatch]);

  return (
    <div className="flex flex-col p-10">
      <NavBar />
      {user ? <EventsList /> : <Login />}
    </div>
  );
}

export default App;
