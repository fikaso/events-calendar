import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import React from 'react';

import { addEvent as addEventToCalendar } from '../../helper/CalendarHandler';
import { useSelector } from 'react-redux';
import { selectEventsInWeek } from '../../redux/eventsSlice';
import { useDispatch } from 'react-redux';
import { addEvent } from '../../redux/eventsSlice';
import { toggleKind } from '../../redux/viewSlice';

function Calendar({ toggleView }) {
  const dispatch = useDispatch();
  const events = useSelector(selectEventsInWeek);
  const addEventFunction = () => {
    addEventToCalendar().then((addedEvent) => {
      dispatch(addEvent(...addedEvent));
    });
  };

  return (
    <>
      {events && (
        <FullCalendar
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
            start: 'addEventButton',
            center: 'title',
            end: 'today prev,next dayGridDay,dayGridWeek,dayGridMonth',
          }}
          customButtons={{
            addEventButton: {
              text: 'Add Event',
              click: () => addEventFunction(),
            },
          }}
        />
      )}
      <button
        onClick={() => dispatch(toggleKind())}
        className="bg-[#9c43c5] p-2 rounded-2xl text-white w-32 mt-10"
      >
        Events List View
      </button>
    </>
  );
}

export default Calendar;
