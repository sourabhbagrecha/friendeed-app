import React, { useContext } from 'react';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../../contexts/User.context';
import Loading from '../../components/Loading.component';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles((theme) => ({
  profile: {
    textAlign: 'center',
  },
  profileImg: {
    borderRadius: '50%',
    height: '200px',
  },
  logout: {
    textAlign: 'center',
  },
  admin: {
    textAlign: 'center',
    marginTop: '10px',
  },
  block: {
    marginTop: '2rem'
  }
}));

const Profile = () => {
  const classes = useStyles();
  const { state: { user } } = useContext(UserContext);
  const { logout } = useAuth0();

  if (!user) {
    return <Loading />
  }

  return (
    <>
      <div className={classes.profile}>
        <img
          className={`${classes.profileImg} ${classes.block}`}
          src={user.picture}
          alt="Profile"
          style={{ 'max-width': '100%' }}
        />
        <div>
          <Typography variant="h5" color="primary" className={classes.block}>{user.name}</Typography>
        </div>
        <div>
          <Typography variant="h6" color="primary" className={classes.block}>{user.email}</Typography>
        </div>
      </div>
      <div className={`${classes.logout} ${classes.block}`}>
        <Button variant="contained" color="secondary" onClick={() => logout({ returnTo: window.location.origin })}>Logout</Button>
      </div>
    </>
  );
};

export default Profile;