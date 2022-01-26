import moment from 'moment';

export const groupByDays = (events) => {
  const grouped = {};
  events.forEach((event) => {
    const date = moment(event.start).format('L');
    if (grouped[date]) {
      grouped[date].push(event);
    } else {
      grouped[date] = [event];
    }
  });
  return grouped;
};

export const groupByWeeks = (events) => {
  const grouped = {};

  events.forEach((event) => {
    const date = event.weekOfMonth;
    if (grouped[date]) {
      grouped[date].push(event);
    } else {
      grouped[date] = [event];
    }
  });
  return grouped;
};
