import moment from 'moment';
import React from 'react';
import { FaEdit, FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { editEvent } from '../../../../redux/editEventSlice';
import { removeEvent as removeEventFromStore } from '../../../../redux/eventsSlice';
import { removeEvent as removeEventFromCalendar } from '../../../../helper/CalendarApiHandler';
import { toggleInputModal } from '../../../../redux/viewSlice';

function Event({ title, start, end, startDay, id }) {
  const dispatch = useDispatch();

  const removeEvent = (id) => {
    removeEventFromCalendar(id).then((response) => {
      if (response.status === 204) {
        dispatch(removeEventFromStore(id));
      } else {
        console.error(response);
      }
    });
  };
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
          dispatch(
            editEvent({
              id,
              title,
              start,
              end,
            })
          );
          dispatch(toggleInputModal());
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
