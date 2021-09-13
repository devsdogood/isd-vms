import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ThemeProvider, StyledEngineProvider } from '@material-ui/core';
import fb from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from './routes';

/* Firebase */
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
};
export const firebase = fb.initializeApp(config);

const App = () => {
  const [user, userLoading] = useAuthState(firebase.auth());
  const [userData, userDataLoading] = useDocumentData(!userLoading ? firebase.firestore().collection('users').doc(user.uid) : null);
  const content = useRoutes(routes(user, userData));

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {!userLoading && !userDataLoading && userData && content}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
