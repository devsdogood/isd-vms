import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import getInitials from '../../utils/getInitials';

const AccountProfile = ({ user, fullName, ...props }) => (
  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          sx={{
            height: 100,
            width: 100
          }}
        >
          {getInitials(fullName)}
        </Avatar>
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h3"
        >
          {fullName}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          {`${user.city}, ${user.state}`}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
  </Card>
);

export default AccountProfile;
