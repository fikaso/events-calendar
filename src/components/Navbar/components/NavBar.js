import { FaUser } from 'react-icons/fa';
import NavigationPanel from './NavigationPanel/components/NavigationPanel';

function NavBarComponent({ user, signOut }) {
  return (
    <div className="flex flex-col sm-10 space-y-2">
      <div className="flex items-center justify-between p-10">
        <h1 className="text-3xl">
          <img src="./eventlio-logo.svg" className="w-200 h-42" alt="" />
          <span className="hidden">Events Calendar</span>
        </h1>
        {user && <NavigationPanel />}

        {user ? (
          <div className="flex items-center">
            <button
              onClick={() => signOut()}
              className="button clay button-default mr-5"
            >
              Logout
            </button>
            <img
              className="rounded-full h-10 w-10"
              src={user?.photo}
              alt="user_photo"
            />
          </div>
        ) : (
          <FaUser size={30} />
        )}
      </div>
    </div>
  );
}

export default NavBarComponent;
