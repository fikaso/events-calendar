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
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          logIn({
            displayName: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
      }
    });
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      {user ? <EventsList /> : <Login />}
    </div>
  );
}

export default App;
