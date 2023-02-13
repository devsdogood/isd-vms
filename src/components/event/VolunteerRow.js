import {
  TableRow,
  TableCell
} from '@material-ui/core';
import moment from 'moment';

const VolunteerRow = ({
  user, signup, role, registered, actionButton, registrationID
}) => (
  <TableRow
    hover
    key={registrationID}
  >
    <TableCell>
      {[user?.firstName, user?.lastName].join(' ')}
    </TableCell>
    <TableCell>
      {role.title}
      {' '}
      from
      {' '}
      {moment(signup.shiftStart).format('h:mm a')}
      {' '}
      to
      {' '}
      {moment(signup.shiftEnd).format('h:mm a')}
    </TableCell>
    <TableCell>
      {registered}
    </TableCell>
    <TableCell>
      {actionButton}
    </TableCell>
  </TableRow>
);

export default VolunteerRow;
