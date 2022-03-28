import { useContext } from 'react';
import {
  Grid,
  Container,
  Box
} from '@material-ui/core';
import { useParams } from 'react-router';
import { DashboardContext } from 'src/components/DashboardLayout';
import EventDetails from 'src/components/event/EventDetails';

const VolunteerEventView = () => {
  const { event: eventParam } = useParams();
  const { events } = useContext(DashboardContext);
  const event = events.find((e) => e.eventID === eventParam);

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
            <EventDetails event={event} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default VolunteerEventView;
