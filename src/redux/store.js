import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import eventsReducer from './eventsSlice';
import editEventsReducer from './editEventSlice';
import viewSlice from './viewSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    events: eventsReducer,
    editedEvent: editEventsReducer,
    view: viewSlice,
  },
});
