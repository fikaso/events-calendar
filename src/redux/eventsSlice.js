import { createSlice } from '@reduxjs/toolkit';

export const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    today: [],
    week: [],
    month: [],
  },
  reducers: {
    setEvents: (state, action) => {
      const { eventsToday, eventsInWeek, eventsInMonth } = action.payload;
      state.today = eventsToday;
      state.week = eventsInWeek;
      state.month = eventsInMonth;
    },
    addEvent: (state, action) => {
      const { eventsToday, eventsInWeek, eventsInMonth } = action.payload;

      state.today = [...state.today, ...eventsToday];
      state.week = [...state.week, ...eventsInWeek];
      state.month = [...state.month, ...eventsInMonth];
    },
    removeEvent: (state, action) => {
      state.week = state.week.filter((event) => event.id !== action.payload);
      state.today = state.today.filter((event) => event.id !== action.payload);
      state.month = state.month.filter((event) => event.id !== action.payload);
    },
    updateEvent: (state, action) => {
      const { eventsToday, eventsInWeek, eventsInMonth } = action.payload;
      if (eventsToday.length !== 0) {
        state.today = state.today.map((event) => {
          if (event.id === eventsToday[0].id) {
            return eventsToday[0];
          } else {
            return event;
          }
        });
      }

      if (eventsInWeek.length !== 0) {
        state.week = state.week.map((event) => {
          if (event.id === eventsInWeek[0].id) {
            return eventsInWeek[0];
          } else {
            return event;
          }
        });
      }
      if (eventsInMonth.length !== 0) {
        state.week = state.week.map((event) => {
          if (event.id === eventsInMonth[0].id) {
            return eventsInMonth[0];
          } else {
            return event;
          }
        });
      }
    },
  },
});

export const { setEvents, addEvent, removeEvent, updateEvent } =
  eventsSlice.actions;

export const selectEventsToday = (state) => state.events.today;
export const selectEventsInWeek = (state) => state.events.week;
export const selectEventsInMonth = (state) => state.events.month;

export default eventsSlice.reducer;
