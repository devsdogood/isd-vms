import { Helmet } from 'react-helmet';
import { Box, Button } from '@material-ui/core';
import { CSVLink } from 'react-csv';
import { useContext } from 'react';
import { DashboardContext } from 'src/components/DashboardLayout';

const SettingsView = () => {
  const {
    eventSignups, roles, events, users
  } = useContext(DashboardContext);
  const filteredSignups = eventSignups.filter((signup) => !signup.deleted);

  const signups = filteredSignups.map((signup) => ({
    ...signup,
    role: roles.find((role) => role.roleID === signup.role).title,
    volunteer: users.find((user) => user.userID === signup.volunteer).firstName,
    event: events.find((event) => event.eventID === signup.event).title,
  }));

  return (
    <>
      <Helmet>
        <title>Settings | Iowa Service Dogs VMS</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <CSVLink data={signups}>
          <Button>Generate Event Reports</Button>
        </CSVLink>
      </Box>
    </>
  );
};

export default SettingsView;
