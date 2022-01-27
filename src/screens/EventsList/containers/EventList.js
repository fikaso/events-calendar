import { useSelector } from 'react-redux';
import {
  selectEventsGroupedByDays,
  selectEventsGroupedByWeeks,
  selectEventsToday,
} from '../../../redux/eventsSlice';
import EventsListComponent from '../components/EventsList';
import { selectInputModal, selectViewDays } from '../../../redux/viewSlice';
// import { useDispatch } from 'react-redux';

function EventsList() {
  const viewDays = useSelector(selectViewDays);
  // const dispatch = useDispatch();

  const eventsToday = useSelector(selectEventsToday);
  const eventsInWeek = useSelector(selectEventsGroupedByDays);
  const eventsInMonth = useSelector(selectEventsGroupedByWeeks);

  const editMode = useSelector(selectInputModal);
  // const toogleEdit = dispatch(toggleViewMode());

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
        editMode={editMode}
        // toogleEdit={toogleEdit}
      />
    </div>
  );
}

export default EventsList;
