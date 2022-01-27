export const calendarAPI = {
  GET: `https://www.googleapis.com/calendar/v3/calendars/${process.env.REACT_APP_CALENDAR_ID}/events?key=${process.env.REACT_APP_API_KEY}&orderBy=startTime&singleEvents=true`,
  PATCH:
    'https://www.googleapis.com/calendar/v3/calendars/' +
    process.env.REACT_APP_CALENDAR_ID +
    '/events/',
  POST: `https://www.googleapis.com/calendar/v3/calendars/${process.env.REACT_APP_CALENDAR_ID}/events?key=${process.env.REACT_APP_API_KEY}`,
  DELETE: `https://www.googleapis.com/calendar/v3/calendars/${process.env.REACT_APP_CALENDAR_ID}/events/`,
};
