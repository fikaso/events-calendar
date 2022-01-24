import { createSlice } from '@reduxjs/toolkit';

export const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    value: [],
  },
  reducers: {
    setEvents: (state, action) => {
      state.value = action.payload;
    },
    addEvent: (state, action) => {
      state.value = [...state.value, action.payload];
    },
  },
});

export const { setEvents, addEvent } = eventsSlice.actions;

export const selectEvents = (state) => state.events.value;

export default eventsSlice.reducer;
