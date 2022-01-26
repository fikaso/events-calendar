import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectUser } from '../redux/userSlice';
import { FaUser } from 'react-icons/fa';
import { selectViewKind, setViewDays, toggleKind } from '../redux/viewSlice';

function NavBar() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const viewKind = useSelector(selectViewKind);

  const signOut = () => {
    dispatch(logOut());
  };
  return (
    <div className="flex flex-col mb-10 space-y-2">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">Events Calendar</h1>
        <button onClick={signOut} className="flex items-center space-x-2">
          {user ? (
            <div className="flex items-center space-x-1">
              <img
                className="rounded-full h-8 w-8"
                src={user?.photo}
                alt="user_photo"
              />

              <p>LogOut</p>
            </div>
          ) : (
            <FaUser size={30} />
          )}
        </button>
      </div>
      {user && (
        <>
          {!viewKind && (
            <div className="flex items-center space-x-5">
              <h3 className="text-xl">Events to display</h3>
              <button
                onClick={() => dispatch(setViewDays(1))}
                className="bg-[#9c43c5] p-2 rounded-2xl text-white w-32"
              >
                Today
              </button>
              <button
                onClick={() => dispatch(setViewDays(7))}
                className="bg-[#9c43c5] p-2 rounded-2xl text-white w-32"
              >
                7 days
              </button>
              <button
                onClick={() => dispatch(setViewDays(30))}
                className="bg-[#9c43c5] p-2 rounded-2xl text-white w-32"
              >
                30 days
              </button>
            </div>
          )}
          <button
            className="bg-[#9c43c5] p-2 rounded-2xl text-white w-32 mt-2"
            onClick={() => dispatch(toggleKind())}
          >
            {viewKind ? 'Events List View' : 'Calendar View'}
          </button>
        </>
      )}
    </div>
  );
}

export default NavBar;
