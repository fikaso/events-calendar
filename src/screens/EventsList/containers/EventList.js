import { useDispatch, useSelector } from 'react-redux';
import {
  selectEventsGroupedByDays,
  selectEventsGroupedByWeeks,
  selectEventsToday,
} from '../../../redux/eventsSlice';
import EventsListComponent from '../components/EventsList';
import {
  selectInputModal,
  selectViewDays,
  toggleInputModal,
} from '../../../redux/viewSlice';

function EventsList() {
  const viewDays = useSelector(selectViewDays);

  const eventsToday = useSelector(selectEventsToday);
  const eventsInWeek = useSelector(selectEventsGroupedByDays);
  const eventsInMonth = useSelector(selectEventsGroupedByWeeks);

  const editMode = useSelector(selectInputModal);
  const dispatch = useDispatch();
  const toogleEdit = () => {
    dispatch(toggleInputModal());
  };

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
        toogleEdit={toogleEdit}
      />
    </div>
  );
}

export default EventsList;
