import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../firebase';
import { logOut, selectUser } from '../redux/userSlice';

function NavBar() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(logOut());
    });
  };
  return (
    <div className="flex items-center p-4 justify-between">
      <h1 className="text-3xl">Events Calendar</h1>
      <button onClick={signOut} className="flex items-center space-x-2">
        <img
          className="rounded-full h-12 w-12"
          src={user?.photo}
          alt="user_photo"
        />
        <p>LogOut</p>
      </button>
    </div>
  );
}

export default NavBar;
