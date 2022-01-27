import { useSelector } from 'react-redux';
import EventInputModal from '../../../components/EventInputModal/containers/EventInputModal';
import { displayView } from '../../../data/viewEnums';
import { selectViewDays } from '../../../redux/viewSlice';
import Event from './Event/containers/Event';
import EventsGroup from './EventsGroup/components/EventsGroup';

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
      {viewDays === displayView.DAY ? (
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
      ) : (
        <>
          {Object.keys(events)?.map((groupName, count) => (
            <EventsGroup
              events={events[groupName]}
              groupName={groupName}
              key={count}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default EventsListComponent;
