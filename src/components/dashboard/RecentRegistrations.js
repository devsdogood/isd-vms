import { useContext } from 'react';
import { DashboardContext } from 'src/components/DashboardLayout';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { firebase } from 'src/App';

const RecentRegistrations = ({ ...props }) => {
  const {
    users, roles, events, eventSignups
  } = useContext(DashboardContext);

  const signups = eventSignups.filter((signup) => signup.status === 0);

  const changeStatus = async (status, signup) => {
    await firebase.firestore().collection('eventSignups')
      .doc(signup.signupID)
      .set({
        status,
      }, { merge: true });
  };

  const approveSignup = async (signup) => changeStatus(1, signup);
  const denySignup = async (signup) => changeStatus(-1, signup);

  const getEvent = (signup) => events.find((event) => event.eventID === signup.event);
  const getUser = (signup) => users.find((user) => user.userID === signup.volunteer);
  const getRole = (signup) => roles.find((role) => role.roleID === signup.role);

  return (
    <Card {...props}>
      <CardHeader title="Recent Event Registrations" />
      <Divider />
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Event
                </TableCell>
                <TableCell>
                  User
                </TableCell>
                <TableCell>
                  Role
                </TableCell>
                <TableCell>
                  Registered
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {signups.map((signup) => (
                <TableRow
                  hover
                  key={signup.signupID}
                >
                  <TableCell>
                    <Link to={`/app/events/${getEvent(signup).eventID}`}>{getEvent(signup).title}</Link>
                  </TableCell>
                  <TableCell>
                    <Link to={`/app/users/${getUser(signup).userID}`}>
                      {[getUser(signup).firstName, getUser(signup).lastName].join(' ')}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {getRole(signup).title}
                  </TableCell>
                  <TableCell>
                    {moment(signup.registered).format('MM/DD/YYYY')}
                  </TableCell>
                  <TableCell>
                    <Box mr={2} display="inline">
                      <Button variant="contained" color="success" onClick={() => approveSignup(signup)}>Approve</Button>
                    </Box>
                    <Button variant="contained" color="error" onClick={() => denySignup(signup)}>Deny</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

export default RecentRegistrations;
