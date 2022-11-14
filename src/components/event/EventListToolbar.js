import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  SvgIcon,
  Switch
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { Link } from 'react-router-dom';

const EventListToolbar = ({ handleChange, checked, ...props }) => (
  <Box {...props}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <Button
        component={Link}
        to="/app/events/new"
        color="primary"
        variant="contained"
      >
        Add event
      </Button>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Grid item>
              <Box sx={{ maxWidth: 500 }}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Search event"
                  variant="outlined"
                />
              </Box>
            </Grid>
            <Grid item>
              <Typography
                color="textPrimary"
                variant="h5"
              >
                Show past events
                <Switch
                  size="large"
                  checked={checked}
                  onChange={(ev) => handleChange(ev.target.checked)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default EventListToolbar;
