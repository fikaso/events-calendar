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

function EventsList() {
  const events = useSelector(selectEvents);
  const dispatch = useDispatch();

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

  return (
    <>
      <EventsListComponent
        events={events}
        addEvent={addEventFunction}
        removeEvent={removeEventFunction}
      />

      {/* <Calendar /> */}
    </>
  );
}

export default EventsList;
