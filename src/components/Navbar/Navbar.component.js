import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton, Typography, Toolbar, AppBar, Avatar } from '@material-ui/core'
import { DrawerContext } from '../../contexts/Drawer.context';
import { Person } from '@material-ui/icons';
import { UserContext } from '../../contexts/User.context';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar() {
  const classes = useStyles();
  const { toggleDrawer } = useContext(DrawerContext)
  const { state: { user } } = useContext(UserContext)
  const history = useHistory()

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon onClick={toggleDrawer} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Fr<span role="img" aria-label="shake-hands">🤝</span>ndeed
          </Typography>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => history.push("/account")}
                color="inherit"
              >
                <Avatar src={user ? user.picture : <Person />} />
              </IconButton>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar