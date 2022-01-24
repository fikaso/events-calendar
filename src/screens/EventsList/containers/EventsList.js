import { useSelector } from 'react-redux';
import {
  addEvent,
  removeEvent,
  selectEvents,
} from '../../../redux/eventsSlice';
import {
  addEvent as addEventToCalendar,
  removeEvent as removeEventFromCalendar,
} from '../../../helper/CalendarHandler';
import Calendar from '../../Calendar/Calendar';
import { useDispatch } from 'react-redux';
import EventsListComponent from '../components/EventsList';
import { useState } from 'react';

function EventsList() {
  const events = useSelector(selectEvents);
  const dispatch = useDispatch();

  const [addEventModal, setAddEventModal] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventStart, setEventStart] = useState('');
  const [eventEnd, setEventEnd] = useState('');

  const addEventFunction = (event) => {
    addEventToCalendar(event).then((addedEvent) => {
      dispatch(addEvent(...addedEvent));
    });
  };

  const removeEventFunction = (id) => {
    removeEventFromCalendar(id).then((response) => {
      if (response.status === 204) {
        dispatch(removeEvent(id));
      } else {
        console.error(response);
      }
    });
  };

  const handleTitleChange = (e) => {
    setEventTitle(e.target.value);
  };
  const handleEventStartChange = (e) => {
    setEventStart(e.target.value);
  };

  const handleEventEndChange = (e) => {
    setEventEnd(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEventFunction({
      title: eventTitle,
      start: {
        dateTime: new Date(eventStart).toISOString(),
      },
      end: {
        dateTime: new Date(eventEnd).toISOString(),
      },
    });

    setEventTitle('');
    setEventStart('');
    setEventEnd('');
  };

  return (
    <>
      <EventsListComponent
        events={events}
        addEventModal={addEventModal}
        eventTitle={eventTitle}
        eventStart={eventStart}
        eventEnd={eventEnd}
        removeEvent={removeEventFunction}
        setAddEventModal={setAddEventModal}
        handleSubmit={handleSubmit}
        handleTitleChange={handleTitleChange}
        handleEventStartChange={handleEventStartChange}
        handleEventEndChange={handleEventEndChange}
      />

      {/* <Calendar /> */}
    </>
  );
}

export default EventsList;
