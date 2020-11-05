import { gql, useMutation } from '@apollo/client'
import { Button, TextField, Typography } from '@material-ui/core'
import { formatRFC3339 } from 'date-fns'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AlertContext } from '../../contexts/Alert.context'
import { UserContext } from '../../contexts/User.context'
import './AskForHelp.css'

const ADD_HELP = gql`
mutation AddHelp($title: String!, $description: String!, $userEmail: String!, $skillsRequired: String, $createdAt: DateTime!) {
  addHelp(input: [{title: $title, description: $description, skillsRequired: $skillsRequired, fromUser: {email: $userEmail}, createdAt: $createdAt}]){
    help{
      title
      description
      id
    }
  }
}
`

function AskForHelp() {
  const { state: { user } } = useContext(UserContext);
  const history = useHistory();
  const { setAlert } = useContext(AlertContext)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skillsRequired, setSkillsRequired] = useState("")

  const onError = (error) => {
    console.log({ error })
  }

  const onCompleted = (data) => {
    setAlert(true, "Help posted successfully!", "success")
    history.push(`/help/${data.addHelp.help[0].id}`)
  }

  const [addHelpSubmit] = useMutation(ADD_HELP, { onError, onCompleted })

  const onSubmit = (e) => {
    e.preventDefault()
    if (!title || !description || !user) {
      return
    }

    addHelpSubmit({
      variables: {
        title,
        description,
        skillsRequired,
        userEmail: user.email,
        createdAt: formatRFC3339(Date.now())
      }
    })
  }

  return (
    <div className="AskForHelp">
      <Typography className="page-heading" variant="h2" color="primary">Ask for help</Typography>
      <div className="form-element">
        <TextField value={title} onChange={e => setTitle(e.target.value)} variant="outlined" label="Title*" fullWidth />
      </div>
      <div className="form-element">
        <TextField value={description} onChange={e => setDescription(e.target.value)} variant="outlined" multiline rows={4} label="Description*" fullWidth />
      </div>
      <div className="form-element">
        <TextField value={skillsRequired} onChange={e => setSkillsRequired(e.target.value)} variant="outlined" multiline rows={3} label="Skills/Tools required" placeholder="Tools/skill that may be necessary for the helper to have." fullWidth />
      </div>
      <div className="form-element submit">
        <Button variant="contained" color="secondary" onClick={onSubmit}>Submit</Button>
      </div>
    </div>
  )
}

export default AskForHelp
