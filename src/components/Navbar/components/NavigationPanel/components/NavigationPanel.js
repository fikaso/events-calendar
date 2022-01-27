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
    <div className="flex items-center space-x-5">
      {view === viewKind.LIST && (
        <div className="flex items-center space-x-5">
          <button
            onClick={() => dispatch(setView(displayView.DAY))}
            className="button-default button clay"
          >
            Today
          </button>
          <button
            onClick={() => dispatch(setView(displayView.WEEK))}
            className="button-default button clay"
          >
            7 days
          </button>
          <button
            onClick={() => dispatch(setView(displayView.MONTH))}
            className="button-default button clay"
          >
            30 days
          </button>
        </div>
      )}
      <button
        className="button button-secondary clay"
        onClick={() => dispatch(toggleKind())}
      >
        {view === viewKind.CALENDAR ? 'Events List View' : 'Calendar View'}
      </button>
    </div>
  );
}

export default NavigationPanel;
