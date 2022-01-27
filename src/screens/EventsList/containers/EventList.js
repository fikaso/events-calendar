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
import { displayView } from '../../../data/viewEnums';

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

  const evensToDisplay = (viewDays) => {
    switch (viewDays) {
      case displayView.DAY:
        return eventsToday;
      case displayView.WEEK:
        return eventsInWeek;
      case displayView.MONTH:
        return eventsInMonth;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <EventsListComponent
        events={evensToDisplay(viewDays)}
        editMode={editMode}
        toogleEdit={toogleEdit}
      />
    </div>
  );
}

export default EventsList;
