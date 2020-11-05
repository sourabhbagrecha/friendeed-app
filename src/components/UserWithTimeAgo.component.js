import { Avatar, makeStyles, Typography } from '@material-ui/core'
import { formatDistanceToNow } from 'date-fns'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
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
  }
})

function UserWithTimeAgo({user, createdAt, style}) {
  const classes = useStyles();
  return (
    <Link to={`/user/${user.id}`} style={{ textDecoration: "none" }}>
      <div className={classes.userInfo} style={style}>
        <Avatar style={{ height: "2.5rem", width: "2.5rem" }} className={classes.userInfo} src={user.picture} />
        <div className={classes.userText}>
          <Typography variant="body1" color="textSecondary">{user.name}</Typography>
          <Typography color="textSecondary">{formatDistanceToNow(Date.parse(createdAt))} ago</Typography>
        </div>
      </div>
    </Link>
  )
}

export default UserWithTimeAgo
