import { useSelector } from 'react-redux';
import EventInputModal from '../../../components/EventInputModal/containers/EventInputModal';
import { selectViewDays } from '../../../redux/viewSlice';
import Event from './Event/containers/Event';

function EventsListComponent({ events, editMode, toogleEdit }) {
  const viewDays = useSelector(selectViewDays);

  return (
    <div className="flex flex-col items-center w-full">
      {editMode ? (
        <EventInputModal />
      ) : (
        <button
          className="bg-[#1c75a8] p-2 rounded-2xl text-white mb-2 w-32"
          onClick={() => toogleEdit()}
        >
          Add Event
        </button>
      )}
      {viewDays === 7 || viewDays === 30 ? (
        <>
          {Object.keys(events).map((keyName, count) => (
            <div key={count} className="w-full mb-10">
              {events[keyName].map((event) => (
                <Event
                  key={event.id}
                  title={event.title}
                  start={event.start}
                  end={event.end}
                  startDay={event.startDay}
                  id={event.id}
                />
              ))}
            </div>
          ))}
        </>
      ) : (
        <>
          {events?.map((event) => (
            <Event
              key={event.id}
              title={event.title}
              start={event.start}
              end={event.end}
              startDay={event.startDay}
              endDay={event.endDay}
              id={event.id}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default EventsListComponent;
