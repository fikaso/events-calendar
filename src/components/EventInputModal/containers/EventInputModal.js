import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { disableEdit, selectEditedEvent } from '../../../redux/editEventSlice';
import EventInputModalComponent from '../components/EventInputModal';
import {
  addEvent as addEventToCalendar,
  removeEvent as removeEventFromCalendar,
  updateEventInCalendar,
} from '../../../helper/CalendarApiHandler';
import { addEvent, removeEvent, updateEvent } from '../../../redux/eventsSlice';
import moment from 'moment';

function EventInputModal({ setAddEventModal }) {
  const [eventTitle, setEventTitle] = useState('');
  const [eventStart, setEventStart] = useState('');
  const [eventEnd, setEventEnd] = useState('');

  const editedEvent = useSelector(selectEditedEvent);

  const dispatch = useDispatch();

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
        dateTime: moment(new Date(eventStart)).toISOString(),
      },
      end: {
        dateTime: moment(new Date(eventEnd)).toISOString(),
      },
    }).then((addedEvent) => {
      if (typeof addedEvent === 'string') {
        dispatch(removeEvent(addedEvent));
      } else {
        dispatch(addEvent(addedEvent));
      }
    });
  };

  const updateEventFunction = () => {
    updateEventInCalendar({
      id: editedEvent.value.id,
      title: eventTitle,
      start: moment(new Date(eventStart)).toISOString(),
      end: moment(new Date(eventEnd)).toISOString(),
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
    <EventInputModalComponent
      handleSubmit={handleSubmit}
      eventTitle={eventTitle}
      eventStart={eventStart}
      eventEnd={eventEnd}
      handleTitleChange={handleTitleChange}
      handleEventStartChange={handleEventStartChange}
      handleEventEndChange={handleEventEndChange}
      setAddEventModal={setAddEventModal}
    />
  );
}

export default EventInputModal;
