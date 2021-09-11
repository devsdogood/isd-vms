import { useContext } from 'react';
import {
  Grid,
  Container,
  Box
} from '@material-ui/core';
import { useParams } from 'react-router';
import EventForm from 'src/components/event/EventForm';
import VolunteerList from 'src/components/event/VolunteerList';
import { DashboardContext } from 'src/components/DashboardLayout';

const EventView = () => {
  const { event: eventParam } = useParams();
  const { events, eventSignups } = useContext(DashboardContext);
  const event = events.find((e) => e.eventID === eventParam);
  const numRemovals = eventSignups.filter((signup) => signup.event.id === event.eventID && signup.deleted).length;

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <EventForm
              event={event}
            />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <VolunteerList
              isRegistered
              eventID={event.eventID}
            />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            {numRemovals > 0 && (
            <VolunteerList
              isRegistered={false}
              eventID={event.eventID}
            />
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default EventView;
