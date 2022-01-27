import moment from 'moment';
import { useDispatch } from 'react-redux';
import { editEvent } from '../../../../../redux/editEventSlice';
import { removeEvent as removeEventFromStore } from '../../../../../redux/eventsSlice';
import { removeEvent as removeEventFromCalendar } from '../../../../../helper/CalendarApiHandler';
import { toggleInputModal } from '../../../../../redux/viewSlice';
import EventComponent from '../components/Event';

function Event({ title, start, end, startDay, id }) {
  const dispatch = useDispatch();

  const editEventFunction = () => {
    dispatch(
      editEvent({
        id,
        title,
        start,
        end,
      })
    );
    dispatch(toggleInputModal());
  };

  const removeEvent = (id) => {
    removeEventFromCalendar(id).then((response) => {
      if (response.status === 204) {
        dispatch(removeEventFromStore(id));
      } else {
        console.error(response);
      }
    });
  };
  return (
    <EventComponent
      id={id}
      title={title}
      start={moment(start).format('MMMM Do YYYY, h:mm:ss a')}
      end={moment(end).format('MMMM Do YYYY, h:mm:ss a')}
      startDay={startDay}
      editEvent={editEventFunction}
      removeEvent={removeEvent}
    />
  );
}

export default Event;
