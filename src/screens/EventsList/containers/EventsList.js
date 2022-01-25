import { useSelector } from 'react-redux';
import {
  addEvent,
  removeEvent,
  selectEvents,
  updateEvent,
} from '../../../redux/eventsSlice';
import {
  addEvent as addEventToCalendar,
  removeEvent as removeEventFromCalendar,
  updateEventInCalendar,
} from '../../../helper/CalendarHandler';
import Calendar from '../../Calendar/Calendar';
import { useDispatch } from 'react-redux';
import EventsListComponent from '../components/EventsList';
import { useState } from 'react';
import { useEffect } from 'react';
import { disableEdit, selectEditedEvent } from '../../../redux/editEventSlice';

function EventsList() {
  const events = useSelector(selectEvents);
  const dispatch = useDispatch();
  const editedEvent = useSelector(selectEditedEvent);

  const [addEventModal, setAddEventModal] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventStart, setEventStart] = useState('');
  const [eventEnd, setEventEnd] = useState('');
  const [calendarView, setCalendarView] = useState(false);

  useEffect(() => {
    if (editedEvent.edit === true) {
      setEventTitle(editedEvent.value.title);
      setEventStart(editedEvent.value.start);
      setEventEnd(editedEvent.value.end);
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

  const updateEventFunction = () => {
    updateEventInCalendar({
      id: editedEvent.value.id,
      title: eventTitle,
      start: new Date(eventStart).toISOString(),
      end: new Date(eventEnd).toISOString(),
    }).then((response) => {
      dispatch(updateEvent(...response));
      dispatch(disableEdit());
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
      {calendarView ? (
        <Calendar setCalendarView={setCalendarView} />
      ) : (
        <div className="flex flex-col items-center justify-center">
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
          <button
            className="bg-[#9c43c5] p-2 rounded-2xl text-white w-32 mt-10"
            onClick={() => setCalendarView(true)}
          >
            Calendar View
          </button>
        </div>
      )}
    </div>
  );
}

export default EventsList;
