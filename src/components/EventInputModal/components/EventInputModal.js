import { useDispatch } from 'react-redux';
import { disableEdit } from '../../../redux/editEventSlice';
import { toggleInputModal } from '../../../redux/viewSlice';

function EventInputModalComponent({
  handleSubmit,
  eventTitle,
  eventStart,
  eventEnd,
  handleTitleChange,
  handleEventStartChange,
  handleEventEndChange,
}) {
  const dispatch = useDispatch();
  return (
    <div className="w-[70%] max-w-[1200px]">
      <div className="border border-[#e2e2e2] p-4 rounded-xl mb-10">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl text-gray-500 font-semibold ">
            Please add event details
          </h2>
          <div className="flex flex-col items-center space-y-2 p-4">
            <input
              className="input"
              type="text"
              placeholder="Write event title"
              value={eventTitle}
              onChange={handleTitleChange}
            />
            <div className="input space-x-5">
              <label>Add event start date and time</label>
              <input
                type="text"
                onChange={handleEventStartChange}
                onInput={handleEventStartChange}
                value={eventStart}
                onFocus={(e) => (e.target.type = 'datetime-local')}
              />
            </div>
            <div className="input space-x-5">
              <label>Add event end date and time</label>
              <input
                type="text"
                onChange={handleEventEndChange}
                onInput={handleEventEndChange}
                value={eventEnd}
                onFocus={(e) => (e.target.type = 'datetime-local')}
              />
            </div>
          </div>
          <div className="flex items-center justify-center mt-5 space-x-5">
            <button
              className="bg-[#1c75a8] p-2 rounded-2xl text-white w-32"
              type="submit"
            >
              Submit
            </button>
            <button
              className="bg-[#1c75a8] p-2 rounded-2xl text-white w-32"
              onClick={() => {
                dispatch(disableEdit());
                dispatch(toggleInputModal());
              }}
            >
              Cancle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventInputModalComponent;
