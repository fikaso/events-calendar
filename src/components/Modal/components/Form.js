function FormComponent({
  handleSubmit,
  eventTitle,
  eventStart,
  eventEnd,
  handleTitleChange,
  handleEventStartChange,
  handleEventEndChange,
  cancel,
}) {
  return (
    <div className="w-full">
      <div className="p-4 mb-10">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl text-center">Please add event details</h2>
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
            <button className="button-default button clay" type="submit">
              Submit
            </button>
            <button
              className="button-default button clay"
              onClick={() => cancel()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormComponent;
