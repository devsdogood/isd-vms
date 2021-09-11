import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton
} from '@material-ui/core';
import {
  PlusCircle,
  Trash2
} from 'react-feather';
import moment from 'moment';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { firebase } from 'src/App';
import { DashboardContext } from '../DashboardLayout';
import VolunteerRow from './VolunteerRow';

const VolunteerList = ({ isRegistered, eventID }) => {
  const { users, eventSignups, roles } = useContext(DashboardContext);

  // Filter eventSignups for this event
  const signups = eventSignups.filter((s) => s.deleted !== isRegistered
    && s.event.id === eventID);

  const updateSignup = (signupID) => {
    firebase.firestore().collection('eventSignups').doc(signupID).set({
      deleted: isRegistered
    }, {
      merge: true,
    });
  };

  const RemoveButton = ({ signupID }) => (
    <IconButton onClick={() => updateSignup(signupID)}>
      <Trash2 color="red" />
    </IconButton>
  );

  const RestoreButton = ({ signupID }) => (
    <IconButton onClick={() => updateSignup(signupID)}>
      <PlusCircle color="green" />
    </IconButton>
  );

  return (
    <Card>
      <CardHeader title={`Event ${isRegistered ? 'Registrations' : 'Removals'}`} />
      <Divider />
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Volunteer
                </TableCell>
                <TableCell>
                  Role
                </TableCell>
                <TableCell>
                  Date Registered
                </TableCell>
                <TableCell>
                  {isRegistered ? 'Remove' : 'Restore'}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {signups.map((signup) => (
                <VolunteerRow
                  key={signup.signupID}
                  user={users.find((v) => v.userID === signup.volunteer.id)}
                  role={roles.find((r) => r.roleID === signup.role.id)}
                  registered={moment(signup.registered).format('MM/DD/YY')}
                  actionButton={isRegistered
                    ? <RemoveButton signupID={signup.signupID} />
                    : <RestoreButton signupID={signup.signupID} />}
                />
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

VolunteerList.propTypes = {
  isRegistered: PropTypes.bool,
};

VolunteerList.defaultProps = {
  isRegistered: true,
};

export default VolunteerList;
