import {
  TableRow,
  TableCell
} from '@material-ui/core';

const VolunteerRow = ({
  user, role, registered, actionButton, registrationID
}) => (
  <TableRow
    hover
    key={registrationID}
  >
    <TableCell>
      {[user.firstName, user.lastName].join(' ')}
    </TableCell>
    <TableCell>
      {role.title}
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
