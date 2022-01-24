import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../firebase';
import { logOut, selectUser } from '../redux/userSlice';
import { FaUser } from 'react-icons/fa';

function NavBar() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const signOut = () => {
    dispatch(logOut());
  };
  return (
    <div className="flex items-center mb-10 justify-between">
      <h1 className="text-3xl">Events Calendar</h1>
      <button onClick={signOut} className="flex items-center space-x-2">
        {localStorage.getItem('accessToken') ? (
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
  );
}

export default NavBar;
