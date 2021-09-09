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
  const [events, loading] = useCollectionData(firebase.firestore().collection('events'),
    {
      idField: 'eventID',
      transform: (data) => {
        const roles = data.roles.map((roleRef) => roleRef.get().then((r) => ({
          roleId: r.id,
          ...r.data()
        })));

        return {
          ...data,
          roles,
        };
      },
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
            <DashboardContext.Provider value={{ events }}>
              {
                loading
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
