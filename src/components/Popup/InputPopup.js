function InputPopup({ children }) {
  return (
    <>
      <div
        id="defaultModal"
        aria-hidden="true"
        className=" flex overflow-y-auto overflow-x-hidden fixed right-auto left-auto top-10 z-50 justify-center items-center h-modal md:h-full md:inset-0 m-auto absolute inset-x-0 shadow-xl bg-black bg-opacity-50 w-full mx-auto -mt-1 rounded-lg rounded-t-none"
      >
        <div class="relative px-4 w-full max-w-2xl h-full md:h-auto">
          <div class="clay modal-content relative">{children}</div>
        </div>
      </div>
    </>
  );
}

export default InputPopup;
