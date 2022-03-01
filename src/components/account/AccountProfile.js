import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Snackbar,
  Typography
} from '@material-ui/core';
import ManageAccountsIcon from '@material-ui/icons/ManageAccounts';
import { useState } from 'react';
import { firebase } from 'src/App';
import getInitials from '../../utils/getInitials';

const AccountProfile = ({ user, fullName, ...props }) => {
  const [passwordResetOpen, setPasswordResetOpen] = useState(false);
  const resetPassword = async () => {
    await firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email);
    setPasswordResetOpen(true);
  };

  return (
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
          <Typography color="textPrimary" gutterBottom variant="h3">
            {fullName}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`${user.city}, ${user.state}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Button startIcon={<ManageAccountsIcon />} onClick={resetPassword}>
          Reset password
        </Button>
        <Snackbar
          open={passwordResetOpen}
          message="Password reset email sent"
        />
      </Box>
    </Card>
  );
};

export default AccountProfile;
