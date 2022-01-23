import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/userSlice';

import { addEvent, getEvents } from '../../helper/CalendarHandler';

function Calendar() {
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();

  const ref = useRef();

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      dispatch(logOut);
    } else {
      getEvents().then((listOfEvents) => {
        if (listOfEvents) {
          setEvents(listOfEvents);
        } else {
          dispatch(logOut());
        }
      });
    }
  }, []);

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
              addEvent().then((addedEvent) => {
                setEvents([...events, ...addedEvent]);
              });
            },
          },
        }}
      />
    </div>
  );
}

export default Calendar;
