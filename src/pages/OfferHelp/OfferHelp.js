import { gql, useMutation } from '@apollo/client'
import { Button, TextField, Typography } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
// import Loading from '../../components/Loading.component'
import { AlertContext } from '../../contexts/Alert.context'
import { UserContext } from '../../contexts/User.context'
import { formatRFC3339 } from 'date-fns'
import './OfferHelp.css'

const ADD_HELP_Offer = gql`
mutation AddHelpOffer($title: String!, $description: String!, $helpRequestId: ID!, $userEmail: String!, $createdAt: DateTime!) {
	addHelpOffer(input: [{title: $title, description: $description, helpRequest: {id: $helpRequestId}, fromUser: {email: $userEmail}, createdAt: $createdAt}]){
    helpOffer{
      id
      title
      description
      fromUser{
        id
      }
      helpRequest{
        id
      }
    }
  }
}
`;

function OfferHelp() {
  const { state: { user } } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext)
  const match = useRouteMatch();
  const history = useHistory();
  const {helpRequestId} = match.params;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onError = (error) => {
    setAlert("error")
  }

  const onCompleted = (data) => {
    history.push(`/help/${helpRequestId}/help-offer/${data.addHelpOffer.helpOffer[0].id}`)
    setAlert("success", "Help Offer sent successfully")
  }

  const [addHelpOfferSubmit] = useMutation(ADD_HELP_Offer, { onError, onCompleted })

  const onSubmit = (e) => {
    e.preventDefault()
    if (!title || !description || !user) {
      return
    }

    addHelpOfferSubmit({
      variables: {
        title,
        description,
        userEmail: user.email,
        helpRequestId,
        createdAt: formatRFC3339(Date.now())
      }
    })
  }

  return (
    <div className="OfferHelp">
      <Typography className="page-heading" variant="h2" color="primary">Offer help</Typography>
      <div className="form-element">
        <TextField value={title} onChange={e => setTitle(e.target.value)} variant="outlined" label="Title" fullWidth />
      </div>
      <div className="form-element">
        <TextField value={description} onChange={e => setDescription(e.target.value)} variant="outlined" multiline rows={4} label="Description" fullWidth />
      </div>
      <div className="form-element submit">
        <Button variant="contained" color="secondary" onClick={onSubmit}>Submit</Button>
      </div>
    </div>
  )
}

export default OfferHelp
