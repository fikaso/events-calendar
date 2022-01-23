import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { logIn, logOut, selectUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase';

function Calendar() {
  const [events, setEvents] = useState(null);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const ref = useRef();

  useEffect(() => {
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
  }, []);

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
          dispatch(
            logIn({
              displayName: user.displayName,
              email: user.email,
              photo: user.photo,
              accessToken: res.access_token,
            })
          );
        }

        // window.gapi.client.load('calendar', 'v3', ()=>{});
      }
    );

    if (!user.accessToken) {
      dispatch(logOut);
    } else {
      fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${process.env.REACT_APP_CALENDAR_ID}/events?key=${process.env.REACT_APP_API_KEY}&orderBy=startTime&singleEvents=true`,
        {
          headers: {
            Authorization: `${user.accessToken}`,
          },
        }
      )
        .then((res) => {
          // Unauthorized status code 401
          if (res.status !== 401) {
            return res.json();
          } else {
            console.log('error 401 : ', res);
            auth.signOut().then(() => {
              dispatch(logOut());
            });
          }
        })
        .then((data) => {
          if (data?.items) {
            setEvents(formatEvents(data.items));
          }
        });
    }
  };

  const formatEvents = (list) => {
    return list.map((item) => ({
      title: item.summary,
      start: item.start.dateTime || item.start.date,
      end: item.end.dateTime || item.end.date,
    }));
  };

  const addEvent = () => {
    if (window.gapi.client || user.accessToken) {
      fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${process.env.REACT_APP_CALENDAR_ID}/events?key=${process.env.REACT_APP_API_KEY}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify({
            end: {
              dateTime: new Date('Jan 18, 2022').toISOString(),
            },
            start: {
              dateTime: new Date('Jan 18, 2022').toISOString(),
            },
            summary: 'Added event',
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => console.log('added event data: ', data))
        .catch((err) => console.log('error: ', err));
    }
  };

  return (
    <div>
      <FullCalendar
        ref={ref}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridWeek"
        events={events}
        displayEventTime={true}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: 'false',
          hour12: false,
        }}
        displayEventEnd={true}
        eventBackgroundColor="#5ebf8e"
        eventColor="#5ebf8e"
        eventDisplay="block"
        headerToolbar={{
          start: 'addEventButton', // will normally be on the left. if RTL, will be on the right
          center: 'title',
          end: 'today prev,next dayGridDay,dayGridWeek,dayGridMonth', // will normally be on the right. if RTL, will be on the left
        }}
        customButtons={{
          addEventButton: {
            text: 'Add Event',
            click: () => {
              addEvent();
            },
          },
        }}
      />
    </div>
  );
}

export default Calendar;
