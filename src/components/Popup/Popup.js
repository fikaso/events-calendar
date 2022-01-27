function Popup(props) {
  const { setDeleteDialog, removeEvent, id } = props;

  const setDeleteHandler = (status) => {
    if (status) {
      setDeleteDialog(false);
      removeEvent(id);
      return;
    }

    setDeleteDialog(false);
  };

  return (
    <>
      <div className="p-6 pt-0 text-center">
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          Are you sure you want to delete this event
        </h3>
        <button
          onClick={() => setDeleteHandler(true)}
          type="button"
          className="clay button button-default font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
        >
          Yes, I'm sure
        </button>
        <button
          onClick={() => setDeleteHandler(false)}
          type="button"
          className="clay button button-default border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10 dark:bg-gray-700"
        >
          No, cancel
        </button>
      </div>
    </>
  );
}

export default Popup;
