import { FaEdit, FaTimes } from 'react-icons/fa';

function EventComponent({
  id,
  title,
  start,
  end,
  startDay,
  editEvent,
  removeEvent,
}) {
  return (
    <div className="w-[40%] border-2 border-black my-2 text-center rounded-xl relative">
      <button
        className="absolute right-1 top-1"
        onClick={() => removeEvent(id)}
      >
        <FaTimes size={20} />
      </button>
      <button className="absolute left-1 top-1" onClick={() => editEvent()}>
        <FaEdit size={20} />
      </button>
      <p>{title}</p>
      <p>Day: {startDay}</p>
      <p>
        From {start} to {end}
      </p>
    </div>
  );
}

export default EventComponent;
