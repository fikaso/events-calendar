import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

function CalendarComponent({ events, addEvent }) {
  return (
    <>
      {events && (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          displayEventTime={true}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: 'false',
            hour12: false,
          }}
          displayEventEnd={true}
          eventBackgroundColor="#5ebf8e"
          eventColor="#4ce297"
          eventDisplay="block"
          headerToolbar={{
            start: 'addEventButton',
            center: 'title',
            end: 'today prev,next dayGridDay,dayGridWeek,dayGridMonth',
          }}
          customButtons={{
            addEventButton: {
              text: 'Add Event',
              click: () => addEvent(),
            },
          }}
        />
      )}
    </>
  );
}

export default CalendarComponent;
