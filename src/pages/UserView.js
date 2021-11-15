import moment from 'moment';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import { useNavigate, useParams } from 'react-router';
import { useContext } from 'react';
import { DashboardContext } from 'src/components/DashboardLayout';
import AdminDataDetails from 'src/components/account/AdminDataDetails';
import AccountProfile from '../components/account/AccountProfile';
import AccountProfileDetails from '../components/account/AccountProfileDetails';

const UserView = () => {
  const navigator = useNavigate();

  const { user: userID } = useParams();
  const { userData, adminUserData, users } = useContext(DashboardContext);
  const user = users.find((u) => u.userID === userID);
  const adminData = adminUserData.find((u) => u.userID === userID);

  if (!user) {
    navigator('/app/users/');
    return null;
  }

  const fullName = [user.firstName, user.lastName].join(' ');

  return (
    <>
      <Helmet>
        <title>
          {fullName}
          {' '}
          | Iowa Service Dogs VMS
        </title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <AccountProfile
                user={user}
                fullName={fullName}
              />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <AccountProfileDetails
                user={{
                  ...user,
                  birthday: moment(user.birthday.toDate()).format('yyyy-MM-DD')
                }}
              />
            </Grid>
            {userData.isAdmin && !user.isAdmin
              && (
              <Grid
                item
                xs={12}
              >
                <AdminDataDetails
                  adminData={adminData}
                />
              </Grid>
              )}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default UserView;
