import { useContext, useState } from 'react';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { DashboardContext } from 'src/components/DashboardLayout';
import { firebase } from 'src/App';

export const roleToString = (role) => `${role.title} (${moment(role.shiftStart).format('hh:mm A')} - ${moment(role.shiftEnd).format('hh:mm A')})`;

const EventDetails = ({ event }) => {
  const EVENT_STATUS = [
    {
      text: 'pending',
      color: 'orange',
    },
    {
      text: 'approved',
      color: 'green',
    },
  ];

  const { usersEventSignups, roles, userData } = useContext(DashboardContext);
  const eventRoles = event?.roles?.map(({ role, ...rest }) => ({
    title: roles.find((ro) => ro.roleID === role.id).title,
    roleID: role.id,
    ...rest,
  }));

  const usersSignup = usersEventSignups.find((signup) => signup.event === event.eventID);
  const isSignedUp = !!usersSignup;

  const [currentRole, setCurrentRole] = useState(isSignedUp && usersSignup?.role);
  const [eventErr, setEventErr] = useState();

  const dateFormat = 'dddd, MMMM Do YYYY hh:mm a';
  const formatEvent = (date) => moment(date).format(dateFormat);

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleUnregister = async () => {
    await firebase.firestore().collection('eventSignups').doc(usersSignup.signupID).set({
      deleted: true
    }, { merge: true });

    return setDialogOpen(false);
  };

  const handleRegister = async () => {
    if (isSignedUp) {
      return setEventErr('Already signed up for this event');
    }

    if (eventRoles.map((r) => r.roleID).indexOf(currentRole.roleID) === -1) {
      return setEventErr('Must select a valid event');
    }

    setEventErr('');
    await firebase.firestore().collection('eventSignups').add({
      deleted: false,
      event: event.eventID,
      registered: new Date(),
      role: currentRole.roleID,
      shiftStart: currentRole.shiftStart,
      shiftEnd: currentRole.shiftEnd,
      volunteer: userData.userID,
      status: 0,
    });

    return true;
  };

  const StatusComponent = () => (
    <Grid
      item
      sm={4}
      xs={12}
    >
      <Typography variant="body1">
        Your registration is
        <Typography variant="body1" display="inline" color={EVENT_STATUS[usersSignup.status || 0].color}>
          {' '}
          {EVENT_STATUS[usersSignup.status || 0].text}
          {' '}
        </Typography>
        for this event
      </Typography>
    </Grid>
  );

  const handleAddRole = (e) => setCurrentRole(
    eventRoles.find((ev) => roleToString(ev) === e.target.value)
  );

  return (
    <>
      <Card>
        <CardHeader
          subheader={`${formatEvent(event.start)} to ${formatEvent(event.end)}`}
          title={event.title}
        />
        <Divider />
        <CardContent>
          <Typography>{event.description}</Typography>
          <br />
          <Typography variant="body2" display="inline" paddingLeft>
            Location:
            {' '}
            {event.locationAddress}
            {' '}
            (
            {event.locationName}
            )
          </Typography>
          <br />
          <Typography variant="body2" display="inline" paddingLeft>
            Contact:
            {' '}
            {event.contact}
          </Typography>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              sm={4}
              xs={12}
            >
              <FormControl fullWidth error={eventErr} disabled={isSignedUp}>
                <InputLabel id="event-roles-dropdown-select-label">Role</InputLabel>
                <Select
                  labelId="event-roles-dropdown-select-label"
                  id="event-roles-dropdown-select"
                  label="Role"
                  value={roleToString(currentRole) || ''}
                  size="small"
                  onChange={handleAddRole}
                >
                  {eventRoles.map((role) => <MenuItem value={roleToString(role)}>{roleToString(role)}</MenuItem>)}
                </Select>
                <FormHelperText>{eventErr}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid
              item
              sm={4}
              xs={12}
            >
              <Button
                color={isSignedUp ? 'error' : 'success'}
                variant="contained"
                type="submit"
                onClick={isSignedUp ? () => setDialogOpen(true) : handleRegister}
              >
                {isSignedUp ? 'Unregister' : 'Register'}
              </Button>
            </Grid>
            {isSignedUp && <StatusComponent />}
          </Grid>
        </Box>
      </Card>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <h2>Are you sure?</h2>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This cannot be undone. If you choose to register again you will need to
            be reapproved.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUnregister} autoFocus>
            Unregister
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EventDetails;
