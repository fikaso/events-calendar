import { useSelector } from 'react-redux';
import {
  addEvent,
  removeEvent,
  selectEventsInMonth,
  selectEventsInWeek,
  selectEventsToday,
  updateEvent,
} from '../../redux/eventsSlice';
import {
  addEvent as addEventToCalendar,
  removeEvent as removeEventFromCalendar,
  updateEventInCalendar,
} from '../../helper/CalendarHandler';
import Calendar from '../Calendar/Calendar';
import { useDispatch } from 'react-redux';
import EventsListComponent from '../EventsList/EventsList';
import { useState } from 'react';
import { useEffect } from 'react';
import { disableEdit, selectEditedEvent } from '../../redux/editEventSlice';
import { selectViewDays, selectViewKind } from '../../redux/viewSlice';

function EventsList() {
  const dispatch = useDispatch();
  const viewDays = useSelector(selectViewDays);
  const eventsToday = useSelector(selectEventsToday);
  const eventsInWeek = useSelector(selectEventsInWeek);
  const eventsInMonth = useSelector(selectEventsInMonth);
  const editedEvent = useSelector(selectEditedEvent);
  const viewKind = useSelector(selectViewKind);

  const [addEventModal, setAddEventModal] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventStart, setEventStart] = useState('');
  const [eventEnd, setEventEnd] = useState('');

  useEffect(() => {
    if (editedEvent.edit === true) {
      setEventTitle(editedEvent.value.title);
      setEventStart(editedEvent.value.start);
      setEventEnd(editedEvent.value.end);
    } else {
      setEventTitle('');
      setEventStart('');
      setEventEnd('');
    }
  }, [editedEvent]);

  const addEventFunction = () => {
    addEventToCalendar({
      title: eventTitle,
      start: {
        dateTime: new Date(eventStart).toISOString(),
      },
      end: {
        dateTime: new Date(eventEnd).toISOString(),
      },
    }).then((addedEvent) => {
      if (typeof addedEvent === 'string') {
        dispatch(removeEvent(addedEvent));
      } else {
        dispatch(addEvent(addedEvent));
      }
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

  const updateEventFunction = () => {
    updateEventInCalendar({
      id: editedEvent.value.id,
      title: eventTitle,
      start: new Date(eventStart).toISOString(),
      end: new Date(eventEnd).toISOString(),
    }).then((updatedEvent) => {
      if (typeof updatedEvent === 'string') {
        dispatch(removeEvent(updatedEvent));
      } else {
        dispatch(updateEvent(updatedEvent));
      }
    });
    dispatch(disableEdit());
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

    if (editedEvent.edit === true) {
      updateEventFunction();
    } else {
      addEventFunction();
    }

    setEventTitle('');
    setEventStart('');
    setEventEnd('');
  };

  return (
    <div className="">
      {viewKind ? (
        <Calendar />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <EventsListComponent
            events={
              viewDays === 1
                ? eventsToday
                : viewDays === 7
                ? eventsInWeek
                : viewDays === 30
                ? eventsInMonth
                : null
            }
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
        </div>
      )}
    </div>
  );
}

export default EventsList;
