import { gql, useMutation } from '@apollo/client'
import { Button, TextField, Typography } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { UserContext } from '../../contexts/User.context'
import './AskForHelp.css'

const ADD_HELP = gql`
mutation AddHelp($title: String!, $description: String!, $userEmail: String!) {
  addHelp(input: [{title: $title, description: $description, fromUser: {email: $userEmail}}]){
    help{
      title
      description
      id
    }
  }
}
`

function AskForHelp() {
  const {state: {user}} = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onError = (error) => {
    console.log({error})
  }
  
  const onCompleted = (data) => {
    console.log({data})
  }
  
  const [addHelpSubmit] = useMutation(ADD_HELP, {onError,onCompleted })
  
  const onSubmit = (e) => {
    e.preventDefault()
    if(!title || !description || !user){
      return
    }
    console.log("passing")
    
    addHelpSubmit({
      variables: {
        title,
        description,
        userEmail: user.email
      }
    })
  }

  return (
    <div className="AskForHelp">
      <Typography className="page-heading" variant="h2" color="primary">Ask for help</Typography>
      <div className="form-element">
        <TextField value={title} onChange={e => setTitle(e.target.value)}  variant="outlined" label="Title" fullWidth/>
      </div>
      <div className="form-element">
        <TextField value={description} onChange={e => setDescription(e.target.value)}  variant="outlined" multiline rows={4} label="Description" fullWidth/>
      </div>
      <div className="form-element submit">
        <Button variant="contained" color="secondary" onClick={onSubmit}>Submit</Button>
      </div>
    </div>
  )
}

export default AskForHelp
