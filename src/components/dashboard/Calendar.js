import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const localizer = momentLocalizer(moment);

const EventCalendar = ({ events }) => {
  const navigate = useNavigate();
  const [modifiedEvents, setModifiedEvents] = useState(null);

  useEffect(() => {
    if (modifiedEvents !== null) return;

    setModifiedEvents(events?.map((e) => ({
      ...e,
      start: e.start.toDate(),
      end: e.end.toDate(),
    })));
  }, [events]);

  const eventOpened = (event) => {
    navigate(`/app/events/${event.eventID}`);
  };

  const eventStyleGetter = (event) => {
    const backgroundColor = events.includes(event.eventID) ? 'gray' : '#3f51b5';

    const style = {
      backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    };
    return {
      style
    };
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={modifiedEvents || []}
        defaultView="week"
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={eventOpened}
        views={['day', 'week', 'month']}
        eventPropGetter={(eventStyleGetter)}
      />
    </div>
  );
};

export default EventCalendar;
