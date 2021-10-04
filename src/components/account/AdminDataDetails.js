import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from '@material-ui/core';
import LoadingButton from '@mui/lab/LoadingButton';
import { FormikProvider, useFormik } from 'formik';

const AdminDataDetails = ({ adminData, ...props }) => {
  const formik = useFormik({
    initialValues: adminData,
    enableReinitialize: true,
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
            />
          </FormikProvider>
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
