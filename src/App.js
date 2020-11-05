import React from 'react';
import NavigationMain from './NavigationMain';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import themeConfig from './theme-config';
import AlertWrapper from './utils/AlertWrapper.component';
import UserOnboarding from './utils/UserOnboarding.component';
import Navbar from './components/Navbar/Navbar.component';
import { DrawerProvider } from './contexts/Drawer.context';
import MainDrawer from './components/MainDrawer/MainDrawer.component';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Landing from './pages/Landing/Landing.page';

function App() {
  const history = useHistory();
  const themeDefinition = createMuiTheme(themeConfig)
  if (history.location.pathname === "/" ){
    return <Landing/>
  }

  return (
    <ThemeProvider theme={themeDefinition}>
      <DrawerProvider>
        <Navbar />
        <MainDrawer />
        <div className="App">
          <div className="mobile-device">
            <UserOnboarding />
            <AlertWrapper />
            <NavigationMain />
          </div>
        </div>
      </DrawerProvider>
    </ThemeProvider>
  );
}

export default App;
