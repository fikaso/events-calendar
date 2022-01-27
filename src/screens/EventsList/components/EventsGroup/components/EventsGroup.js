import Event from '../../Event/containers/Event';

function EventsGroup({ events, groupName }) {
  return (
    <>
      <div className="flex flex-col items-center w-full mb-10">
        <h3>{groupName}</h3>
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
