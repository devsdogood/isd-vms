import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import RolesSettings from 'src/components/settings/RolesSettings';
import ReportsSettings from 'src/components/settings/ReportsSettings';

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
        <Box sx={{ pt: 3 }}>
          <ReportsSettings />
        </Box>
      </Container>
    </Box>
  </>
);

export default SettingsView;
