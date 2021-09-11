import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import { DashboardContext } from 'src/components/DashboardLayout';
import EventListToolbar from '../components/event/EventListToolbar';
import EventCard from '../components/event/EventCard';

const EventList = () => {
  const { events } = useContext(DashboardContext);

  return (
    <>
      <Helmet>
        <title>Events | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <EventListToolbar />
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
