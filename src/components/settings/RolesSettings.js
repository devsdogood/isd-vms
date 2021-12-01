import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from '@material-ui/core';
import _ from 'lodash';
import { FormikProvider, useFormik } from 'formik';
import { useContext } from 'react';
import rolesSchema from 'src/utils/schemas/roles';
import { LoadingButton } from '@material-ui/lab';
import { isGlobalRole } from 'src/utils/roles/getEventRoles';
import { DashboardContext } from '../DashboardLayout';
import { firebase } from '../../App';

const RolesSettings = () => {
  const { roles: contextRoles } = useContext(DashboardContext);
  const roles = contextRoles.filter(isGlobalRole);

  const updateRoles = async (values) => {
    const deletedRoles = _.differenceWith(roles, values.roles, _.isEqual);
    const newRoles = _.differenceWith(values.roles, roles, _.isEqual);

    await Promise.all(deletedRoles.map((r) => firebase.firestore().collection('roles').doc(r.roleID).set({
            deleted: true,
        }, { merge: true })));

    await Promise.all(newRoles.map((r) => firebase.firestore().collection('roles').add({
            title: r.title,
            deleted: false,
            event: null,
        })));
  };

  const formik = useFormik({
    initialValues: {
        roles,
    },
    validationSchema: rolesSchema,
    onSubmit: updateRoles,
    enableReinitialize: true,
  });

  const addRole = (__, ___, action, { option }) => {
    if (action === 'createOption') {
        formik.setFieldValue('roles', formik.values.roles.concat([{
            title: option,
        }]));
    } else if (action === 'removeOption') {
        const newRoles = formik.values.roles.filter((role) => role.title !== option.title);
        formik.setFieldValue('roles', newRoles);
    }
  };

  const rolesErr = {
    error: formik.touched?.roles && Boolean(formik.errors?.roles) && typeof formik.errors?.roles === 'string',
    helperText: formik.touched?.roles && formik.errors?.roles
  };

  return (
    <FormikProvider value={formik}>
      <Card>
        <CardHeader subheader="Add or delete roles" title="Roles" />
        <Divider />
        <CardContent>
          <Autocomplete
            multiple
            freeSolo
            getOptionLabel={(option) => option.title}
            options={formik.values.roles}
            open={false}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Event Roles"
                fullWidth
                error={rolesErr.error}
                helperText={rolesErr.error && rolesErr.helperText}
              />
            )}
            value={formik.values.roles}
            onChange={addRole}
          />
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <LoadingButton
            color="primary"
            variant="contained"
            loading={formik.isSubmitting}
            onClick={formik.submitForm}
          >
            Update
          </LoadingButton>
        </Box>
      </Card>
    </FormikProvider>
  );
};

export default RolesSettings;
