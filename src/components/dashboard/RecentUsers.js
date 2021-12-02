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
import { getFullName } from 'src/utils/reports/users';

const RecentUsers = ({ ...props }) => {
  const { users: contextUsers } = useContext(DashboardContext);
  const users = contextUsers.filter((user) => !user.isAdmin && !user.active);

  const changeStatus = async (user, activate) => {
    await firebase.firestore().collection('users')
      .doc(user.userID)
      .set({
        active: activate,
      }, { merge: true });
  };

  return (
    <Card {...props}>
      <CardHeader title="Unactivated Accounts" subheader="User who have just signed up or been deactivated by an admin" />
      <Divider />
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  User
                </TableCell>
                <TableCell>
                  Registered
                </TableCell>
                <TableCell>
                  Activate
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  hover
                  key={user.userID}
                >
                  <TableCell>
                    <Link to={`/app/users/${user.userID}`}>
                      {getFullName(user)}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {moment(user.registered).format('MM/DD/YYYY')}
                  </TableCell>
                  <TableCell>
                    <Box mr={2} display="inline">
                      <Button variant="contained" color="success" onClick={() => changeStatus(user, true)}>Activate</Button>
                    </Box>
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

export default RecentUsers;
