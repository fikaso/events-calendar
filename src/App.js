import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/Navbar/components/NavBar';
import { viewKind } from './data/viewEnums';
import { auth } from './firebase';
import { getEvents } from './helper/CalendarApiHandler';
import { setEvents } from './redux/eventsSlice';
import { logIn, selectUser } from './redux/userSlice';
import { selectViewKind } from './redux/viewSlice';
import Calendar from './screens/Calendar/containers/Calendar';
import EventList from './screens/EventsList/containers/EventList';
import Login from './screens/login/Login';

function App() {
  const dispatch = useDispatch();
  const [calendarToken, setCalendarToken] = useState(false);

  const user = useSelector(selectUser);
  const view = useSelector(selectViewKind);

  const userAuth = () => {
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = 'https://apis.google.com/js/api.js';

    document.body.appendChild(script);

    script.addEventListener('load', () => {
      if (window.gapi) {
        handleClientLoad();
      }
    });
  };

  const handleClientLoad = () => {
    window.gapi.load('client:auth2', initClient);
  };

  const initClient = () => {
    window.gapi.auth2.authorize(
      {
        client_id: process.env.REACT_APP_CLIENT_ID,
        scope: process.env.REACT_APP_SCOPES,
      },
      (res) => {
        if (res.access_token) {
          localStorage.setItem('accessToken', res.access_token);
          setCalendarToken(true);
        }
      }
    );
  };

  useEffect(() => {
    return;
  }, [user]);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          logIn({
            displayName: authUser.displayName,
            email: authUser.email,
            photo: authUser.photoURL,
          })
        );

        if (!localStorage.getItem('accessToken')) {
          userAuth();
        }
      } else {
        setCalendarToken(false);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      getEvents().then((listOfEvents) => {
        if (listOfEvents) {
          dispatch(setEvents(listOfEvents));
        }
      });
    }
  }, [calendarToken, dispatch]);

  const getPageView = (token, kindOfView) => {
    if (token) {
      if (kindOfView === viewKind.CALENDAR) {
        return <Calendar />;
      }
      return <EventList />;
    }
    return <Login />;
  };

  return (
    <div className="flex flex-col p-10">
      <NavBar />
      {getPageView(localStorage.getItem('accessToken'), view)}
    </div>
  );
}

export default App;
