import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Typography
} from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';

const NotAllowed = () => (
  <>
    <Helmet>
      <title>Not Allowed | Iowa Service Dogs VMS</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="md">
        <Typography
          align="center"
          color="textPrimary"
          variant="h1"
        >
          Thanks for signing up! Your account doesn&apos;t have access to this page yet.
        </Typography>
        <br />
        <Typography
          align="center"
          color="textPrimary"
          variant="subtitle2"
        >
          Your account must be verified by our admins before you&apos;re allowed to use the volunteer management system.
          If you had access to this system in the past, our admins may have suspended your account. If you think this is a mistake, please
          contact Iowa Service Dogs.
        </Typography>
        <br />
        <Box sx={{ textAlign: 'center' }}>
          <BlockIcon fontSize="large" />
        </Box>
      </Container>
    </Box>
  </>
);

export default NotAllowed;
