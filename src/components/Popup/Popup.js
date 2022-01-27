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
      <div className="relative px-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="p-6 pt-0 text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this event
            </h3>
            <button
              onClick={() => setDeleteHandler(true)}
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Yes, I'm sure
            </button>
            <button
              onClick={() => setDeleteHandler(false)}
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Popup;
