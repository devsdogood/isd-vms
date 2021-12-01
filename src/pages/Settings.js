import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import RolesSettings from 'src/components/settings/RolesSettings';
import SettingsNotifications from '../components/settings/SettingsNotifications';
import SettingsPassword from '../components/settings/SettingsPassword';

const SettingsView = () => (
  <>
    <Helmet>
      <title>Settings | Iowa Service Dogs VMS</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ pt: 3 }}>
          <RolesSettings />
        </Box>
      </Container>
    </Box>
  </>
);

export default SettingsView;
