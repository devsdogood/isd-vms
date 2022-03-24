import moment from 'moment';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { useFormik } from 'formik';
import { firebase } from 'src/App';
import userSchema from '../../utils/schemas/user';
import AccountForm from './AccountForm';

const AccountProfileDetails = ({ user, ...props }) => {
  const callback = async (values, { setStatus }) => {
    const birthdate = moment(values.birthday, 'YYYY-MM-DD').toDate();
    const doc = firebase.firestore().collection('users').doc(user.userID);

    try {
      await doc.set({
        ...values,
        birthday: birthdate,
      }, { merge: true });
    } catch (err) {
      setStatus({
        firebaseErr: err,
      });
    }
  };

  const formik = useFormik({
    initialValues: user,
    validationSchema: userSchema,
    enableReinitialize: true,
    onSubmit: callback
  });

  return (
    <form
      autoComplete="off"
      {...props}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <AccountForm formik={formik} />
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

export default AccountProfileDetails;
