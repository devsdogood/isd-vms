import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import moment from 'moment';
import EventForm from 'src/components/event/EventForm';

const NewEvent = () => (
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
            event={{
              start: moment().minutes(0).seconds(0).milliseconds(0)
                .add(1, 'hours'),
              end: moment().minutes(0).seconds(0).milliseconds(0)
                .add(2, 'hours')
            }}
          />
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default NewEvent;
