import { useContext } from 'react';
import moment from 'moment';
import { useFormik, FormikProvider } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField as MuiTextField,
  Autocomplete
} from '@material-ui/core';
import { useNavigate } from 'react-router';
import equal from 'deep-equal';
import { DashboardContext } from 'src/components/DashboardLayout';
import eventSchema from 'src/utils/schemas/event';
import { firebase } from '../../App';

const EventForm = ({ event }) => {
  const { roles } = useContext(DashboardContext);
  const navigate = useNavigate();
  const dateFormat = 'yyyy-MM-DDTHH:mm';

  const formatEvent = (date) => moment(date).format(dateFormat);

  const formik = useFormik({
    initialValues: (() => {
      const evRoles = event?.roles?.map((r) => ({
        title: roles.find((ro) => ro.roleID === r.id).title,
        roleID: r.id
      }));
      return {
        ...event,
        start: formatEvent(event?.start),
        end: formatEvent(event?.end),
        roles: evRoles,
      };
    })(),
    validationSchema: eventSchema,
    onSubmit: async (values, { setErrors }) => {
      const firestoreRoles = values.roles.map((roleOption) => firebase.firestore().collection('roles').doc(roleOption.roleID));
      const firestoreVals = {
        ...values,
        roles: firestoreRoles,
        start: new Date(values.start),
        end: new Date(values.end),
      };

      try {
        await firebase.firestore().collection('events').doc(values.eventID).set(firestoreVals);

        if (!event.eventID) navigate('/app/events/');
      } catch (err) {
        setErrors(err);
      }
    },
    enableReinitialize: true,
  });

  return (
    <FormikProvider value={formik}>
      <Card>
        <CardHeader
          subheader="Edit information about the event"
          title="Event Details"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <MuiTextField
                fullWidth
                name="title"
                variant="outlined"
                label="Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <MuiTextField
                fullWidth
                name="contact"
                variant="outlined"
                label="Contact Name"
                value={formik.values.contact}
                onChange={formik.handleChange}
                error={formik.touched.contact && Boolean(formik.errors.contact)}
                helperText={formik.touched.contact && formik.errors.contact}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <MuiTextField
                multiline
                rows={4}
                fullWidth
                name="description"
                variant="outlined"
                label="Event Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>
            <Grid
              item
              sm={6}
              xs={12}
            >
              <MuiTextField
                label="Event Start"
                type="datetime-local"
                fullWidth
                name="start"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={formik.values.start}
                onChange={(dateFromValue) => { formik.setFieldValue('start', formatEvent(dateFromValue.target.value)); }}
                error={formik.touched.start && Boolean(formik.errors.start)}
                helperText={formik.touched.start && formik.errors.start}
              />
            </Grid>
            <Grid
              item
              sm={6}
              xs={12}
            >
              <MuiTextField
                label="Event End"
                type="datetime-local"
                fullWidth
                name="end"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={formik.values.end}
                onChange={(dateFromValue) => { formik.setFieldValue('end', formatEvent(dateFromValue.target.value)); }}
                error={formik.touched.end && Boolean(formik.errors.end)}
                helperText={formik.touched.end && formik.errors.end}
              />
            </Grid>
            <Grid
              item
              sm={6}
              xs={12}
            >
              <Autocomplete
                multiple
                options={roles}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <MuiTextField
                    {...params}
                    label="Event Roles"
                    fullWidth
                    error={formik.touched.roles && Boolean(formik.errors.roles)}
                    helperText={formik.touched.roles && formik.errors.roles}
                  />
                )}
                isOptionEqualToValue={equal}
                defaultValue={formik.values.roles}
                onChange={(_, value) => formik.setFieldValue('roles', value)}
              />
            </Grid>
            <Grid
              item
              sm={6}
              xs={12}
            >
              <MuiTextField
                label="Volunteer Slots"
                fullWidth
                name="slots"
                variant="outlined"
                type="number"
                defaultValue={formik.values.slots}
                onChange={formik.handleChange}
                error={formik.touched.slots && Boolean(formik.errors.slots)}
                helperText={formik.touched.slots && formik.errors.slots}
              />
            </Grid>
            <Grid
              item
              sm={6}
              xs={12}
            >
              <MuiTextField
                label="Location Name"
                fullWidth
                name="locationName"
                variant="outlined"
                defaultValue={formik.values.locationName}
                onChange={formik.handleChange}
                error={formik.touched.locationName && Boolean(formik.errors.locationName)}
                helperText={formik.touched.locationName && formik.errors.locationName}
              />
            </Grid>
            <Grid
              item
              sm={6}
              xs={12}
            >
              <MuiTextField
                label="Location Address"
                fullWidth
                name="locationAddress"
                variant="outlined"
                defaultValue={formik.values.locationAddress}
                onChange={formik.handleChange}
                error={formik.touched.locationAddress && Boolean(formik.errors.locationAddress)}
                helperText={formik.touched.locationAddress && formik.errors.locationAddress}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
            onClick={formik.submitForm}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </FormikProvider>
  );
};

export default EventForm;
