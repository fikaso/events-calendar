import Event from '../../Event/containers/Event';

function EventsGroup({ events, groupName }) {
  return (
    <>
      <div className="flex flex-col items-center w-full py-5 mt-5">
        <h3 className="event-title">{groupName}</h3>
        {events?.map((event) => (
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
    </>
  );
}

export default EventsGroup;
