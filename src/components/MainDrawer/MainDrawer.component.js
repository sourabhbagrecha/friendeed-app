import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemIcon, Drawer } from '@material-ui/core'
import { DrawerContext } from '../../contexts/Drawer.context';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

function MainDrawer() {
  const classes = useStyles();
  const history = useHistory();
  const { drawerOpen, setDrawerOpen, toggleDrawer, drawerContents } = useContext(DrawerContext)

  const handleNavClick = (item) => {
    setDrawerOpen(false)
    if (item.type === "LINK") {
      history.push(item.link)
    } else {
      item.func()
    }
  }

  return (
    <div>
      <>
        <Drawer anchor={'left'} open={drawerOpen} onClose={() => setDrawerOpen(_ => false)}>
          <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer()}
            onKeyDown={toggleDrawer()}
          >
            <List>
              {drawerContents.map((item, index) => (
                <ListItem onClick={() => handleNavClick(item)} button key={item.text}>
                  <ListItemIcon><item.icon /></ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
      </>
    </div>
  );
}

export default MainDrawer