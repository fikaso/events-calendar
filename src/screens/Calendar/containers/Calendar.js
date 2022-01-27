import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addEvent, selectEventsInMonth } from '../../../redux/eventsSlice';
import { addEvent as addEventToCalendar } from '../../../helper/CalendarApiHandler';
import CalendarComponent from '../components/Calendar';

function Calendar() {
  const dispatch = useDispatch();
  const events = useSelector(selectEventsInMonth);
  const addEventFunction = () => {
    addEventToCalendar().then((addedEvent) => {
      dispatch(addEvent(...addedEvent));
    });
  };
  return <CalendarComponent events={events} addEvent={addEventFunction} />;
}

export default Calendar;
