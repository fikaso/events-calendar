import React from 'react';
import { FaEdit, FaTimes } from 'react-icons/fa';

function Event({ title, start, end, id, removeEvent, editEvent }) {
  return (
    <div className="w-[40%] border-2 border-black my-2 text-center rounded-xl relative">
      <button
        className="absolute right-1 top-1"
        onClick={() => removeEvent(id)}
      >
        <FaTimes size={20} />
      </button>
      <button className="absolute left-1 top-1" onClick={() => editEvent(id)}>
        <FaEdit size={20} />
      </button>
      <p>Event Title: {title}</p>
      <p>Start time - {start}</p>
      <p>End Time - {end}</p>
    </div>
  );
}

export default Event;
