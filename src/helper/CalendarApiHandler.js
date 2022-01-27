import { calendarAPI } from '../data/apiEnum';
import { formatEvents } from './FormatEvents';

export const addEvent = async (event) => {
  try {
    const res = await fetch(calendarAPI.POST, {
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
    });

    const data = await res.json();
    return formatEvents([data]);
  } catch (error) {
    console.error(error);
  }
};

export const getEvents = async () => {
  const res = await fetch(calendarAPI.GET, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  if (res.status === 200) {
    const data = await res.json();
    if (data.items.length !== 0) {
      return formatEvents(data.items);
    }
    return null;
  } else {
    return null;
  }
};

export const removeEvent = async (eventId) => {
  const res = await fetch(
    calendarAPI.DELETE + eventId + '?key=' + process.env.REACT_APP_API_KEY,
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
      calendarAPI.PATCH + id + '?key=' + process.env.REACT_APP_API_KEY,
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
