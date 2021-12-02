import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';
import {
  Users as UsersIcon,
  MapPin as MapPinIcon
} from 'react-feather';
import { useContext } from 'react';
import { DashboardContext } from '../DashboardLayout';

const EventCard = ({ event, ...rest }) => {
  const { roles: contextRoles } = useContext(DashboardContext);
  const roles = event.roles.map((r) => contextRoles.find((cr) => cr.roleID === r.role.id));

  const dateOptions = {
    day: 'numeric',
    month: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  const end = event.end.toLocaleString([], dateOptions);
  const start = event.start.toLocaleString([], dateOptions);

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      {...rest}
    >
      <CardContent>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {event.title}
        </Typography>
        <Typography
          align="left"
          color="textPrimary"
          variant="body1"
          gutterBottom
        >
          {event.description}
        </Typography>
        <Typography
          align="left"
          color="textSecondary"
          variant="body1"
        >
          {start}
          {' '}
          to
          {' '}
          {end}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <MapPinIcon />
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              {event.locationName}
              {' '}
              at
              {' '}
              {event.locationAddress}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <UsersIcon />
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              {event.roles.reduce((val, role) => val + role.slots, 0)}
              {' '}
              slots
              {' '}
              {roles.length > 0 && 'for'}
              {' '}
              {roles.map((role) => role.title).join(', ')}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

EventCard.propTypes = {
  event: PropTypes.object.isRequired
};

export default EventCard;
