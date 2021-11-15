import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box, Container, Grid
} from '@material-ui/core';
import EventCalendar from 'src/components/dashboard/Calendar';
import { DashboardContext } from 'src/components/DashboardLayout';
import RecentRegistrations from '../components/dashboard/RecentRegistrations';

const Dashboard = () => {
  const { events } = useContext(DashboardContext);

  return (
    <>
      <Helmet>
        <title>Dashboard | Iowa Service Dogs VMS</title>
      </Helmet>
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
              <EventCalendar events={events} sx={{ height: '100%' }} />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <RecentRegistrations />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
