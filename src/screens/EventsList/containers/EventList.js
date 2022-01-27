import { useSelector } from 'react-redux';
import {
  selectEventsGroupedByDays,
  selectEventsGroupedByWeeks,
  selectEventsToday,
} from '../../../redux/eventsSlice';
import EventsListComponent from '../components/EventsList';
import { selectViewDays } from '../../../redux/viewSlice';

function EventsList() {
  const viewDays = useSelector(selectViewDays);

  const eventsToday = useSelector(selectEventsToday);
  const eventsInWeek = useSelector(selectEventsGroupedByDays);
  const eventsInMonth = useSelector(selectEventsGroupedByWeeks);

  return (
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
      />
    </div>
  );
}

export default EventsList;
