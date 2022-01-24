import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import eventsReducer from './eventsSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    events: eventsReducer,
  },
});
