import moment from 'moment';

const sortEvents = (events) => {
  const now = moment(new Date(Date.now()).toISOString()).format('L');
  const eventsToday = events.filter((event) =>
    moment(now).isSame(moment(event.start).format('L'))
  );

  const eventsWeek = events.filter((event) =>
    moment(moment(event.start).format('L')).isBetween(
      moment(now).format('L'),
      moment(now).add(7, 'days').format('L'),
      'days',
      '[]'
    )
  );

  return { eventsToday, eventsWeek };
};

const formatEvents = (events) => {
  const formatedEvents = events.map((event) => ({
    title: event.summary,
    start: event.start.dateTime || event.start.date,
    end: event.end.dateTime || event.end.date,
    startDay: moment(event.start.dateTime).format('dddd'),
    endDay: moment(event.end.dateTime).format('dddd'),
    id: event.id,
  }));

  const { eventsToday, eventsWeek } = sortEvents(formatedEvents);
  return { eventsToday, eventsWeek };
};

export const addEvent = async (event) => {
  try {
    const res = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${process.env.REACT_APP_CALENDAR_ID}/events?key=${process.env.REACT_APP_API_KEY}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          end: {
            dateTime: event.end.dateTime,
          },
          start: {
            dateTime: event.start.dateTime,
          },
          summary: event.title,
        }),
      }
    );

    const data = await res.json();
    return formatEvents([data]);
  } catch (error) {
    console.error(error);
  }
};

export const getEvents = async () => {
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${process.env.REACT_APP_CALENDAR_ID}/events?key=${process.env.REACT_APP_API_KEY}&orderBy=startTime&singleEvents=true`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }
  );

  if (res.status === 200) {
    const data = await res.json();
    if (data.items) {
      return formatEvents(data.items);
    }
    return data;
  } else {
    return null;
  }
};

export const removeEvent = async (eventId) => {
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${process.env.REACT_APP_CALENDAR_ID}/events/${eventId}?key=${process.env.REACT_APP_API_KEY}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }
  );

  return res;
};

export const updateEventInCalendar = async ({ id, title, start, end }) => {
  try {
    const res = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/' +
        process.env.REACT_APP_CALENDAR_ID +
        '/events/' +
        id +
        '?key=' +
        process.env.REACT_APP_API_KEY,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json ',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          summary: title,
          end: {
            dateTime: end,
          },
          start: {
            dateTime: start,
          },
        }),
      }
    );

    const data = await res.json();
    return formatEvents([data]);
  } catch (error) {
    console.error(error);
  }
};
