const formatEvents = (list) => {
  return list.map((item) => ({
    title: item.summary,
    start: item.start.dateTime || item.start.date,
    end: item.end.dateTime || item.end.date,
  }));
};

export const addEvent = async () => {
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
            dateTime: new Date('Jan 18, 2022').toISOString(),
          },
          start: {
            dateTime: new Date('Jan 18, 2022').toISOString(),
          },
          summary: 'Added event',
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
