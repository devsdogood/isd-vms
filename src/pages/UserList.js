import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { DashboardContext } from 'src/components/DashboardLayout';
import UserListResults from '../components/user/UserListResults';

const UserList = () => {
  const { users } = useContext(DashboardContext);

  return (
    <>
      <Helmet>
        <title>Users | Iowa Service Dogs VMS</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          {/* <UserListToolbar /> */}
          <Box sx={{ pt: 3 }}>
            <UserListResults users={users} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default UserList;
