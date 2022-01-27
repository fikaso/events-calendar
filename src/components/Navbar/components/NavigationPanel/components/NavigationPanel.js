import { useDispatch, useSelector } from 'react-redux';
import { displayView, viewKind } from '../../../../../data/viewEnums';
import {
  selectViewKind,
  setView,
  toggleKind,
} from '../../../../../redux/viewSlice';

function NavigationPanel() {
  const view = useSelector(selectViewKind);
  const dispatch = useDispatch();
  return (
    <div>
      {view === viewKind.LIST && (
        <div className="flex items-center space-x-5">
          <h3 className="text-xl">Events to display</h3>
          <button
            onClick={() => dispatch(setView(displayView.DAY))}
            className="bg-[#9c43c5] p-2 rounded-2xl text-white w-32"
          >
            Today
          </button>
          <button
            onClick={() => dispatch(setView(displayView.WEEK))}
            className="bg-[#9c43c5] p-2 rounded-2xl text-white w-32"
          >
            7 days
          </button>
          <button
            onClick={() => dispatch(setView(displayView.MONTH))}
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
        {view === viewKind.CALENDAR ? 'Events List View' : 'Calendar View'}
      </button>
    </div>
  );
}

export default NavigationPanel;
