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
import NotAllowed from './pages/NotAllowed';

/* Firebase */
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
};
export const firebase = fb.initializeApp(config);

const App = () => {
  const [user, userLoading] = useAuthState(firebase.auth());
  const [userData, userDataLoading] = useDocumentData(!userLoading && user !== null ? firebase.firestore().collection('users').doc(user.uid) : null);
  const content = useRoutes(userLoading ? [] : routes(user, userData));
  const userNotAuthorized = !userDataLoading && userData && !userData?.active;
  const displayContent = !userLoading && !userDataLoading && userData;

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {userNotAuthorized && <NotAllowed />}
        {!userNotAuthorized && (displayContent || user === null)
         && content}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
