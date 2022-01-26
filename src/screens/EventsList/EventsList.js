import EventInputModal from '../../components/EventInputModal';
import Event from './components/Event/Event';

function EventList({
  events,
  removeEvent,
  addEventModal,
  setAddEventModal,
  handleSubmit,
  handleTitleChange,
  handleEventStartChange,
  handleEventEndChange,
  eventTitle,
  eventStart,
  eventEnd,
  editEvent,
}) {
  return (
    <div className="flex flex-col items-center w-full">
      {addEventModal ? (
        <EventInputModal
          handleSubmit={handleSubmit}
          eventTitle={eventTitle}
          eventStart={eventStart}
          eventEnd={eventEnd}
          handleTitleChange={handleTitleChange}
          handleEventStartChange={handleEventStartChange}
          handleEventEndChange={handleEventEndChange}
          setAddEventModal={setAddEventModal}
        />
      ) : (
        <button
          className="bg-[#1c75a8] p-2 rounded-2xl text-white mb-2 w-32"
          onClick={() => setAddEventModal(true)}
        >
          Add Event
        </button>
      )}

      {events?.map((event) => (
        <Event
          key={event.id}
          title={event.title}
          start={event.start}
          end={event.end}
          startDay={event.startDay}
          endDay={event.endDay}
          id={event.id}
          removeEvent={removeEvent}
          editEvent={editEvent}
          setAddEventModal={setAddEventModal}
        />
      ))}
    </div>
  );
}

export default EventList;
