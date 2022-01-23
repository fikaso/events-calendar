import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../../firebase';
import { logOut } from '../../../redux/userSlice';

function Calendar() {
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();

  const ref = useRef();

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      dispatch(logOut);
    } else {
      initClient();
    }
  }, []);

  const initClient = () => {
    fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${process.env.REACT_APP_CALENDAR_ID}/events?key=${process.env.REACT_APP_API_KEY}&orderBy=startTime&singleEvents=true`,
      {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
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
  };

  const formatEvents = (list) => {
    return list.map((item) => ({
      title: item.summary,
      start: item.start.dateTime || item.start.date,
      end: item.end.dateTime || item.end.date,
    }));
  };

  const addEvent = () => {
    if (localStorage.getItem('accessToken')) {
      fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${process.env.REACT_APP_CALENDAR_ID}/events?key=${process.env.REACT_APP_API_KEY}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
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
        .then((data) => {
          setEvents([...events, ...formatEvents([data])]);
        })
        .catch((err) => console.log('error: ', err));
    }
  };

  return (
    <div>
      <FullCalendar
        ref={ref}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
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
        eventColor="#4ce297"
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
