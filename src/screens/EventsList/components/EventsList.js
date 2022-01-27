import { useState } from 'react';
import { useSelector } from 'react-redux';
import FormComponent from '../../../components/Modal/components/Form';
import Modal from '../../../components/Modal/containers/Form';
import InputPopup from '../../../components/Popup/InputPopup';
import { displayView } from '../../../data/viewEnums';
import { selectViewDays } from '../../../redux/viewSlice';
import Event from './Event/containers/Event';
import EventsGroup from './EventsGroup/components/EventsGroup';

function EventsListComponent({ events, editMode, toogleEdit }) {
  const viewDays = useSelector(selectViewDays);

  const getEventsView = (events, kindOfView) => {
    if (!events) {
      return;
    }
    if (kindOfView === displayView.DAY) {
      return (
        <>
          {events?.map((event) => (
            <Event
              key={event.id}
              title={event.title}
              start={event.start}
              end={event.end}
              startDay={event.startDay}
              endDay={event.endDay}
              id={event.id}
            />
          ))}
        </>
      );
    } else {
      return (
        <>
          {Object.keys(events)?.map((groupName, count) => (
            <EventsGroup
              events={events[groupName]}
              groupName={groupName}
              key={count}
            />
          ))}
        </>
      );
    }
  };

  return (
    <>
      <div className="flex flex-col items-center w-full">
        {editMode ? (
          <InputPopup>
            <Modal />
          </InputPopup>
        ) : (
          <button
            className="button-default button clay px-20 py-6"
            onClick={() => toogleEdit()}
          >
            Add Event
          </button>
        )}

        {events && getEventsView(events, viewDays)}
      </div>
    </>
  );
}

export default EventsListComponent;
