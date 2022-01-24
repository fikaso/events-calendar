const formatEvents = (list) => {
  return list.map((item) => ({
    title: item.summary,
    start: item.start.dateTime || item.start.date,
    end: item.end.dateTime || item.end.date,
    id: item.id,
  }));
};

export const addEvent = async (event) => {
  let data = null;

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

    data = await res.json();
    return formatEvents([data]);
  } catch (error) {
    console.error(error);
  }
};

export const getEvents = async () => {
  let data = null;
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${process.env.REACT_APP_CALENDAR_ID}/events?key=${process.env.REACT_APP_API_KEY}&orderBy=startTime&singleEvents=true`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }
  );

  if (res.status === 200) {
    data = await res.json();
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
