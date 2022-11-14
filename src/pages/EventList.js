import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import { DashboardContext } from 'src/components/DashboardLayout';
import * as _ from 'lodash';
import EventListToolbar from '../components/event/EventListToolbar';
import EventCard from '../components/event/EventCard';

const EventList = () => {
  let { events } = useContext(DashboardContext);
  const [showPast, setShowPast] = useState(false);

  events = _.orderBy(events, ['start'], ['desc']);
  if (!showPast) {
    // filter events that started before current date
    events = events.filter((e) => new Date(e.start) > new Date());
  }

  return (
    <>
      <Helmet>
        <title>Events | Iowa Service Dogs VMS</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <EventListToolbar
            checked={showPast}
            handleChange={setShowPast}
          />
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {events.map((event) => (
                <Grid
                  item
                  key={event.id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <Link to={`/app/events/${event.eventID}`}>
                    <EventCard event={event} />
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default EventList;
