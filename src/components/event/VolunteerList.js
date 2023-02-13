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
  IconButton
} from '@material-ui/core';
import {
  PlusCircle,
  Trash2
} from 'react-feather';
import moment from 'moment';
import { useContext, useRef } from 'react';
import { CSVLink } from 'react-csv';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { firebase } from 'src/App';
import { singleEventReport } from 'src/utils/reports/events';
import { DashboardContext } from '../DashboardLayout';
import VolunteerRow from './VolunteerRow';

const VolunteerList = ({ isRegistered, eventID }) => {
  const {
    users, eventSignups, roles, events,
  } = useContext(DashboardContext);

  const csvLink = useRef();

  // Filter eventSignups for this event
  const signups = eventSignups.filter((s) => s.deleted !== isRegistered
    && s.event === eventID);

  const event = events.find((e) => e.eventID === eventID);

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

  const reportData = singleEventReport(event, roles, signups, users);

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
                  signup={signup}
                  user={users.find((v) => v.userID === signup.volunteer)}
                  role={roles.find((r) => r.roleID === signup.role)}
                  registered={moment(signup.registered).format('MM/DD/YY')}
                  actionButton={isRegistered
                    ? <RemoveButton signupID={signup.signupID} />
                    : <RestoreButton signupID={signup.signupID} />}
                />
              ))}
            </TableBody>
          </Table>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <CSVLink
            data={reportData}
            filename={`${event.title}.csv`}
            ref={csvLink}
            target="_blank"
          >
            <Button
              color="primary"
              variant="contained"
            >
              Download
            </Button>
          </CSVLink>
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
