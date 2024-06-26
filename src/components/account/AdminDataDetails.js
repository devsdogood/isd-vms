import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  List,
  ListItem,
  Checkbox,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Autocomplete,
  Typography
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { FormikProvider, useFormik } from 'formik';
import { useContext } from 'react';
import adminDataSchema, { trainings } from 'src/utils/schemas/adminData';
import equal from 'deep-equal';
import { firebase } from 'src/App';
import { DashboardContext } from '../DashboardLayout';

const ViewDocument = ({ url }) => (
  url
    && <a href={url} target="_blank" rel="noreferrer">View document</a>
);

const AdminDataDetails = ({ adminData, ...props }) => {
  const { roles } = useContext(DashboardContext);
  const userRoles = adminData?.roles?.map((r) => ({
    title: roles.find((ro) => ro.roleID === r.id).title,
    roleID: r.id
  }));

  const toggleActive = async () => {
    await firebase.firestore().collection('users')
      .doc(adminData.userID)
      .set({
        active: !props.active,
      }, { merge: true });
  };

  const formik = useFormik({
    initialValues: {
      ...adminData,
      roles: userRoles,
    },
    validationSchema: adminDataSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setStatus }) => {
      const firestoreRoles = values.roles.map((roleOption) => firebase.firestore().collection('roles').doc(roleOption.roleID));
      const doc = firebase.firestore().collection('adminUserData').doc(adminData.userID);

      try {
        await doc.set({
          ...values,
          roles: firestoreRoles,
        }, { merge: true });
      } catch (err) {
        setStatus({
          firebaseErr: err,
        });
      }
    },
  });

  return (
    <form
      autoComplete="off"
      {...props}
    >
      <Card>
        <CardHeader
          subheader="Admin-exclusive user data"
          title="Admin Data"
        />
        <Divider />
        <CardContent>
          <FormikProvider
            value={formik}
          >
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  name="liabilityWaiver"
                  variant="outlined"
                  label="Liability Waiver Link"
                  {...formik.getFieldProps('liabilityWaiver')}
                  error={formik.touched.liabilityWaiver && Boolean(formik.errors.liabilityWaiver)}
                  helperText={formik.touched.liabilityWaiver && formik.errors.liabilityWaiver}
                />
                <ViewDocument url={adminData.liabilityWaiver} />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  name="volunteerApplication"
                  variant="outlined"
                  label="Volunteer Application Link"
                  {...formik.getFieldProps('volunteerApplication')}
                  error={formik.touched.volunteerApplication && Boolean(formik.errors.volunteerApplication)}
                  helperText={formik.touched.volunteerApplication && formik.errors.volunteerApplication}
                />
                <ViewDocument url={adminData.volunteerApplication} />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <Typography
                  color="textPrimary"
                  variant="h5"
                >
                  Trainings
                </Typography>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  {
                    Object.entries(trainings).map(([k, v]) => (
                      <ListItem style={{ padding: 0 }}>
                        <ListItemButton role={undefined} onClick={() => formik.setFieldValue(`trainings.${k}`, !formik.values.trainings[k])} dense>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={formik.values.trainings[k]}
                              tabIndex={-1}
                              disableRipple
                            />
                          </ListItemIcon>
                          <ListItemText id={v} primary={v} />
                        </ListItemButton>
                      </ListItem>
                    ))
                }
                </List>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <Autocomplete
                  multiple
                  options={roles}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="User's Roles"
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
            </Grid>
          </FormikProvider>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <LoadingButton
            color={props.active ? 'error' : 'success'}
            variant="contained"
            onClick={toggleActive}
            style={{ marginRight: '1em' }}
          >
            {props.active ? 'deactivate' : 'activate'}
            {' '}
            account
          </LoadingButton>
          <LoadingButton
            loading={formik.isSubmitting}
            color="primary"
            variant="contained"
            onClick={formik.submitForm}
          >
            Save details
          </LoadingButton>
        </Box>
      </Card>
    </form>
  );
};

export default AdminDataDetails;
