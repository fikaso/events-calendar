import { FaTimes } from 'react-icons/fa';
import Event from './Event/Event';

function EventsListComponent({ events, addEvent, removeEvent }) {
  return (
    <div className="flex flex-col items-center">
      <button
        className="bg-[#1c75a8] p-2 rounded-2xl text-white mb-2 w-32"
        onClick={addEvent}
      >
        Add Event
      </button>

      {events?.map((event) => (
        <Event
          key={event.id}
          title={event.title}
          start={event.start}
          end={event.end}
          id={event.id}
          removeEvent={removeEvent}
        />
      ))}
    </div>
  );
}

export default EventsListComponent;
