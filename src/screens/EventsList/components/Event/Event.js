import moment from 'moment';
import React from 'react';
import { FaEdit, FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { editEvent } from '../../../../redux/editEventSlice';

function Event({
  title,
  start,
  end,
  startDay,
  endDay,
  id,
  removeEvent,
  setAddEventModal,
}) {
  const dispatch = useDispatch();
  return (
    <div className="w-[40%] border-2 border-black my-2 text-center rounded-xl relative">
      <button
        className="absolute right-1 top-1"
        onClick={() => removeEvent(id)}
      >
        <FaTimes size={20} />
      </button>
      <button
        className="absolute left-1 top-1"
        onClick={() => {
          setAddEventModal(true);
          dispatch(
            editEvent({
              id,
              title,
              start,
              end,
            })
          );
        }}
      >
        <FaEdit size={20} />
      </button>
      <p>Event Title: {title}</p>
      <p>Day: {startDay}</p>
      <p>Start time - {moment(start).format('MMMM Do YYYY, h:mm:ss a')}</p>
      <p>End Time - {moment(end).format('MMMM Do YYYY, h:mm:ss a')}</p>
    </div>
  );
}

export default Event;
