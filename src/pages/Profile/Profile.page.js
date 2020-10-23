import { TextField } from '@material-ui/core'
import React from 'react'
import './Profile.css'

const Profile = (props) => {
  return(
    <div className="Profile">
      <h1 className="page-heading">This is the profile page.</h1>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
      <TextField label="Mood" color="secondary"/>
    </div>
  )
}

export default Profile