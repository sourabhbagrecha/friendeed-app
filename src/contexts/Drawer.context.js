import { useAuth0 } from "@auth0/auth0-react";
import { Home, ExitToApp, Person, LiveHelp } from "@material-ui/icons";
import React, { createContext, useState } from "react";

const DrawerContext = createContext();
const DrawerProvider = (props) => {
  const {logout} = useAuth0();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerContents, setDrawerContents] = useState([
    {
      type: 'LINK',
      text: 'Feed',
      icon: Home,
      link: "/home"
    },
    {
      type: 'LINK',
      text: 'Profile',
      icon: Person,
      link: "/account"
    },
    {
      type: 'LINK',
      text: 'Ask For Help',
      icon: LiveHelp,
      link: "/new"
    },
    {
      type: 'ACTION',
      text: 'Logout',
      icon: ExitToApp,
      func: () => logout({returnTo: window.location.origin})
    }
  ]);

  const toggleDrawer = () => {
    setDrawerOpen(op => !op)
  };

  return (
    <DrawerContext.Provider
      value={{
        drawerOpen,
        setDrawerOpen,
        toggleDrawer,
        drawerContents, 
        setDrawerContents
      }}
    >
      {props.children}
    </DrawerContext.Provider>
  )
}

export {DrawerContext, DrawerProvider};