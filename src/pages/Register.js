import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useFormik } from 'formik';
import {
  Box,
  Container,
  Typography,
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import moment from 'moment';
import firebase from 'firebase';
import * as _ from 'lodash';
import { userSchemaWithPassword } from '../utils/schemas/user';
import AccountForm from '../components/account/AccountForm';

const Register = () => {
  const navigate = useNavigate();

  const callback = async (values, { setStatus }) => {
    let user;
    try {
      user = await firebase.auth().createUserWithEmailAndPassword(values.email, values.password);
    } catch (err) {
      return setStatus({
        firebaseErr: err
      });
    }

    const birthdate = moment(values.birthday, 'YYYY-MM-DD').toDate();
    const doc = firebase.firestore().collection('users').doc(user.user.uid);

    try {
      const filtered = _.omit(values, ['password', 'confirmPassword']);

      await doc.set({
        ...filtered,
        birthday: birthdate,
        isAdmin: false,
        active: false,
        userID: user.user.uid
      }, { merge: true });
    } catch (err) {
      return setStatus({
        firebaseErr: err,
      });
    }

    return navigate('/app');
  };

  const formik = useFormik({
    initialValues: { state: 'Iowa' },
    validationSchema: userSchemaWithPassword,
    enableReinitialize: true,
    onSubmit: callback,
  });

  return (
    <>
      <Helmet>
        <title>Register | Iowa Service Dogs VMS</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 3 }}>
            <Typography
              color="textPrimary"
              variant="h2"
            >
              Create new account
            </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Use your email to create new account
            </Typography>
          </Box>
          <AccountForm formik={formik} addPassword />
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
              size="large"
            >
              Register
            </LoadingButton>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Register;
