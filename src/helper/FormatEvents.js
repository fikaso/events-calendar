import moment from 'moment';

export const formatEvents = (events) => {
  const formatedEvents = events?.map((event) => ({
    title: event.summary,
    start: moment(event.start.dateTime).toISOString(),
    end: moment(event.end.dateTime).toISOString(),
    startDay: moment(event.start.dateTime).format('dddd'),
    endDay: moment(event.end.dateTime).format('dddd'),
    weekOfMonth: Math.ceil(moment(event.start.dateTime).date() / 7),
    id: event.id,
  }));

  const { eventsToday, eventsInWeek, eventsInMonth } =
    sortEvents(formatedEvents);

  if (
    eventsToday.length === 0 &&
    eventsInWeek.length === 0 &&
    eventsInMonth.length === 0
  ) {
    return events[0].id;
  } else {
    return { eventsToday, eventsInWeek, eventsInMonth };
  }
};

const sortEvents = (events) => {
  const now = getCurrentDateTime();

  const eventsToday = filterEventsToday(events, now);
  const eventsInWeek = filterEventsBetweenDates(events, now, 7);
  const eventsInMonth = filterEventsBetweenDates(events, now, 30);

  return { eventsToday, eventsInWeek, eventsInMonth };
};

const getCurrentDateTime = () => moment(new Date(Date.now())).format('L');

const filterEventsToday = (events, now) => {
  return events.filter((events) =>
    moment(now).isSame(moment(events.start).format('L'))
  );
};

const filterEventsBetweenDates = (events, startDate, endDate) => {
  return events.filter((event) =>
    moment(moment(event.start).format('L')).isBetween(
      moment(startDate).format('L'),
      moment(startDate).add(endDate, 'days').format('L'),
      'days',
      '[]'
    )
  );
};

export const groupByDays = (events) => {
  if (!events) {
    return;
  }

  const grouped = {};
  events.forEach((event) => {
    const date = event.startDay;
    if (grouped[date]) {
      grouped[date].push(event);
    } else {
      grouped[date] = [event];
    }
  });
  return grouped;
};

export const groupByWeeks = (events) => {
  if (!events) {
    return;
  }

  const grouped = {};

  events.forEach((event) => {
    const date =
      'WEEK ' + event.weekOfMonth + ' of ' + moment(event.start).format('MMMM');
    if (grouped[date]) {
      grouped[date].push(event);
    } else {
      grouped[date] = [event];
    }
  });
  return grouped;
};
