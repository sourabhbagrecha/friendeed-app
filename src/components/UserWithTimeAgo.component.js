import { Avatar, makeStyles } from '@material-ui/core'
import { formatDistanceToNow } from 'date-fns'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  userInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  userAvatar: {
    marginRight: "0.5rem"
  },
  userText: {
    marginLeft: "1rem"
  },
  userName: {
    margin: "0 auto",
    fontSize: "0.9rem",
    color: theme.palette.secondary.main
  },
  timeDistance: {
    margin: "0 auto",
    fontSize: "0.9rem",
    color: theme.palette.text.disabled
  }
}))

function UserWithTimeAgo({ user, createdAt, style }) {
  const classes = useStyles();
  return (
    <Link to={`/user/${user.id}`} style={{ textDecoration: "none" }}>
      <div className={classes.userInfo} style={style}>
        <Avatar style={{ height: "2rem", width: "2rem" }} className={classes.userInfo} src={user.picture} />
        <div className={classes.userText}>
          <p className={classes.userName}>{user.name}</p>
          <p className={classes.timeDistance}>{formatDistanceToNow(Date.parse(createdAt))} ago</p>
        </div>
      </div>
    </Link>
  )
}

export default UserWithTimeAgo
