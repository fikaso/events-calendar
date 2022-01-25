import { useRef } from 'react';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import EventInputModal from '../../../components/EventInputModal';
import Event from './Event/Event';

function EventsListComponent({
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
          id={event.id}
          removeEvent={removeEvent}
          editEvent={editEvent}
          setAddEventModal={setAddEventModal}
        />
      ))}
    </div>
  );
}

export default EventsListComponent;
