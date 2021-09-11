import { useState, createContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Skeleton } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firebase } from 'src/App';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayoutRoot = styled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  })
);

const DashboardLayoutWrapper = styled('div')(
  ({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  })
);

const DashboardLayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const DashboardLayoutContent = styled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
});

export const DashboardContext = createContext({});

const DashboardLayout = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [events, eventsLoading] = useCollectionData(firebase.firestore().collection('events'),
    {
      idField: 'eventID',
      transform: (data) => ({
        ...data,
        start: data.start.toDate(),
        end: data.end.toDate(),
      }),
      snapshotListenOptions: { includeMetadataChanges: true },
    });
  const [roles, rolesLoading] = useCollectionData(firebase.firestore().collection('roles'),
    {
      idField: 'roleID',
      snapshotListenOptions: { includeMetadataChanges: true },
    });
  const [eventSignups, eventSignupsLoading] = useCollectionData(firebase.firestore().collection('eventSignups'),
    {
      idField: 'signupID',
      transform: (data) => ({
        ...data,
        registered: data.registered.toDate(),
      }),
      snapshotListenOptions: { includeMetadataChanges: true },
    });
  const [users, usersLoading] = useCollectionData(firebase.firestore().collection('users'),
    {
      idField: 'userID',
      snapshotListenOptions: { includeMetadataChanges: true },
    });

  return (
    <DashboardLayoutRoot>
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <DashboardSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <DashboardLayoutWrapper>
        <DashboardLayoutContainer>
          <DashboardLayoutContent>
            <DashboardContext.Provider value={{
              events, roles, eventSignups, users
            }}
            >
              {
                eventsLoading || rolesLoading || eventSignupsLoading || usersLoading
                  ? (
                    <>
                      <Skeleton />
                      <Skeleton animation={false} />
                      <Skeleton animation="wave" />
                    </>
                  )
                  : <Outlet />
              }
            </DashboardContext.Provider>
          </DashboardLayoutContent>
        </DashboardLayoutContainer>
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  );
};

export default DashboardLayout;
