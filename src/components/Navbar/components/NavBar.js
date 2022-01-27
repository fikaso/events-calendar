import { FaUser } from 'react-icons/fa';
import NavigationPanel from './NavigationPanel/components/NavigationPanel';

function NavBarComponent({ user, signOut }) {
  return (
    <div className="flex flex-col mb-10 space-y-2">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">Events Calendar</h1>
        <button
          onClick={() => signOut()}
          className="flex items-center space-x-2"
        >
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
      {user && <NavigationPanel />}
    </div>
  );
}

export default NavBarComponent;
