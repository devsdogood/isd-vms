import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const localizer = momentLocalizer(moment);

const EventCalendar = ({ events }) => {
  const navigate = useNavigate();

  const eventOpened = (event) => {
    navigate(`/app/events/${event.eventID}`);
  };

  const eventStyleGetter = (event) => {
    const backgroundColor = events.includes(event.eventID) ? 'gray' : '#AC2725';

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
        events={events || []}
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
