import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import getInitials from '../../utils/getInitials';

const UserListResults = ({ users, ...rest }) => (
  <Card {...rest}>
    <PerfectScrollbar>
      <Box sx={{ minWidth: 1050 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Birthday
              </TableCell>
              <TableCell>
                T-shirt Size
              </TableCell>
              <TableCell>
                Address
              </TableCell>
              <TableCell>
                Phone
              </TableCell>
              <TableCell>
                User Level
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(0).map((user) => (
              <TableRow
                hover
                key={user.userID}
                selected={false}
                as={Link}
                to={`/app/users/${user.userID}`}
              >
                <TableCell>
                  <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                  >
                    <Avatar
                      sx={{ mr: 2 }}
                    >
                      {getInitials([user.firstName, user.lastName].join(' '))}
                    </Avatar>
                    <Typography
                      color="textPrimary"
                      variant="body1"
                    >
                      {[user.firstName, user.lastName].join(' ')}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  {moment(user.birthday.toDate()).format('MM/DD/YYYY')}
                </TableCell>
                <TableCell>
                  {user.shirtSize}
                </TableCell>
                <TableCell>
                  {`${user.address1 || user.address2} ${user.city}, ${user.state}, ${user.zip}`}
                </TableCell>
                <TableCell>
                  {user.phone}
                </TableCell>
                <TableCell>
                  {user.isAdmin ? 'Admin' : 'Volunteer'}
                </TableCell>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
  </Card>
);

UserListResults.propTypes = {
  users: PropTypes.array.isRequired
};

export default UserListResults;
