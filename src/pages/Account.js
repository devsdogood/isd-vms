import moment from 'moment';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import { useContext } from 'react';
import { DashboardContext } from 'src/components/DashboardLayout';
import AccountProfile from '../components/account/AccountProfile';
import AccountProfileDetails from '../components/account/AccountProfileDetails';

const Account = () => {
  const { userData: user } = useContext(DashboardContext);
  const fullName = [user.firstName, user.lastName].join(' ');

  return (
    <>
      <Helmet>
        <title>Account | Iowa Service Dogs VMS</title>
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
              <AccountProfile user={user} fullName={fullName} />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <AccountProfileDetails user={{
                ...user,
                birthday: moment(user.birthday.toDate()).format('yyyy-MM-DD')
              }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Account;
