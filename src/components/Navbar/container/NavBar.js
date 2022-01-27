import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectUser } from '../../../redux/userSlice';
import NavBarComponent from '../components/NavBar';

function NavBar() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const signOut = () => {
    dispatch(logOut());
  };
  return (
    <>
      <NavBarComponent user={user} signOut={signOut} />
    </>
  );
}

export default NavBar;
