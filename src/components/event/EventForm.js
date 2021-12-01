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
  Autocomplete,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { useNavigate } from 'react-router';
import { DashboardContext } from 'src/components/DashboardLayout';
import eventSchema from 'src/utils/schemas/event';
import _ from 'lodash';
import { firebase } from '../../App';

const EventForm = ({ event }) => {
  const { roles } = useContext(DashboardContext);
  const navigate = useNavigate();
  const dateFormat = 'yyyy-MM-DDTHH:mm';

  const formatEvent = (date) => moment(date).format(dateFormat);

  const formik = useFormik({
    initialValues: (() => {
      const evRoles = event?.roles?.map(({ role: roleDoc, ...role }) => ({
        title: roles.find((ro) => ro.roleID === roleDoc.id).title,
        roleID: roleDoc.id,
        shiftStart: formatEvent(role.shiftStart || event?.start),
        shiftEnd: formatEvent(role.shiftEnd || event?.end),
        slots: role.slots,
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
      const firestoreRoles = values.roles?.map((role) => ({
        role: firebase.firestore().collection('roles').doc(role.roleID),
        ..._.pick(role, ['slots', 'shiftStart', 'shiftEnd'])
      }));

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

  const addSlotsToRoles = (__, newRoles) => {
    const merged = newRoles.map((role) => ({
      ...role,
      slots: formik.values.roles?.find((r) => r.roleID === role.roleID)?.slots,
      shiftStart: formatEvent(formik.values.start),
      shiftEnd: formatEvent(formik.values.end),
    }));

    formik.setFieldValue('roles', merged);
  };

  const rolesErr = {
    error: formik.touched?.roles && Boolean(formik.errors?.roles) && typeof formik.errors?.roles === 'string',
    helperText: formik.touched?.roles && formik.errors?.roles
  };

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
                error={formik.touched?.title && Boolean(formik.errors.title)}
                helperText={formik.touched?.title && formik.errors.title}
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
                error={formik.touched?.contact && Boolean(formik.errors.contact)}
                helperText={formik.touched?.contact && formik.errors.contact}
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
                error={formik.touched?.description && Boolean(formik.errors.description)}
                helperText={formik.touched?.description && formik.errors.description}
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
                error={formik.touched?.start && Boolean(formik.errors.start)}
                helperText={formik.touched?.start && formik.errors.start}
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
                error={formik.touched?.end && Boolean(formik.errors.end)}
                helperText={formik.touched?.end && formik.errors.end}
              />
            </Grid>
            <Grid
              item
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
                    error={rolesErr.error}
                    helperText={rolesErr.error && rolesErr.helperText}
                  />
                )}
                isOptionEqualToValue={() => false}
                defaultValue={formik.values.roles}
                onChange={addSlotsToRoles}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <List style={{ padding: 0 }}>
                {formik.values.roles && formik.values.roles?.map(({ title, slots, ...role }, i) => (
                  <Grid>
                    <ListItem>
                      <Grid
                        item
                        lg={1}
                        md={2}
                        xs={4}
                      >
                        <MuiTextField
                          size="small"
                          name={`roles[${i}].slots`}
                          variant="outlined"
                          label="Slots"
                          value={slots}
                          type="number"
                          onChange={formik.handleChange}
                          error={formik.touched?.roles?.at(i) && Boolean(formik.errors?.roles?.at(i)?.slots)}
                          helperText={formik.touched?.roles?.at(i) && formik.errors?.roles?.at(i)?.slots}
                        />
                      </Grid>
                      <Grid
                        item
                        lg={3}
                        md={4}
                        xs={8}
                      >
                        <ListItemText style={{ marginLeft: '1em' }} id={title} primary={`for ${title}`} />
                      </Grid>
                      <Grid
                        item
                        lg={3}
                        md={4}
                        xs={8}
                      >
                        <MuiTextField
                          label="Shift Start"
                          type="datetime-local"
                          fullWidth
                          name={`roles[${i}].shiftStart`}
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          defaultValue={role.shiftStart || formik.values.start}
                          onChange={(dateFromValue) => { formik.setFieldValue(`roles[${i}].shiftStart`, formatEvent(dateFromValue.target.value)); }}
                          error={formik.touched?.roles?.at(i)?.shiftStart && Boolean(formik.errors.roles?.at(i)?.shiftStart)}
                          helperText={formik.touched?.roles?.at(i)?.shiftStart && formik.errors.roles?.at(i)?.shiftStart}
                        />
                      </Grid>
                      <Grid
                        item
                        lg={3}
                        md={4}
                        xs={8}
                        style={{ marginLeft: '1em' }}
                      >
                        <MuiTextField
                          label="Shift End"
                          type="datetime-local"
                          fullWidth
                          name={`roles[${i}].shiftEnd`}
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          defaultValue={role.shiftEnd || formik.values.end}
                          onChange={(dateFromValue) => { formik.setFieldValue(`roles[${i}].shiftEnd`, formatEvent(dateFromValue.target.value)); }}
                          error={formik.touched?.roles?.at(i)?.shiftEnd && Boolean(formik.errors.roles?.at(i)?.shiftEnd)}
                          helperText={formik.touched?.roles?.at(i)?.shiftEnd && formik.errors.roles?.at(i)?.shiftEnd}
                        />
                      </Grid>
                    </ListItem>
                  </Grid>
                ))}
              </List>
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
                error={formik.touched?.locationName && Boolean(formik.errors.locationName)}
                helperText={formik.touched?.locationName && formik.errors.locationName}
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
                error={formik.touched?.locationAddress && Boolean(formik.errors.locationAddress)}
                helperText={formik.touched?.locationAddress && formik.errors.locationAddress}
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
