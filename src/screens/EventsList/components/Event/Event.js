import React from 'react';
import { FaTimes } from 'react-icons/fa';

function Event({ title, start, end, id, removeEvent }) {
  return (
    <div className="border-2 border-black my-2 text-center rounded-xl w-full relative">
      <button className="absolute right-0" onClick={() => removeEvent(id)}>
        <FaTimes size={20} />
      </button>
      <p>Event Title: {title}</p>
      <p>Start time - {start}</p>
      <p>End Time - {end}</p>
      <p>ID - {id}</p>
    </div>
  );
}

export default Event;
