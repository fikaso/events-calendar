import { createSlice } from '@reduxjs/toolkit';

export const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    week: [],
    today: [],
  },
  reducers: {
    setEvents: (state, action) => {
      const { eventsToday, eventsWeek } = action.payload;
      state.week = eventsWeek;
      state.today = eventsToday;
    },
    addEvent: (state, action) => {
      const { eventsToday, eventsWeek } = action.payload;
      state.week = [...state.week, ...eventsWeek];
      state.today = [...state.today, ...eventsToday];
      // if(action.payload.)
      // state.week = [...state.week, action.payload];
    },
    removeEvent: (state, action) => {
      state.week = state.week.filter((event) => event.id !== action.payload);
      state.today = state.today.filter((event) => event.id !== action.payload);
    },
    updateEvent: (state, action) => {
      const { eventsToday, eventsWeek } = action.payload;
      state.today = state.today.map((event) => {
        if (event.id === eventsToday[0].id) {
          return eventsToday[0];
        } else {
          return event;
        }
      });

      state.week = [...state.week];
    },
  },
});

export const { setEvents, addEvent, removeEvent, updateEvent } =
  eventsSlice.actions;

export const selectEventsToday = (state) => state.events.today;
export const selectEventsInWeek = (state) => state.events.week;

export default eventsSlice.reducer;
