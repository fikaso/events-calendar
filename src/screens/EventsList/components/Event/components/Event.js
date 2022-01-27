import { useState } from 'react';
import { FaEdit, FaTimes } from 'react-icons/fa';
import Popup from '../../../../../components/Popup/Popup';

function EventComponent({
  id,
  title,
  start,
  end,
  startDay,
  editEvent,
  removeEvent,
}) {
  const [deleteDialog, setDeleteDialog] = useState(false);
  return (
    <>
      <div className="relative p-10 event-box clay text-xl mt-5 mb-5 text-center">
        <button
          className="absolute right-12 top-5"
          onClick={() => {
            setDeleteDialog(true);
          }}
        >
          <FaTimes size={28} className="text-gray-400" />
        </button>
        <button className="absolute right-20 top-5" onClick={() => editEvent()}>
          <FaEdit size={28} className="text-gray-400" />
        </button>
        <h2 className="text-2xl mb-5 mt-3">{title}</h2>
        <div>
          <div className="flex justify-around">
            <p className="text-xl">start</p>
            <p className="text-xl">end</p>
          </div>
          <div className="flex justify-around text-center">
            <p className="text-md px-3 text-gray-400">{start}</p>
            <p className="text-md px-3 text-gray-400">{end}</p>
          </div>
        </div>
      </div>
      {deleteDialog && (
        <Popup
          setDeleteDialog={setDeleteDialog}
          id={id}
          removeEvent={removeEvent}
        />
      )}
    </>
  );
}

export default EventComponent;
