import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import eventsReducer from './eventsSlice';
import editEventsReducer from './editEventSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    events: eventsReducer,
    editedEvent: editEventsReducer,
  },
});
